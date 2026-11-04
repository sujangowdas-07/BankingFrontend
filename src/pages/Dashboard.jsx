import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  ArrowLeftRight, 
  History,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBanking } from '../context/BankingContext';
import BalanceCard from '../components/BalanceCard';
import DashboardCard from '../components/DashboardCard';
import TransactionTable from '../components/TransactionTable';
import NotificationToast from '../components/NotificationToast';
import LoadingSpinner from '../components/LoadingSpinner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance, refreshBalance, getTransactionHistory, loading } = useBanking();
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState(null);
  const [stats, setStats] = useState({
    totalDeposits: 0,
    totalWithdrawals: 0,
    transactionCount: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await refreshBalance();
      const txns = await getTransactionHistory();
      setTransactions(txns);
      calculateStats(txns);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to load dashboard data'
      });
    }
  };

  const calculateStats = (txns) => {
    const deposits = txns.filter(t => t.type === 'DEPOSIT').reduce((sum, t) => sum + t.amount, 0);
    const withdrawals = txns.filter(t => t.type === 'WITHDRAWAL' || t.type === 'TRANSFER').reduce((sum, t) => sum + t.amount, 0);
    
    setStats({
      totalDeposits: deposits,
      totalWithdrawals: withdrawals,
      transactionCount: txns.length
    });
  };

  const handleRefresh = async () => {
    try {
      await refreshBalance();
      setNotification({
        type: 'success',
        message: 'Balance refreshed successfully'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to refresh balance'
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Prepare chart data
  const chartData = transactions.slice(0, 10).reverse().map((txn, index) => ({
    name: `T${index + 1}`,
    balance: txn.closingBalance || 0
  }));

  if (loading && transactions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
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

      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">Here's what's happening with your account today</p>
      </div>

      {/* Balance Card */}
      <BalanceCard
        balance={balance}
        accountNumber={user?.accountNumber}
        accountType={user?.accountType}
        onRefresh={handleRefresh}
        loading={loading}
      />

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            icon={ArrowDownToLine}
            title="Deposit"
            value="Add Funds"
            subtitle="Deposit money to account"
            iconColor="bg-green-600"
            onClick={() => navigate('/deposit')}
          />
          <DashboardCard
            icon={ArrowUpFromLine}
            title="Withdraw"
            value="Get Cash"
            subtitle="Withdraw from account"
            iconColor="bg-red-600"
            onClick={() => navigate('/withdraw')}
          />
          <DashboardCard
            icon={ArrowLeftRight}
            title="Transfer"
            value="Send Money"
            subtitle="Transfer to another account"
            iconColor="bg-blue-600"
            onClick={() => navigate('/transfer')}
          />
          <DashboardCard
            icon={History}
            title="History"
            value="View All"
            subtitle="Transaction history"
            iconColor="bg-purple-600"
            onClick={() => navigate('/transactions')}
          />
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            icon={TrendingUp}
            title="Total Income"
            value={formatCurrency(stats.totalDeposits)}
            subtitle="From deposits"
          />
          <DashboardCard
            icon={TrendingDown}
            title="Total Expenses"
            value={formatCurrency(stats.totalWithdrawals)}
            subtitle="From withdrawals & transfers"
          />
          <DashboardCard
            icon={History}
            title="Transactions"
            value={stats.transactionCount}
            subtitle="Total transactions"
          />
        </div>
      </div>

      {/* Balance Chart */}
      {chartData.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Balance Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0066ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#0066ff" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          <button
            onClick={() => navigate('/transactions')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View All →
          </button>
        </div>
        <TransactionTable transactions={transactions} maxRows={5} />
      </div>
    </div>
  );
};

export default Dashboard;
