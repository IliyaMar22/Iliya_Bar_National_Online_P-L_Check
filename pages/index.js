import { useState } from 'react';
import Head from 'next/head';
import DailyInputForm from '../components/Financial/DailyInputForm';
import CalendarView from '../components/Financial/CalendarView';
import ReportsDashboard from '../components/Financial/ReportsDashboard';
import styles from '../styles/Financial.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <>
      <Head>
        <title>Bar National - Financial Management System</title>
        <meta name="description" content="Financial Management System for Bar National" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.financialContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>💰 Bar National Financial Management</h1>
          <p className={styles.subtitle}>Daily Reports, P&L Analysis & Historical Records</p>
        </div>

        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tab} ${activeTab === 'daily' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            📝 Daily Input
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'calendar' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            📅 Calendar
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'reports' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📊 Reports
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'daily' && <DailyInputForm />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'reports' && <ReportsDashboard />}
        </div>

        <footer style={{ 
          marginTop: '4rem', 
          textAlign: 'center', 
          color: '#daa520',
          opacity: 0.7,
          padding: '2rem'
        }}>
          <p>© 2024 Bar National Financial Management System</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            📞 +359896823923 | 📧 info@barnational.bg
          </p>
        </footer>
      </div>
    </>
  );
}

