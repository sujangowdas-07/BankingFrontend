import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBanking } from '../context/BankingContext';
import BalanceCard from '../components/BalanceCard';
import NotificationToast from '../components/NotificationToast';
import { User, Mail, Phone, CreditCard, CheckCircle } from 'lucide-react';

const Account = () => {
  const { user } = useAuth();
  const { balance, refreshBalance, loading } = useBanking();
  const [notification, setNotification] = useState(null);

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

  const accountDetails = [
    { icon: User, label: 'Account Holder', value: user?.name },
    { icon: CreditCard, label: 'Account Number', value: user?.accountNumber },
    { icon: CreditCard, label: 'Account Type', value: user?.accountType },
    { icon: Mail, label: 'Email', value: user?.email },
    { icon: Phone, label: 'Phone', value: user?.phone },
    { icon: CheckCircle, label: 'Status', value: user?.status }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {notification && (
        <NotificationToast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-600">View your account details and balance information</p>
      </div>

      <BalanceCard
        balance={balance}
        accountNumber={user?.accountNumber}
        accountType={user?.accountType}
        onRefresh={handleRefresh}
        loading={loading}
      />

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accountDetails.map((detail, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-primary-100 rounded-lg">
                <detail.icon size={20} className="text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{detail.label}</p>
                <p className="font-semibold text-gray-900">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Account Security</h3>
        <p className="text-sm text-blue-800 mb-4">
          Your account is protected with industry-standard security measures. 
          Keep your login credentials safe and never share them with anyone.
        </p>
        <ul className="text-sm text-blue-700 space-y-1 ml-5 list-disc">
          <li>Two-factor authentication enabled</li>
          <li>Encrypted data transmission</li>
          <li>Regular security audits</li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
