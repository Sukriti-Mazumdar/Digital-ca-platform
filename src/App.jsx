import React, { useState, createContext, useContext } from 'react';

// Context
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext.Provider');
  }
  return context;
};

// Dummy Data
const dummyData = {
  user: {
    name: 'CA Rajesh Kumar',
    role: 'Chartered Accountant',
    email: 'rajesh@caoffice.com',
    phone: '+91 9876543210',
    license: 'CA-123456',
    address: '123 Business District, Mumbai, Maharashtra - 400001',
    gstNumber: '27AABCR1234L1ZS'
  },
  
  clients: [
    {
      id: 1,
      name: 'Tech Solutions Pvt Ltd',
      email: 'contact@techsolutions.com',
      phone: '9876543210',
      gstNumber: '27AABCT1332L000',
      panNumber: 'AABCT1332L',
      gstStatus: 'Filed',
      panStatus: 'Active',
      lastFiling: '2024-01-15',
      documents: ['GST Return', 'PAN Card', 'Registration Certificate'],
      address: '456 Tech Park, Bangalore, Karnataka - 560001'
    },
    {
      id: 2,
      name: 'Global Enterprises Ltd',
      email: 'admin@globalent.com',
      phone: '8765432109',
      gstNumber: '27AABCG2233M000',
      panNumber: 'AABCG2233M',
      gstStatus: 'Pending',
      panStatus: 'Active',
      lastFiling: '2024-01-10',
      documents: ['GST Return', 'Income Tax Return'],
      address: '789 Corporate Avenue, Delhi - 110001'
    },
    {
      id: 3,
      name: 'Manufacturing Corp',
      email: 'info@manufacturing.com',
      phone: '7654321098',
      gstNumber: '27AABCM3344N000',
      panNumber: 'AABCM3344N',
      gstStatus: 'Filed',
      panStatus: 'Pending',
      lastFiling: '2024-01-20',
      documents: ['GST Return', 'TDS Certificate'],
      address: '321 Industrial Area, Pune, Maharashtra - 411001'
    },
    {
      id: 4,
      name: 'Retail Chain Pvt Ltd',
      email: 'contact@retailchain.com',
      phone: '6543210987',
      gstNumber: '27AABCR4455O000',
      panNumber: 'AABCR4455O',
      gstStatus: 'Filed',
      panStatus: 'Active',
      lastFiling: '2024-01-25',
      documents: ['GST Return', 'PAN Card', 'Audit Report'],
      address: '654 Shopping Complex, Chennai, Tamil Nadu - 600001'
    }
  ],

  stats: {
    totalClients: 45,
    monthlyFilings: 23,
    pendingTasks: 8,
    revenue: 275000,
    gstFilings: 18,
    panApplications: 5,
    tdsReturns: 12,
    invoicesGenerated: 34
  },

  monthlyData: [
    { month: 'Jan', filings: 15, revenue: 85000, clients: 38 },
    { month: 'Feb', filings: 18, revenue: 95000, clients: 40 },
    { month: 'Mar', filings: 22, revenue: 120000, clients: 42 },
    { month: 'Apr', filings: 25, revenue: 135000, clients: 43 },
    { month: 'May', filings: 20, revenue: 110000, clients: 44 },
    { month: 'Jun', filings: 23, revenue: 125000, clients: 45 }
  ],

  reminders: [
    {
      id: 1,
      title: 'GST Return Filing',
      client: 'Tech Solutions Pvt Ltd',
      dueDate: '2024-02-20',
      priority: 'high',
      type: 'GST'
    },
    {
      id: 2,
      title: 'TDS Return Submission',
      client: 'Global Enterprises Ltd',
      dueDate: '2024-02-25',
      priority: 'medium',
      type: 'TDS'
    },
    {
      id: 3,
      title: 'PAN Application Follow-up',
      client: 'Manufacturing Corp',
      dueDate: '2024-02-22',
      priority: 'low',
      type: 'PAN'
    }
  ],

  services: [
    { id: 1, name: 'GST Return Filing', rate: 2500, unit: 'per return' },
    { id: 2, name: 'Income Tax Return', rate: 3500, unit: 'per return' },
    { id: 3, name: 'TDS Return Filing', rate: 1500, unit: 'per return' },
    { id: 4, name: 'PAN Card Application', rate: 500, unit: 'per application' },
    { id: 5, name: 'Company Registration', rate: 15000, unit: 'per registration' },
    { id: 6, name: 'Audit Services', rate: 25000, unit: 'per audit' },
    { id: 7, name: 'Bookkeeping', rate: 5000, unit: 'per month' },
    { id: 8, name: 'Tax Consultation', rate: 2000, unit: 'per hour' }
  ],

  invoices: [
    {
      id: 'INV-001',
      clientId: 1,
      clientName: 'Tech Solutions Pvt Ltd',
      amount: 7500,
      status: 'Paid',
      date: '2024-01-15',
      dueDate: '2024-01-30'
    },
    {
      id: 'INV-002',
      clientId: 2,
      clientName: 'Global Enterprises Ltd',
      amount: 5000,
      status: 'Pending',
      date: '2024-01-20',
      dueDate: '2024-02-05'
    }
  ]
};

