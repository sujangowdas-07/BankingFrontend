import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const BalanceCard = ({ balance, accountNumber, accountType, onRefresh, loading }) => {
  const [showBalance, setShowBalance] = useState(true);

  const maskAccountNumber = (number) => {
    if (!number) return '';
    const str = String(number);
    return `****${str.slice(-4)}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="card bg-gradient-to-br from-navy-700 to-navy-900 text-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-300 text-sm mb-1">Account Number</p>
          <p className="text-lg font-semibold">{maskAccountNumber(accountNumber)}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-300 text-sm mb-1">Available Balance</p>
        <h2 className="text-4xl font-bold">
          {showBalance ? formatCurrency(balance) : '••••••'}
        </h2>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/20">
        <span className="text-sm text-gray-300">Account Type</span>
        <span className="text-sm font-medium">{accountType}</span>
      </div>
    </div>
  );
};

export default BalanceCard;
