import { useState, useEffect } from 'react';
import styles from '../../styles/Financial.module.css';
import { formatCurrency, bgnToEur } from '../../utils/currency';

export default function ReportsDashboard() {
  const [reportType, setReportType] = useState('weekly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set default date ranges
  useEffect(() => {
    const today = new Date();
    setEndDate(today.toISOString().split('T')[0]);
    
    switch (reportType) {
      case 'daily':
        setStartDate(today.toISOString().split('T')[0]);
        break;
      case 'weekly':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        setStartDate(weekAgo.toISOString().split('T')[0]);
        break;
      case 'monthly':
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        setStartDate(monthAgo.toISOString().split('T')[0]);
        break;
      case 'quarterly':
        const quarterAgo = new Date(today);
        quarterAgo.setMonth(today.getMonth() - 3);
        setStartDate(quarterAgo.toISOString().split('T')[0]);
        break;
      case 'annual':
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        setStartDate(yearAgo.toISOString().split('T')[0]);
        break;
      default:
        break;
    }
  }, [reportType]);

  const fetchReport = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/reports/aggregate/${reportType}?start_date=${startDate}&end_date=${endDate}`
      );
      const data = await response.json();

      if (data.success) {
        setReportData(data.data);
      } else {
        setError(data.error || 'Failed to fetch report');
      }
    } catch (err) {
      setError('Error fetching report: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchReport();
    }
  }, [startDate, endDate, reportType]);

  const exportToCSV = () => {
    if (!reportData) return;

    let csv = 'Bar National - Financial Report\n';
    csv += `Period: ${reportData.period}\n\n`;
    csv += 'Summary (BGN / EUR)\n';
    csv += `Total General Revenue,BGN ${reportData.total_general_revenue.toFixed(2)},€${bgnToEur(reportData.total_general_revenue).toFixed(2)}\n`;
    csv += `Total POS Revenue,BGN ${reportData.total_pos_revenue.toFixed(2)},€${bgnToEur(reportData.total_pos_revenue).toFixed(2)}\n`;
    csv += `Total Cash Revenue,BGN ${reportData.total_cash_revenue.toFixed(2)},€${bgnToEur(reportData.total_cash_revenue).toFixed(2)}\n`;
    csv += `Cash Expenses,BGN ${(reportData.total_cash_expenses || 0).toFixed(2)},€${bgnToEur(reportData.total_cash_expenses || 0).toFixed(2)}\n`;
    csv += `Online Banking Expenses,BGN ${(reportData.total_online_expenses || 0).toFixed(2)},€${bgnToEur(reportData.total_online_expenses || 0).toFixed(2)}\n`;
    csv += `Total All Expenses,BGN ${(reportData.total_all_expenses || reportData.total_expenses || 0).toFixed(2)},€${bgnToEur(reportData.total_all_expenses || reportData.total_expenses || 0).toFixed(2)}\n`;
    csv += `Cash Turnover,BGN ${reportData.cash_turnover.toFixed(2)},€${bgnToEur(reportData.cash_turnover).toFixed(2)}\n`;
    csv += `General Turnover,BGN ${reportData.general_turnover.toFixed(2)},€${bgnToEur(reportData.general_turnover).toFixed(2)}\n`;
    csv += `Days Count,${reportData.days_count}\n\n`;

    if (reportData.reports && reportData.reports.length > 0) {
      csv += 'Daily Breakdown (all amounts in BGN)\n';
      csv += 'Date,General Revenue,POS Revenue,Cash Revenue,Cash Expenses,Online Expenses,Total Expenses,Cash Turnover,General Turnover\n';
      reportData.reports.forEach(report => {
        const cashExpenses = report.summary.total_cash_expenses || 0;
        const onlineExpenses = report.summary.total_online_expenses || 0;
        const totalExpenses = report.summary.total_all_expenses || report.summary.total_expenses || 0;
        csv += `${report.date},${report.revenues.general.toFixed(2)},${report.revenues.pos.toFixed(2)},${report.revenues.cash.toFixed(2)},${cashExpenses.toFixed(2)},${onlineExpenses.toFixed(2)},${totalExpenses.toFixed(2)},${report.summary.cash_turnover.toFixed(2)},${report.summary.general_turnover.toFixed(2)}\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bar-national-report-${startDate}-to-${endDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.reportsDashboard}>
      <h2 className={styles.formTitle}>📊 Financial Reports & P&L Analysis</h2>

      {/* Report Type Selection */}
      <div className={styles.reportControls}>
        <div className={styles.reportTypeButtons}>
          <button
            className={`${styles.reportTypeButton} ${reportType === 'daily' ? styles.active : ''}`}
            onClick={() => setReportType('daily')}
          >
            Daily
          </button>
          <button
            className={`${styles.reportTypeButton} ${reportType === 'weekly' ? styles.active : ''}`}
            onClick={() => setReportType('weekly')}
          >
            Weekly
          </button>
          <button
            className={`${styles.reportTypeButton} ${reportType === 'monthly' ? styles.active : ''}`}
            onClick={() => setReportType('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${styles.reportTypeButton} ${reportType === 'quarterly' ? styles.active : ''}`}
            onClick={() => setReportType('quarterly')}
          >
            Quarterly
          </button>
          <button
            className={`${styles.reportTypeButton} ${reportType === 'annual' ? styles.active : ''}`}
            onClick={() => setReportType('annual')}
          >
            Annual
          </button>
        </div>

        {/* Date Range Selection */}
        <div className={styles.dateRangeSelector}>
          <div>
            <label className={styles.label}>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>Loading report...</div>
        </div>
      )}

      {!loading && reportData && (
        <div className={styles.reportContainer}>
          {/* Summary Cards */}
          <div className={styles.summaryCards}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>💰</div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Total General Revenue</div>
                <div className={styles.cardValue}>{formatCurrency(reportData.total_general_revenue)}</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💳</div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Total POS Revenue</div>
                <div className={styles.cardValue}>{formatCurrency(reportData.total_pos_revenue)}</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💵</div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Total Cash Revenue</div>
                <div className={styles.cardValue}>{formatCurrency(reportData.total_cash_revenue)}</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💸</div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Cash Expenses</div>
                <div className={styles.cardValue}>{formatCurrency(
                  reportData.total_cash_expenses !== undefined 
                    ? reportData.total_cash_expenses 
                    : reportData.total_all_expenses || reportData.total_expenses || 0
                )}</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🏦</div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Online Banking Expenses</div>
                <div className={styles.cardValue}>{formatCurrency(reportData.total_online_expenses || 0)}</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💰</div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Total All Expenses</div>
                <div className={styles.cardValue}>{formatCurrency(reportData.total_all_expenses || reportData.total_expenses || 0)}</div>
              </div>
            </div>

            <div className={`${styles.card} ${reportData.cash_turnover >= 0 ? styles.profitCard : styles.lossCard}`}>
              <div className={styles.cardIcon}>📈</div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Cash Turnover</div>
                <div className={styles.cardValue}>
                  {formatCurrency(reportData.cash_turnover)}
                </div>
              </div>
            </div>

            <div className={`${styles.card} ${reportData.general_turnover >= 0 ? styles.profitCard : styles.lossCard}`}>
              <div className={styles.cardIcon}>📊</div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>General Turnover</div>
                <div className={styles.cardValue}>
                  {formatCurrency(reportData.general_turnover)}
                </div>
              </div>
            </div>
          </div>

          {/* Period Info */}
          <div className={styles.periodInfo}>
            <div className={styles.periodItem}>
              <span className={styles.periodLabel}>Period:</span>
              <span className={styles.periodValue}>{reportData.period}</span>
            </div>
            <div className={styles.periodItem}>
              <span className={styles.periodLabel}>Days with Data:</span>
              <span className={styles.periodValue}>{reportData.days_count}</span>
            </div>
            <div className={styles.periodItem}>
              <span className={styles.periodLabel}>Avg Daily Revenue:</span>
              <span className={styles.periodValue}>
                {reportData.days_count > 0 ? formatCurrency(reportData.total_general_revenue / reportData.days_count) : 'BGN 0.00 (€0.00)'}
              </span>
            </div>
            <div className={styles.periodItem}>
              <span className={styles.periodLabel}>Avg Daily Turnover:</span>
              <span className={styles.periodValue}>
                {reportData.days_count > 0 ? formatCurrency(reportData.general_turnover / reportData.days_count) : 'BGN 0.00 (€0.00)'}
              </span>
            </div>
          </div>

          {/* Export Button */}
          <div className={styles.exportSection}>
            <button onClick={exportToCSV} className={styles.exportButton}>
              📥 Export to CSV
            </button>
          </div>

          {/* Daily Breakdown Table */}
          {reportData.reports && reportData.reports.length > 0 && (
            <div className={styles.tableContainer}>
              <h3 className={styles.tableTitle}>Daily Breakdown</h3>
              <table className={styles.reportTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>General Revenue</th>
                    <th>POS Revenue</th>
                    <th>Cash Revenue</th>
                    <th>Cash Expenses</th>
                    <th>Online Expenses</th>
                    <th>Total Expenses</th>
                    <th>Cash Turnover</th>
                    <th>General Turnover</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.reports.map((report, idx) => {
                    // Support both old and new schema
                    const cashExpenses = report.summary.total_cash_expenses !== undefined 
                      ? report.summary.total_cash_expenses 
                      : report.summary.total_expenses || 0; // Old schema: show total_expenses as cash
                    const onlineExpenses = report.summary.total_online_expenses || 0;
                    const totalExpenses = report.summary.total_all_expenses || report.summary.total_expenses || 0;
                    return (
                      <tr key={idx}>
                        <td>{report.date}</td>
                        <td>{formatCurrency(report.revenues.general || 0)}</td>
                        <td>{formatCurrency(report.revenues.pos || 0)}</td>
                        <td>{formatCurrency(report.revenues.cash || 0)}</td>
                        <td>{formatCurrency(cashExpenses)}</td>
                        <td>{formatCurrency(onlineExpenses)}</td>
                        <td>{formatCurrency(totalExpenses)}</td>
                        <td className={(report.summary.cash_turnover || 0) >= 0 ? styles.positive : styles.negative}>
                          {formatCurrency(report.summary.cash_turnover || 0)}
                        </td>
                        <td className={(report.summary.general_turnover || 0) >= 0 ? styles.positive : styles.negative}>
                          {formatCurrency(report.summary.general_turnover || 0)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className={styles.totalRow}>
                    <td><strong>Total</strong></td>
                    <td><strong>{formatCurrency(reportData.total_general_revenue)}</strong></td>
                    <td><strong>{formatCurrency(reportData.total_pos_revenue)}</strong></td>
                    <td><strong>{formatCurrency(reportData.total_cash_revenue)}</strong></td>
                    <td><strong>{formatCurrency(reportData.total_cash_expenses || 0)}</strong></td>
                    <td><strong>{formatCurrency(reportData.total_online_expenses || 0)}</strong></td>
                    <td><strong>{formatCurrency(reportData.total_all_expenses || reportData.total_expenses || 0)}</strong></td>
                    <td className={reportData.cash_turnover >= 0 ? styles.positive : styles.negative}>
                      <strong>{formatCurrency(reportData.cash_turnover)}</strong>
                    </td>
                    <td className={reportData.general_turnover >= 0 ? styles.positive : styles.negative}>
                      <strong>{formatCurrency(reportData.general_turnover)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