// Utility Functions
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCurrency = (amount) => {
  if (!amount) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return 0;
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return '#ff4757';
    case 'medium': return '#ffa502';
    case 'low': return '#2ed573';
    default: return '#747d8c';
  }
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'filed':
    case 'paid':
      return '#2ed573';
    case 'pending':
      return '#ffa502';
    case 'overdue':
    case 'inactive':
      return '#ff4757';
    default:
      return '#747d8c';
  }
};

const generateInvoiceNumber = () => {
  const timestamp = Date.now();
  return `INV-${timestamp.toString().slice(-6)}`;
};

// CSS Styles
const styles = {
  appContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  
  // Header Styles
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  logo: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '25px',
    backdropFilter: 'blur(10px)'
  },
  
  userAvatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  
  logoutButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.3s ease'
  },
  
  // Layout Styles
  mainContent: {
    display: 'flex',
    minHeight: 'calc(100vh - 80px)'
  },
  
  sidebar: {
    width: '280px',
    background: 'white',
    height: 'calc(100vh - 80px)',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: '80px',
    overflowY: 'auto'
  },
  
  sidebarHeader: {
    padding: '2rem 1.5rem 1rem',
    borderBottom: '1px solid #e9ecef'
  },
  
  menuSection: {
    padding: '1rem 0'
  },
  
  menuTitle: {
    color: '#888',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '0 0 0.5rem 1.5rem',
    fontWeight: 600
  },
  
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    color: '#555',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  },
  
  menuItemActive: {
    color: '#667eea',
    background: 'rgba(102, 126, 234, 0.1)',
    borderRight: '3px solid #667eea',
    fontWeight: 500
  },
  
  menuIcon: {
    marginRight: '0.75rem',
    fontSize: '1.1rem',
    width: '20px',
    textAlign: 'center'
  },
  
  contentArea: {
    flex: 1,
    padding: '2rem',
    overflowX: 'auto',
    background: '#f8f9fa'
  },
  
  // Auth Styles
  authContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  },
  
  authContent: {
    display: 'flex',
    gap: '3rem',
    alignItems: 'center',
    maxWidth: '900px',
    width: '100%'
  },
  
  welcomeSection: {
    flex: 1,
    color: 'white',
    textAlign: 'center'
  },
  
  welcomeTitle: {
    fontSize: '3rem',
    fontWeight: 700,
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  
  authCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  
  authTitle: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 600
  },
  
  formGroup: {
    marginBottom: '1rem'
  },
  
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontWeight: 500,
    fontSize: '0.9rem'
  },
  
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e9ecef',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  
  button: {
    width: '100%',
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem'
  },
  
  // Dashboard Styles
  dashboardContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  welcomeHeader: {
    marginBottom: '2rem'
  },
  
  welcomeTitleDash: {
    color: '#333',
    fontSize: '2rem',
    fontWeight: 700,
    margin: '0 0 0.5rem 0'
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  
  statsCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  
  cardTitle: {
    color: '#666',
    fontSize: '0.9rem',
    fontWeight: 500,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  
  cardIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    opacity: 0.9
  },
  
  cardValue: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '0.5rem'
  },
  
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  
  quickActionCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    textAlign: 'center'
  },
  
  actionIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  
  actionTitle: {
    color: '#333',
    fontSize: '1rem',
    fontWeight: 600,
    margin: '0 0 0.5rem 0'
  },
  
  section: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  },
  
  sectionTitle: {
    color: '#333',
    fontSize: '1.3rem',
    fontWeight: 600,
    margin: '0 0 1.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  
  // Client Styles
  clientsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  
  clientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  
  clientCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid #f0f0f0',
    position: 'relative'
  },
  
  clientHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  
  clientAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginRight: '1rem'
  },
  
  // Reminder Styles
  reminderCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  
  reminderHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  
  priorityBadge: {
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  
  reminderActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  
  actionButton: {
    padding: '0.4rem 0.8rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 500
  },
  
  actionButtonPrimary: {
    background: '#667eea',
    color: 'white'
  },
  
  actionButtonSecondary: {
    background: 'transparent',
    color: '#667eea',
    border: '1px solid #667eea'
  },

  // Invoice Styles
  invoiceContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },

  invoiceForm: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  },

  invoicePreview: {
    background: 'white',
    border: '1px solid #e9ecef',
    borderRadius: '12px',
    padding: '2rem',
    minHeight: '800px',
    fontFamily: 'Arial, sans-serif'
  },

  invoiceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #667eea'
  },

  companyInfo: {
    flex: 1
  },

  invoiceTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#667eea',
    margin: 0,
    textAlign: 'right'
  },

  invoiceNumber: {
    fontSize: '1rem',
    color: '#666',
    margin: '0.5rem 0 0 0',
    textAlign: 'right'
  },

  billToSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  },

  sectionHeader: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  itemsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem'
  },

  tableHeader: {
    background: '#f8f9fa',
    fontWeight: 600,
    color: '#333',
    textAlign: 'left',
    padding: '1rem',
    borderBottom: '2px solid #e9ecef'
  },

  tableCell: {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e9ecef',
    color: '#555'
  },

  totalSection: {
    marginLeft: 'auto',
    width: '300px',
    background: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px'
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontSize: '0.9rem'
  },

  grandTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '0.5rem',
    borderTop: '2px solid #667eea',
    fontWeight: 700,
    fontSize: '1.1rem',
    color: '#333'
  },

  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px'
  },

  removeButton: {
    background: '#ff4757',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.8rem',
    cursor: 'pointer'
  },

  addItemButton: {
    background: '#2ed573',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
};

