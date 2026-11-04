import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight } from 'lucide-react';

const TransactionTable = ({ transactions, maxRows }) => {
  const displayTransactions = maxRows ? transactions.slice(0, maxRows) : transactions;

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'DEPOSIT':
        return <ArrowDownToLine size={16} className="text-green-600" />;
      case 'WITHDRAWAL':
        return <ArrowUpFromLine size={16} className="text-red-600" />;
      case 'TRANSFER':
        return <ArrowLeftRight size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'DEPOSIT':
        return 'text-green-600';
      case 'WITHDRAWAL':
        return 'text-red-600';
      case 'TRANSFER':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No transactions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {displayTransactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  {getTransactionIcon(transaction.type)}
                  <span className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                    {transaction.type}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <p className="text-sm text-gray-900">{transaction.description}</p>
                <p className="text-xs text-gray-500">{transaction.id}</p>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {formatDate(transaction.date)}
              </td>
              <td className={`py-3 px-4 text-right font-semibold ${getTransactionColor(transaction.type)}`}>
                {transaction.type === 'DEPOSIT' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </td>
              <td className="py-3 px-4 text-center">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  transaction.status === 'SUCCESS'
                    ? 'bg-green-100 text-green-800'
                    : transaction.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
