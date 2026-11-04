import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBanking } from '../context/BankingContext';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import NotificationToast from '../components/NotificationToast';
import { ArrowLeft, ArrowUpFromLine, AlertCircle } from 'lucide-react';

const Withdraw = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { withdraw, loading, balance } = useBanking();
  const [notification, setNotification] = useState(null);
  const [transactionResult, setTransactionResult] = useState(null);

  const handleWithdraw = async (formData) => {
    const amount = parseFloat(formData.amount);
    
    if (isNaN(amount) || amount <= 0) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid amount'
      });
      return;
    }

    if (amount > balance) {
      setNotification({
        type: 'error',
        message: 'Insufficient balance for this withdrawal'
      });
      return;
    }

    try {
      const response = await withdraw(amount, formData.description);
      
      setTransactionResult(response.data);
      setNotification({
        type: 'success',
        message: `Successfully withdrawn ${formatCurrency(amount)}`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Withdrawal failed'
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {notification && (
        <NotificationToast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Withdraw Funds</h1>
          <p className="text-gray-600">Withdraw money from your account</p>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Available Balance: {formatCurrency(balance)}</p>
            <p>Please ensure you have sufficient funds before proceeding with the withdrawal.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-100 rounded-lg">
            <ArrowUpFromLine size={24} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Withdraw Money</h2>
            <p className="text-sm text-gray-600">
              Account: {user?.accountNumber} | Available: {formatCurrency(balance)}
            </p>
          </div>
        </div>

        <TransactionForm type="withdraw" onSubmit={handleWithdraw} loading={loading} />
      </div>

      {transactionResult && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-semibold text-red-900 mb-4">Transaction Successful!</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-red-700">Transaction ID:</span>
              <span className="font-semibold text-red-900">{transactionResult.transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Amount Withdrawn:</span>
              <span className="font-semibold text-red-900">
                -{formatCurrency(transactionResult.transaction.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">New Balance:</span>
              <span className="font-semibold text-red-900">
                {formatCurrency(transactionResult.newBalance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Date:</span>
              <span className="font-semibold text-red-900">
                {new Date(transactionResult.transaction.date).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