// Components
const Header = () => {
  const { setIsAuthenticated, setCurrentPage } = useAppContext();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLogoClick = () => {
    setCurrentPage('dashboard');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <h1 style={styles.logo} onClick={handleLogoClick}>
          📊 CA Dashboard
        </h1>
        
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>
              {getInitials(dummyData.user.name)}
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                {dummyData.user.name}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                {dummyData.user.role}
              </div>
            </div>
          </div>
          
          <button 
            style={styles.logoutButton} 
            onClick={handleLogout}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const Sidebar = () => {
  const { currentPage, setCurrentPage } = useAppContext();

  const menuItems = [
    {
      section: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'clients', label: 'Clients', icon: '👥', badge: 45 },
        { id: 'charts', label: 'Analytics', icon: '📈' }
      ]
    },
    {
      section: 'Forms & Filing',
      items: [
        { id: 'gst-form', label: 'GST Returns', icon: '📄', badge: 8 },
        { id: 'pan-form', label: 'PAN Services', icon: '🆔', badge: 3 },
        { id: 'tds-form', label: 'TDS Returns', icon: '💳', badge: 5 }
      ]
    },
    {
      section: 'Business',
      items: [
        { id: 'invoice', label: 'Invoicing', icon: '🧾' },
        { id: 'reports', label: 'Reports', icon: '📋' },
        { id: 'calendar', label: 'Calendar', icon: '📅' }
      ]
    }
  ];

  const handleMenuClick = (itemId) => {
    setCurrentPage(itemId);
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h3 style={{ color: '#333', margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
          Navigation
        </h3>
        <p style={{ color: '#666', margin: '0.5rem 0 0', fontSize: '0.85rem' }}>
          Manage your details
        </p>
      </div>

      {menuItems.map((section) => (
        <div key={section.section} style={styles.menuSection}>
          <h4 style={styles.menuTitle}>{section.section}</h4>
          {section.items.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.menuItem,
                ...(currentPage === item.id ? styles.menuItemActive : {})
              }}
              onClick={() => handleMenuClick(item.id)}
              onMouseOver={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.background = 'rgba(102, 126, 234, 0.05)';
                  e.target.style.color = '#667eea';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#555';
                }
              }}
            >
              <span style={styles.menuIcon}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  background: '#ff4757',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.7rem',
                  marginLeft: 'auto',
                  fontWeight: 500
                }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
};

const StatsCard = ({ title, value, icon, color = '#667eea', change, changeType, footer, isCurrency = false }) => {
  const formatValue = (val) => {
    if (isCurrency) {
      return formatCurrency(val);
    }
    if (typeof val === 'number' && val >= 1000) {
      return (val / 1000).toFixed(1) + 'K';
    }
    return val.toString();
  };

  return (
    <div 
      style={{
        ...styles.statsCard,
        borderLeft: `4px solid ${color}`
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
      }}
    >
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <div style={{ ...styles.cardIcon, background: color }}>
          {icon}
        </div>
      </div>
      
      <div style={styles.cardValue}>
        {formatValue(value)}
      </div>
      
      {change && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.85rem',
          color: changeType === 'positive' ? '#28a745' : changeType === 'negative' ? '#dc3545' : '#666',
          fontWeight: 500
        }}>
          <span style={{ marginRight: '0.25rem', fontSize: '0.8rem' }}>
            {changeType === 'positive' ? '↗️' : changeType === 'negative' ? '↘️' : '➡️'}
          </span>
          {change}
        </div>
      )}
      
      {footer && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid #f0f0f0',
          fontSize: '0.8rem',
          color: '#888'
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};

const ReminderCard = ({ reminder, onComplete, onSnooze }) => {
  const daysUntilDue = getDaysUntilDue(reminder.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

  const getDueDateText = () => {
    if (isOverdue) {
      return `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''}`;
    } else if (isDueSoon) {
      return daysUntilDue === 0 ? 'Due today' : `Due in ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''}`;
    } else {
      return `Due ${formatDate(reminder.dueDate)}`;
    }
  };

  return (
    <div 
      style={{
        ...styles.reminderCard,
        borderLeft: `4px solid ${getPriorityColor(reminder.priority)}`
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateX(4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={styles.reminderHeader}>
        <div>
          <h4 style={{ margin: 0, color: '#333', fontSize: '1rem', fontWeight: 600 }}>
            {reminder.title}
          </h4>
          <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            👤 {reminder.client}
          </div>
        </div>
        <span style={{
          ...styles.priorityBadge,
          background: getPriorityColor(reminder.priority)
        }}>
          {reminder.priority}
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: isOverdue ? '#dc3545' : isDueSoon ? '#ffa502' : '#666',
          fontSize: '0.85rem',
          fontWeight: 500
        }}>
          <span style={{ marginRight: '0.5rem', fontSize: '0.9rem' }}>📅</span>
          {getDueDateText()}
        </div>
        
        <div style={styles.reminderActions}>
          <button 
            style={{ ...styles.actionButton, ...styles.actionButtonSecondary }}
            onClick={() => onSnooze && onSnooze(reminder.id)}
            onMouseOver={(e) => {
              e.target.background = '#667eea';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#667eea';
            }}
          >
            Snooze
          </button>
          <button 
            style={{ ...styles.actionButton, ...styles.actionButtonPrimary }}
            onClick={() => onComplete && onComplete(reminder.id)}
            onMouseOver={(e) => {
              e.target.style.background = '#5a67d8';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#667eea';
            }}
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

const InvoiceGenerator = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientId: '',
    notes: '',
    terms: 'Payment due within 30 days. Late fees may apply.',
    items: []
  });

  const [newItem, setNewItem] = useState({
    serviceId: '',
    description: '',
    quantity: 1,
    rate: 0,
    amount: 0
  });

  const [invoices, setInvoices] = useState(dummyData.invoices);

  const selectedClient = dummyData.clients.find(client => client.id === parseInt(invoiceData.clientId));

  const handleInputChange = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (field, value) => {
    setNewItem(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'serviceId') {
        const service = dummyData.services.find(s => s.id === parseInt(value));
        if (service) {
          updated.description = service.name;
          updated.rate = service.rate;
          updated.amount = updated.quantity * service.rate;
        }
      } else if (field === 'quantity' || field === 'rate') {
        updated.amount = updated.quantity * updated.rate;
      }
      return updated;
    });
  };

  const addItem = () => {
    if (newItem.serviceId && newItem.quantity > 0 && newItem.rate > 0) {
      setInvoiceData(prev => ({
        ...prev,
        items: [...prev.items, { ...newItem, id: Date.now() }]
      }));
      setNewItem({
        serviceId: '',
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      });
    }
  };

  const removeItem = (itemId) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const taxRate = 0.18; // 18% GST
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  const generateInvoice = () => {
    const newInvoice = {
      id: invoiceData.invoiceNumber,
      clientId: parseInt(invoiceData.clientId),
      clientName: selectedClient?.name || '',
      amount: total,
      status: 'Pending',
      date: invoiceData.date,
      dueDate: invoiceData.dueDate,
      items: invoiceData.items,
      notes: invoiceData.notes,
      terms: invoiceData.terms,
      subtotal,
      tax,
      total
    };

    setInvoices(prev => [...prev, newInvoice]);
    
    // Reset form
    setInvoiceData({
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      clientId: '',
      notes: '',
      terms: 'Payment due within 30 days. Late fees may apply.',
      items: []
    });

    alert('Invoice generated successfully!');
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div style={styles.invoiceContainer}>
      <div style={styles.clientsHeader}>
        <h1 style={{ color: '#333', fontSize: '2rem', fontWeight: 700, margin: 0 }}>
          Invoice Generator
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            style={{
              background: '#2ed573',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={generateInvoice}
            disabled={!invoiceData.clientId || invoiceData.items.length === 0}
          >
            Generate Invoice
          </button>
          <button 
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={printInvoice}
          >
            Print Preview
          </button>
        </div>
      </div>

      <div style={styles.invoiceForm}>
        {/* Form Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Invoice Details</h2>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Invoice Number</label>
            <input
              style={styles.input}
              type="text"
              value={invoiceData.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Invoice Date</label>
              <input
                style={styles.input}
                type="date"
                value={invoiceData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Due Date</label>
              <input
                style={styles.input}
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Select Client</label>
            <select
              style={styles.input}
              value={invoiceData.clientId}
              onChange={(e) => handleInputChange('clientId', e.target.value)}
            >
              <option value="">Choose a client...</option>
              {dummyData.clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <h3 style={{ color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>Add Items/Services</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Service</label>
            <select
              style={styles.input}
              value={newItem.serviceId}
              onChange={(e) => handleItemChange('serviceId', e.target.value)}
            >
              <option value="">Select a service...</option>
              {dummyData.services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - {formatCurrency(service.rate)} {service.unit}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Quantity</label>
              <input
                style={styles.input}
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) => handleItemChange('quantity', parseInt(e.target.value) || 1)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Rate</label>
              <input
                style={styles.input}
                type="number"
                value={newItem.rate}
                onChange={(e) => handleItemChange('rate', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Amount</label>
              <input
                style={styles.input}
                type="text"
                value={formatCurrency(newItem.amount)}
                readOnly
              />
            </div>
          </div>

          <button
            style={styles.addItemButton}
            onClick={addItem}
            disabled={!newItem.serviceId || newItem.quantity <= 0 || newItem.rate <= 0}
          >
            <span>+</span>
            Add Item
          </button>

          {/* Items List */}
          {invoiceData.items.length > 0 && (
            <div>
              <h4 style={{ color: '#333', margin: '1rem 0' }}>Added Items:</h4>
              {invoiceData.items.map((item) => (
                <div key={item.id} style={styles.itemRow}>
                  <div style={{ flex: 1 }}>
                    <strong>{item.description}</strong>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      Qty: {item.quantity} × {formatCurrency(item.rate)} = {formatCurrency(item.amount)}
                    </div>
                  </div>
                  <button
                    style={styles.removeButton}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Notes</label>
            <textarea
              style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
              value={invoiceData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes for the client..."
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Terms & Conditions</label>
            <textarea
              style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
              value={invoiceData.terms}
              onChange={(e) => handleInputChange('terms', e.target.value)}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div style={styles.invoicePreview}>
          <div style={styles.invoiceHeader}>
            <div style={styles.companyInfo}>
              <h1 style={{ margin: 0, color: '#667eea', fontSize: '1.8rem', fontWeight: 700 }}>
                {dummyData.user.name}
              </h1>
              <div style={{ color: '#666', marginTop: '0.5rem' }}>
                <div>{dummyData.user.role}</div>
                <div>{dummyData.user.email}</div>
                <div>{dummyData.user.phone}</div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  {dummyData.user.address}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>
                  GST: {dummyData.user.gstNumber}
                </div>
              </div>
            </div>
            <div>
              <h1 style={styles.invoiceTitle}>INVOICE</h1>
              <div style={styles.invoiceNumber}>#{invoiceData.invoiceNumber}</div>
            </div>
          </div>

          <div style={styles.billToSection}>
            <div>
              <div style={styles.sectionHeader}>Bill To:</div>
              {selectedClient ? (
                <div style={{ color: '#555', lineHeight: 1.6 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{selectedClient.name}</div>
                  <div>{selectedClient.email}</div>
                  <div>{selectedClient.phone}</div>
                  <div>{selectedClient.address}</div>
                  <div>GST: {selectedClient.gstNumber}</div>
                </div>
              ) : (
                <div style={{ color: '#999', fontStyle: 'italic' }}>
                  Select a client to display billing information
                </div>
              )}
            </div>
            <div>
              <div style={styles.sectionHeader}>Invoice Details:</div>
              <div style={{ color: '#555', lineHeight: 1.6 }}>
                <div><strong>Date:</strong> {formatDate(invoiceData.date)}</div>
                <div><strong>Due Date:</strong> {formatDate(invoiceData.dueDate)}</div>
                <div><strong>Payment Terms:</strong> Net 30</div>
              </div>
            </div>
          </div>

          {invoiceData.items.length > 0 && (
            <>
              <table style={styles.itemsTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Description</th>
                    <th style={styles.tableHeader}>Qty</th>
                    <th style={styles.tableHeader}>Rate</th>
                    <th style={styles.tableHeader}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td style={styles.tableCell}>{item.description}</td>
                      <td style={styles.tableCell}>{item.quantity}</td>
                      <td style={styles.tableCell}>{formatCurrency(item.rate)}</td>
                      <td style={styles.tableCell}>{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={styles.totalSection}>
                <div style={styles.totalRow}>
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div style={styles.totalRow}>
                  <span>GST (18%):</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div style={styles.grandTotalRow}>
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </>
          )}

          {invoiceData.notes && (
            <div style={{ marginTop: '2rem' }}>
              <div style={styles.sectionHeader}>Notes:</div>
              <div style={{ color: '#555', lineHeight: 1.6, marginTop: '0.5rem' }}>
                {invoiceData.notes}
              </div>
            </div>
          )}

          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e9ecef' }}>
            <div style={styles.sectionHeader}>Terms & Conditions:</div>
            <div style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
              {invoiceData.terms}
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            color: '#888',
            fontSize: '0.9rem',
            borderTop: '1px solid #e9ecef',
            paddingTop: '1rem'
          }}>
            Thank you for your business!
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Invoices</h2>
        {invoices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <div>No invoices generated yet.</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.itemsTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Invoice #</th>
                  <th style={styles.tableHeader}>Client</th>
                  <th style={styles.tableHeader}>Amount</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td style={styles.tableCell}>{invoice.id}</td>
                    <td style={styles.tableCell}>{invoice.clientName}</td>
                    <td style={styles.tableCell}>{formatCurrency(invoice.amount)}</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        background: getStatusColor(invoice.status),
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        textTransform: 'uppercase'
                      }}>
                        {invoice.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>{formatDate(invoice.date)}</td>
                    <td style={styles.tableCell}>{formatDate(invoice.dueDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [reminders, setReminders] = useState(dummyData.reminders);
  const { setCurrentPage } = useAppContext();

  const stats = [
    {
      title: 'Total Clients',
      value: dummyData.stats.totalClients,
      icon: '👥',
      color: '#667eea',
      change: '+5 this month',
      changeType: 'positive',
      footer: 'Active clients'
    },
    {
      title: 'Monthly Revenue',
      value: dummyData.stats.revenue,
      icon: '💰',
      color: '#2ed573',
      change: '+12% from last month',
      changeType: 'positive',
      footer: 'Revenue this month',
      isCurrency: true
    },
    {
      title: 'Pending Tasks',
      value: dummyData.stats.pendingTasks,
      icon: '⏰',
      color: '#ffa502',
      change: '-3 from yesterday',
      changeType: 'positive',
      footer: 'Tasks to complete'
    },
    {
      title: 'Monthly Filings',
      value: dummyData.stats.monthlyFilings,
      icon: '📄',
      color: '#ff4757',
      change: '+8 completed',
      changeType: 'positive',
      footer: 'Filed this month'
    }
  ];

  const quickActions = [
    {
      id: 'gst-form',
      title: 'File GST Return',
      description: 'Submit GST returns for clients',
      icon: '📄'
    },
    {
      id: 'clients',
      title: 'Add New Client',
      description: 'Register a new client',
      icon: '👤'
    },
    {
      id: 'invoice',
      title: 'Create Invoice',
      description: 'Generate client invoices',
      icon: '🧾'
    },
    {
      id: 'pan-form',
      title: 'PAN Services',
      description: 'Apply for PAN cards',
      icon: '🆔'
    }
  ];

  const recentActivities = [
    { icon: '📄', text: 'GST return filed for Tech Solutions Pvt Ltd', time: '2 hours ago' },
    { icon: '👤', text: 'New client "Global Enterprises" added', time: '4 hours ago' },
    { icon: '🧾', text: 'Invoice INV-003 generated for Manufacturing Corp', time: '6 hours ago' },
    { icon: '💳', text: 'TDS return submitted for Retail Chain Pvt Ltd', time: '1 day ago' },
    { icon: '📊', text: 'Monthly report generated', time: '2 days ago' }
  ];

  const handleReminderComplete = (reminderId) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
  };

  const handleReminderSnooze = (reminderId) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
        : reminder
    ));
  };

  const handleQuickAction = (actionId) => {
    setCurrentPage(actionId);
  };

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.welcomeHeader}>
        <h1 style={styles.welcomeTitleDash}>
          {getCurrentTime()}, {dummyData.user.name.split(' ')[0]}! 👋
        </h1>
        <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>
          Today's Tasks and Reminders
        </p>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
            changeType={stat.changeType}
            footer={stat.footer}
            isCurrency={stat.isCurrency}
          />
        ))}
      </div>

      <div style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <div 
            key={action.id}
            style={styles.quickActionCard}
            onClick={() => handleQuickAction(action.id)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div style={styles.actionIcon}>{action.icon}</div>
            <h3 style={styles.actionTitle}>{action.title}</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>
              {action.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span>📋</span>
            Upcoming Tasks & Reminders
          </h2>
          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onComplete={handleReminderComplete}
                onSnooze={handleReminderSnooze}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <div>All tasks completed! Great job!</div>
            </div>
          )}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span>🕒</span>
            Recent Activity
          </h2>
          {recentActivities.map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem 0',
              borderBottom: index < recentActivities.length - 1 ? '1px solid #f0f0f0' : 'none'
            }}>
              <div style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: 'rgba(102, 126, 234, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem',
                fontSize: '0.9rem'
              }}>
                {activity.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#333', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  {activity.text}
                </div>
                <div style={{ color: '#888', fontSize: '0.8rem' }}>
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClientCard = ({ client }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div 
      style={styles.clientCard}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.borderColor = '#667eea';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#f0f0f0';
      }}
    >
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'rgba(102, 126, 234, 0.1)',
        color: '#667eea',
        padding: '0.25rem 0.5rem',
        borderRadius: '12px',
        fontSize: '0.7rem',
        fontWeight: 500
      }}>
        📄 {client.documents ? client.documents.length : 0} docs
      </div>

      <div style={styles.clientHeader}>
        <div style={styles.clientAvatar}>
          {getInitials(client.name)}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.25rem 0', color: '#333', fontSize: '1.1rem', fontWeight: 600 }}>
            {client.name}
          </h3>
          <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
            📧 {client.email}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            📞 {client.phone}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div style={{
            color: '#888',
            fontSize: '0.8rem',
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            GST Status
          </div>
          <span style={{
            background: getStatusColor(client.gstStatus),
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: 500,
            textTransform: 'uppercase'
          }}>
            {client.gstStatus}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div style={{
            color: '#888',
            fontSize: '0.8rem',
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            PAN Status
          </div>
          <span style={{
            background: getStatusColor(client.panStatus),
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: 500,
            textTransform: 'uppercase'
          }}>
            {client.panStatus}
          </span>
        </div>
      </div>

      <div style={{
        marginBottom: '1rem',
        padding: '1rem',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ color: '#666', fontWeight: 500 }}>GST Number:</span>
          <span style={{ color: '#333', fontFamily: 'monospace', fontSize: '0.8rem' }}>
            {client.gstNumber}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ color: '#666', fontWeight: 500 }}>PAN Number:</span>
          <span style={{ color: '#333', fontFamily: 'monospace', fontSize: '0.8rem' }}>
            {client.panNumber}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ color: '#666', fontWeight: 500 }}>Last Filing:</span>
          <span style={{ color: '#333', fontFamily: 'monospace', fontSize: '0.8rem' }}>
            {formatDate(client.lastFiling)}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button style={{
          flex: 1,
          padding: '0.5rem',
          background: '#f8f9fa',
          color: '#667eea',
          border: '1px solid #e9ecef',
          borderRadius: '6px',
          fontSize: '0.8rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          View Details
        </button>
        <button style={{
          flex: 1,
          padding: '0.5rem',
          background: '#f8f9fa',
          color: '#667eea',
          border: '1px solid #e9ecef',
          borderRadius: '6px',
          fontSize: '0.8rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          Edit
        </button>
        <button style={{
          flex: 1,
          padding: '0.5rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '0.8rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          File Return
        </button>
      </div>

      <div style={{
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: '#888'
      }}>
        <span style={{ marginRight: '0.5rem' }}>🕒</span>
        <span>Last updated {formatDate(client.lastFiling)}</span>
      </div>
    </div>
  );
};

const ClientDashboard = () => {
  const [clients, setClients] = useState(dummyData.clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchTerm || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.gstNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.panNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      client.gstStatus.toLowerCase() === statusFilter || 
      client.panStatus.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const clientStats = {
    total: clients.length,
    active: clients.filter(c => c.gstStatus === 'Filed' && c.panStatus === 'Active').length,
    pending: clients.filter(c => c.gstStatus === 'Pending' || c.panStatus === 'Pending').length,
    documents: clients.reduce((acc, c) => acc + (c.documents ? c.documents.length : 0), 0)
  };

  const handleAddClient = () => {
    const newClient = {
      id: clients.length + 1,
      name: `New Client ${clients.length + 1}`,
      email: `client${clients.length + 1}@example.com`,
      phone: '9876543210',
      gstNumber: `27AABCN${clients.length + 1}000`,
      panNumber: `AABCN${clients.length + 1}L`,
      gstStatus: 'Pending',
      panStatus: 'Active',
      lastFiling: new Date().toISOString().split('T')[0],
      documents: ['GST Return'],
      address: `Address ${clients.length + 1}, City, State - 123456`
    };
    setClients(prev => [...prev, newClient]);
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.clientsHeader}>
        <h1 style={{ color: '#333', fontSize: '2rem', fontWeight: 700, margin: 0 }}>
          Client Management
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...styles.input,
              width: '300px',
              margin: 0
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              ...styles.input,
              width: 'auto',
              margin: 0
            }}
          >
            <option value="all">All Status</option>
            <option value="filed">Filed</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
          </select>
          <button 
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onClick={handleAddClient}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span>+</span>
            Add Client
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ ...styles.section, textAlign: 'center', borderLeft: '4px solid #667eea' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333', marginBottom: '0.5rem' }}>
            {clientStats.total}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Total Clients
          </div>
        </div>
        <div style={{ ...styles.section, textAlign: 'center', borderLeft: '4px solid #2ed573' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333', marginBottom: '0.5rem' }}>
            {clientStats.active}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Active Clients
          </div>
        </div>
        <div style={{ ...styles.section, textAlign: 'center', borderLeft: '4px solid #ffa502' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333', marginBottom: '0.5rem' }}>
            {clientStats.pending}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Pending Tasks
          </div>
        </div>
        <div style={{ ...styles.section, textAlign: 'center', borderLeft: '4px solid #ff4757' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333', marginBottom: '0.5rem' }}>
            {clientStats.documents}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Total Documents
          </div>
        </div>
      </div>

      {filteredClients.length > 0 ? (
        <div style={styles.clientsGrid}>
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <div>
            {searchTerm || statusFilter !== 'all' 
              ? 'No clients found matching your criteria'
              : 'No clients yet. Add your first client to get started!'
            }
          </div>
        </div>
      )}
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: 'demo@caoffice.com',
    password: 'demo123'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setErrors({ general: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (formData.email === 'demo@caoffice.com' && formData.password === 'demo123') {
        onLogin();
      } else {
        setErrors({ general: 'Invalid email or password. Use demo credentials.' });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.authCard}>
      <h2 style={styles.authTitle}>Welcome Back</h2>
      
      <div style={{
        background: '#f8f9fa',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem',
        borderLeft: '4px solid #667eea'
      }}>
        <div style={{ fontWeight: 600, color: '#667eea', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          Demo Credentials
        </div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>
          Email: demo@caoffice.com<br />
          Password: demo123
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {errors.general && (
          <div style={{ color: '#dc3545', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center' }}>
            {errors.general}
          </div>
        )}

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email Address</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <button 
          style={{
            ...styles.button,
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
          type="submit" 
          disabled={isLoading}
          onMouseOver={(e) => {
            if (!isLoading) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1rem', color: '#667eea', fontSize: '0.9rem', cursor: 'pointer' }}>
        Forgot your password?
      </div>
    </div>
  );
};

const AuthPage = () => {
  const { setIsAuthenticated, setUser } = useAppContext();

  const handleLogin = () => {
    setUser(dummyData.user);
    setIsAuthenticated(true);
  };

  const features = [
    { icon: '📊', text: 'Comprehensive Dashboard' },
    { icon: '👥', text: 'Client Management System' },
    { icon: '📄', text: 'GST & Tax Filing' },
    { icon: '📈', text: 'Analytics & Reports' },
    { icon: '🧾', text: 'Invoice Generation' },
    { icon: '⚡', text: 'Real-time Updates' }
  ];

  return (
    <div style={styles.authContainer}>
      <div style={styles.authContent}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>Welcome Back!</h1>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Access your Digital CA Platform
          </p>
          
          <div style={{ listStyle: 'none', padding: 0, textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                fontSize: '1rem',
                opacity: 0.9
              }}>
                <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>
                  {feature.icon}
                </span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '0 0 400px' }}>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      <div style={styles.mainContent}>
        <Sidebar />
        <main style={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    currentPage,
    setCurrentPage,
    user,
    setUser
  };

  if (!isAuthenticated) {
    return (
      <AppContext.Provider value={contextValue}>
        <div style={styles.appContainer}>
          <AuthPage />
        </div>
      </AppContext.Provider>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientDashboard />;
      case 'invoice':
        return <InvoiceGenerator />;
      case 'gst-form':
        return <div style={styles.section}>
          <h1 style={{ color: '#333', margin: '0 0 1rem 0' }}>GST Form</h1>
          <p>GST return filing form will be implemented here.</p>
        </div>;
      case 'pan-form':
        return <div style={styles.section}>
          <h1 style={{ color: '#333', margin: '0 0 1rem 0' }}>PAN Services</h1>
          <p>PAN application form will be implemented here.</p>
        </div>;
      case 'tds-form':
        return <div style={styles.section}>
          <h1 style={{ color: '#333', margin: '0 0 1rem 0' }}>TDS Returns</h1>
          <p>TDS return form will be implemented here.</p>
        </div>;
      case 'charts':
        return <div style={styles.section}>
          <h1 style={{ color: '#333', margin: '0 0 1rem 0' }}>Analytics</h1>
          <p>Charts and analytics will be implemented here.</p>
        </div>;
      case 'reports':
        return <div style={styles.section}>
          <h1 style={{ color: '#333', margin: '0 0 1rem 0' }}>Reports</h1>
          <p>Reports section will be implemented here.</p>
        </div>;
      case 'calendar':
        return <div style={styles.section}>
          <h1 style={{ color: '#333', margin: '0 0 1rem 0' }}>Calendar</h1>
          <p>Calendar view will be implemented here.</p>
        </div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div style={styles.appContainer}>
        <Layout>
          {renderCurrentPage()}
        </Layout>
      </div>
    </AppContext.Provider>
  );
}

export default App;