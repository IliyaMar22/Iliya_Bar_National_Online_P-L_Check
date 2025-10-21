import { useState, useEffect } from 'react';
import styles from '../../styles/Financial.module.css';
import { formatCurrency, bgnToEur } from '../../utils/currency';

export default function DailyInputForm() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [staffExpenses, setStaffExpenses] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [generalRevenue, setGeneralRevenue] = useState(0);
  const [posRevenue, setPosRevenue] = useState(0);
  const [notes, setNotes] = useState('');
  const [categories, setCategories] = useState({ staff_roles: [], expense_types: [] });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [existingReport, setExistingReport] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch existing report when date changes
  useEffect(() => {
    fetchExistingReport();
  }, [date]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchExistingReport = async () => {
    try {
      const response = await fetch(`/api/reports/${date}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const report = data.data;
        setExistingReport(report);
        setStaffExpenses(report.staff_expenses || []);
        setExpenses(report.expenses || []);
        setGeneralRevenue(report.revenues.general || 0);
        setPosRevenue(report.revenues.pos || 0);
        setNotes(report.notes || '');
        setMessage('✏️ Editing existing report for ' + date);
      } else {
        // Reset form for new date
        setExistingReport(null);
        setStaffExpenses([]);
        setExpenses([]);
        setGeneralRevenue(0);
        setPosRevenue(0);
        setNotes('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error fetching existing report:', error);
      setExistingReport(null);
      setMessage('');
    }
  };

  const addStaffExpense = () => {
    setStaffExpenses([...staffExpenses, { role: '', amount: '' }]);
  };

  const updateStaffExpense = (index, field, value) => {
    const updated = [...staffExpenses];
    if (field === 'amount') {
      // Keep the raw value as entered, don't round BGN amounts
      updated[index][field] = value === '' ? '' : value;
    } else {
      updated[index][field] = value;
    }
    setStaffExpenses(updated);
  };

  const removeStaffExpense = (index) => {
    setStaffExpenses(staffExpenses.filter((_, i) => i !== index));
  };

  const addExpense = () => {
    setExpenses([...expenses, { type: '', amount: '' }]);
  };

  const updateExpense = (index, field, value) => {
    const updated = [...expenses];
    if (field === 'amount') {
      // Keep the raw value as entered, don't round BGN amounts
      updated[index][field] = value === '' ? '' : value;
    } else {
      updated[index][field] = value;
    }
    setExpenses(updated);
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const calculateSummary = () => {
    const totalStaffExpenses = staffExpenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const totalAllExpenses = totalStaffExpenses + totalExpenses;
    const cashRevenue = (parseFloat(generalRevenue) || 0) - (parseFloat(posRevenue) || 0);
    const cashTurnover = cashRevenue - totalAllExpenses;
    const generalTurnover = (parseFloat(generalRevenue) || 0) - totalAllExpenses;

    return {
      cashRevenue,
      totalExpenses: totalAllExpenses,
      cashTurnover,
      generalTurnover
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        date,
        staff_expenses: staffExpenses
          .filter(item => item.role && item.amount)
          .map(item => ({
            role: item.role,
            amount: Number(item.amount) // Convert to number without rounding
          })),
        expenses: expenses
          .filter(item => item.type && item.amount)
          .map(item => ({
            type: item.type,
            amount: Number(item.amount) // Convert to number without rounding
          })),
        revenues: {
          general: Number(generalRevenue) || 0,
          pos: Number(posRevenue) || 0
        },
        notes
      };

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Report saved successfully for ${date}`);
        setExistingReport(data.data);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const summary = calculateSummary();

  return (
    <div className={styles.dailyInputForm}>
      <h2 className={styles.formTitle}>📝 Daily Financial Input</h2>
      
      {message && (
        <div className={message.includes('✅') ? styles.successMessage : styles.errorMessage}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Date Selection */}
        <div className={styles.formSection}>
          <label className={styles.label}>📅 Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Staff Expenses */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>👥 Staff Expenses</h3>
            <button type="button" onClick={addStaffExpense} className={styles.addButton}>
              + Add Staff
            </button>
          </div>
          {staffExpenses.map((item, index) => (
            <div key={index} className={styles.expenseRow}>
              <select
                value={item.role}
                onChange={(e) => updateStaffExpense(index, 'role', e.target.value)}
                className={styles.select}
              >
                <option value="">Select Role</option>
                {categories.staff_roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <input
                type="number"
                value={item.amount}
                onChange={(e) => updateStaffExpense(index, 'amount', e.target.value)}
                placeholder="Amount (BGN)"
                className={styles.input}
                step="0.01"
              />
              <button 
                type="button" 
                onClick={() => removeStaffExpense(index)} 
                className={styles.removeButton}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Other Expenses */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>💸 Expenses</h3>
            <button type="button" onClick={addExpense} className={styles.addButton}>
              + Add Expense
            </button>
          </div>
          {expenses.map((item, index) => (
            <div key={index} className={styles.expenseRow}>
              <select
                value={item.type}
                onChange={(e) => updateExpense(index, 'type', e.target.value)}
                className={styles.select}
              >
                <option value="">Select Type</option>
                {categories.expense_types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="number"
                value={item.amount}
                onChange={(e) => updateExpense(index, 'amount', e.target.value)}
                placeholder="Amount (BGN)"
                className={styles.input}
                step="0.01"
              />
              <button 
                type="button" 
                onClick={() => removeExpense(index)} 
                className={styles.removeButton}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Revenues */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>💵 Revenues</h3>
          <div className={styles.revenueGrid}>
            <div>
              <label className={styles.label}>General Revenue (BGN)</label>
              <input
                type="number"
                value={generalRevenue}
                onChange={(e) => setGeneralRevenue(e.target.value)}
                className={styles.input}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className={styles.label}>POS Terminal Revenue (BGN)</label>
              <input
                type="number"
                value={posRevenue}
                onChange={(e) => setPosRevenue(e.target.value)}
                className={styles.input}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className={styles.formSection}>
          <label className={styles.label}>📝 Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={styles.textarea}
            placeholder="Add any additional notes..."
            rows="3"
          />
        </div>

        {/* Summary Display */}
        <div className={styles.summaryBox}>
          <h3 className={styles.summaryTitle}>📊 Daily Summary</h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Cash Revenue:</span>
              <span className={styles.summaryValue}>{formatCurrency(summary.cashRevenue)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Expenses:</span>
              <span className={styles.summaryValue}>{formatCurrency(summary.totalExpenses)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Cash Turnover:</span>
              <span className={`${styles.summaryValue} ${summary.cashTurnover >= 0 ? styles.positive : styles.negative}`}>
                {formatCurrency(summary.cashTurnover)}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>General Turnover:</span>
              <span className={`${styles.summaryValue} ${summary.generalTurnover >= 0 ? styles.positive : styles.negative}`}>
                {formatCurrency(summary.generalTurnover)}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? '⏳ Saving...' : '💾 Save Report'}
        </button>
      </form>
    </div>
  );
}

