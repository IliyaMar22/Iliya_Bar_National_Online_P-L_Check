import { useState, useEffect } from 'react';
import styles from '../../styles/Financial.module.css';
import { formatCurrency, bgnToEur } from '../../utils/currency';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reports, setReports] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMonthReports();
  }, [currentDate]);

  const fetchMonthReports = async () => {
    setLoading(true);
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1).toISOString().split('T')[0];
      const lastDay = new Date(year, month + 1, 0).toISOString().split('T')[0];

      const response = await fetch(`/api/reports?start_date=${firstDay}&end_date=${lastDay}`);
      const data = await response.json();

      if (data.success) {
        const reportsMap = {};
        data.data.forEach(report => {
          reportsMap[report.date] = report;
        });
        setReports(reportsMap);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        day,
        date: dateStr,
        report: reports[dateStr]
      });
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (dayData) => {
    if (dayData) {
      setSelectedDate(dayData.date);
      setSelectedReport(dayData.report);
    }
  };

  const closeModal = () => {
    setSelectedDate(null);
    setSelectedReport(null);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const days = getDaysInMonth();

  return (
    <div className={styles.calendarView}>
      <h2 className={styles.formTitle}>📅 Calendar View</h2>

      {/* Month Navigation */}
      <div className={styles.calendarHeader}>
        <button onClick={handlePreviousMonth} className={styles.navButton}>
          ← Previous
        </button>
        <h3 className={styles.currentMonth}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button onClick={handleNextMonth} className={styles.navButton}>
          Next →
        </button>
      </div>

      {loading && <div className={styles.loadingSpinner}>Loading...</div>}

      {/* Calendar Grid */}
      <div className={styles.calendar}>
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.dayHeader}>{day}</div>
        ))}

        {/* Calendar days */}
        {days.map((dayData, index) => (
          <div
            key={index}
            className={`${styles.calendarDay} ${!dayData ? styles.emptyDay : ''} ${dayData?.report ? styles.hasReport : ''}`}
            onClick={() => handleDayClick(dayData)}
          >
            {dayData && (
              <>
                <div className={styles.dayNumber}>{dayData.day}</div>
                {dayData.report && (
                  <div className={styles.dayIndicator}>
                    <span className={styles.reportDot}>●</span>
                    <span className={styles.miniSummary}>
                      BGN {dayData.report.summary.general_turnover.toFixed(0)}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Report Detail Modal */}
      {selectedDate && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>✕</button>
            
            <h3 className={styles.modalTitle}>Report for {selectedDate}</h3>

            {selectedReport ? (
              <div className={styles.reportDetails}>
                {/* Revenues */}
                <div className={styles.detailSection}>
                  <h4>💵 Revenues</h4>
                  <div className={styles.detailRow}>
                    <span>General Revenue:</span>
                    <span>{formatCurrency(selectedReport.revenues.general)}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>POS Revenue:</span>
                    <span>{formatCurrency(selectedReport.revenues.pos)}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Cash Revenue:</span>
                    <span>{formatCurrency(selectedReport.revenues.cash)}</span>
                  </div>
                </div>

                {/* Staff Expenses */}
                {selectedReport.staff_expenses.length > 0 && (
                  <div className={styles.detailSection}>
                    <h4>👥 Staff Expenses</h4>
                    {selectedReport.staff_expenses.map((item, idx) => (
                      <div key={idx} className={styles.detailRow}>
                        <span>{item.role}:</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Other Expenses */}
                {selectedReport.expenses.length > 0 && (
                  <div className={styles.detailSection}>
                    <h4>💸 Expenses</h4>
                    {selectedReport.expenses.map((item, idx) => (
                      <div key={idx} className={styles.detailRow}>
                        <span>{item.type}:</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Summary */}
                <div className={styles.detailSection}>
                  <h4>📊 Summary</h4>
                  <div className={styles.detailRow}>
                    <span>Total Expenses:</span>
                    <span>{formatCurrency(selectedReport.summary.total_expenses)}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Cash Turnover:</span>
                    <span className={selectedReport.summary.cash_turnover >= 0 ? styles.positive : styles.negative}>
                      {formatCurrency(selectedReport.summary.cash_turnover)}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>General Turnover:</span>
                    <span className={selectedReport.summary.general_turnover >= 0 ? styles.positive : styles.negative}>
                      {formatCurrency(selectedReport.summary.general_turnover)}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {selectedReport.notes && (
                  <div className={styles.detailSection}>
                    <h4>📝 Notes</h4>
                    <p>{selectedReport.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.noReport}>
                <p>No report found for this date.</p>
                <p>Go to the Daily Input tab to create one.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

