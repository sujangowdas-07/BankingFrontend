import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBanking } from '../context/BankingContext';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import NotificationToast from '../components/NotificationToast';
import { ArrowLeft, ArrowDownToLine } from 'lucide-react';

const Deposit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { deposit, loading, balance } = useBanking();
  const [notification, setNotification] = useState(null);
  const [transactionResult, setTransactionResult] = useState(null);

  const handleDeposit = async (formData) => {
    const amount = parseFloat(formData.amount);
    
    if (isNaN(amount) || amount <= 0) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid amount'
      });
      return;
    }

    try {
      const response = await deposit(amount, formData.description);
      
      setTransactionResult(response.data);
      setNotification({
        type: 'success',
        message: `Successfully deposited ${formatCurrency(amount)}`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Deposit failed'
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
          <h1 className="text-3xl font-bold text-gray-900">Deposit Funds</h1>
          <p className="text-gray-600">Add money to your account</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-lg">
            <ArrowDownToLine size={24} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Deposit Money</h2>
            <p className="text-sm text-gray-600">
              Account: {user?.accountNumber} | Current Balance: {formatCurrency(balance)}
            </p>
          </div>
        </div>

        <TransactionForm type="deposit" onSubmit={handleDeposit} loading={loading} />
      </div>

      {transactionResult && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-semibold text-green-900 mb-4">Transaction Successful!</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Transaction ID:</span>
              <span className="font-semibold text-green-900">{transactionResult.transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Amount Deposited:</span>
              <span className="font-semibold text-green-900">
                +{formatCurrency(transactionResult.transaction.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">New Balance:</span>
              <span className="font-semibold text-green-900">
                {formatCurrency(transactionResult.newBalance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Date:</span>
              <span className="font-semibold text-green-900">
                {new Date(transactionResult.transaction.date).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
