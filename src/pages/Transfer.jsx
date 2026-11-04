import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBanking } from '../context/BankingContext';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationToast from '../components/NotificationToast';
import { ArrowLeft, ArrowLeftRight, AlertCircle } from 'lucide-react';

const Transfer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transfer, loading, balance } = useBanking();
  const [notification, setNotification] = useState(null);
  const [transactionResult, setTransactionResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTransfer, setPendingTransfer] = useState(null);

  const handleTransferRequest = (formData) => {
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
        message: 'Insufficient balance for this transfer'
      });
      return;
    }

    if (!formData.beneficiaryAccount) {
      setNotification({
        type: 'error',
        message: 'Please enter beneficiary account number'
      });
      return;
    }

    if (formData.beneficiaryAccount === user?.accountNumber) {
      setNotification({
        type: 'error',
        message: 'Cannot transfer to the same account'
      });
      return;
    }

    setPendingTransfer(formData);
    setShowConfirmModal(true);
  };

  const handleConfirmTransfer = async () => {
    setShowConfirmModal(false);
    
    const amount = parseFloat(pendingTransfer.amount);
    
    try {
      const response = await transfer(
        pendingTransfer.beneficiaryAccount,
        amount,
        pendingTransfer.remarks
      );
      
      setTransactionResult(response.data);
      setNotification({
        type: 'success',
        message: `Successfully transferred ${formatCurrency(amount)} to ${response.data.beneficiaryName}`
      });
      setPendingTransfer(null);
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Transfer failed'
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

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmTransfer}
        title="Confirm Transfer"
        message={`Are you sure you want to transfer ${pendingTransfer ? formatCurrency(parseFloat(pendingTransfer.amount)) : ''} to account ${pendingTransfer?.beneficiaryAccount}?`}
        type="warning"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transfer Funds</h1>
          <p className="text-gray-600">Send money to another account</p>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Available Balance: {formatCurrency(balance)}</p>
            <p>Transfers are processed immediately. Please verify the beneficiary account number before proceeding.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <ArrowLeftRight size={24} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Transfer Money</h2>
            <p className="text-sm text-gray-600">
              From Account: {user?.accountNumber} | Available: {formatCurrency(balance)}
            </p>
          </div>
        </div>

        <TransactionForm type="transfer" onSubmit={handleTransferRequest} loading={loading} />
      </div>

      {transactionResult && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-4">Transfer Successful!</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Transaction ID:</span>
              <span className="font-semibold text-blue-900">{transactionResult.transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Beneficiary:</span>
              <span className="font-semibold text-blue-900">{transactionResult.beneficiaryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Account Number:</span>
              <span className="font-semibold text-blue-900">{transactionResult.transaction.beneficiaryAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Amount Transferred:</span>
              <span className="font-semibold text-blue-900">
                -{formatCurrency(transactionResult.transaction.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">New Balance:</span>
              <span className="font-semibold text-blue-900">
                {formatCurrency(transactionResult.newBalance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Date:</span>
              <span className="font-semibold text-blue-900">
                {new Date(transactionResult.transaction.date).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transfer;
