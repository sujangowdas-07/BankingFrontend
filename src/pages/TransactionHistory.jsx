import { useEffect, useState } from 'react';
import { useBanking } from '../context/BankingContext';
import { useAuth } from '../context/AuthContext';
import TransactionTable from '../components/TransactionTable';
import NotificationToast from '../components/NotificationToast';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, Filter, Download, Calendar } from 'lucide-react';

const TransactionHistory = () => {
  const { user } = useAuth();
  const { getTransactionHistory, loading } = useBanking();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    type: 'ALL',
    search: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, filters]);

  const loadTransactions = async () => {
    try {
      const txns = await getTransactionHistory();
      setTransactions(txns);
      setFilteredTransactions(txns);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to load transactions'
      });
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Filter by type
    if (filters.type !== 'ALL') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(t =>
        t.id.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate));
    }

    setFilteredTransactions(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      setNotification({
        type: 'warning',
        message: 'No transactions to export'
      });
      return;
    }

    const csvContent = [
      ['Transaction ID', 'Type', 'Amount', 'Description', 'Date', 'Status', 'Opening Balance', 'Closing Balance'],
      ...filteredTransactions.map(t => [
        t.id,
        t.type,
        t.amount,
        t.description,
        new Date(t.date).toLocaleString(),
        t.status,
        t.openingBalance || '',
        t.closingBalance || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${user?.accountNumber}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    setNotification({
      type: 'success',
      message: 'Transactions exported successfully'
    });
  };

  const clearFilters = () => {
    setFilters({
      type: 'ALL',
      search: '',
      startDate: '',
      endDate: ''
    });
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading transactions..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {notification && (
        <NotificationToast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
          <p className="text-gray-600">
            View and manage all your transactions for account {user?.accountNumber}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn-primary flex items-center gap-2"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="label">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by ID or description"
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="label">Transaction Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="ALL">All Types</option>
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="TRANSFER">Transfer</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="label">Date From</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="label">Date To</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="md:col-span-3 flex items-end">
            <button
              onClick={clearFilters}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">No transactions found</p>
            <button onClick={clearFilters} className="text-primary-600 hover:text-primary-700 text-sm">
              Clear filters to see all transactions
            </button>
          </div>
        ) : (
          <TransactionTable transactions={filteredTransactions} />
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
