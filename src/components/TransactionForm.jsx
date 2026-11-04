import { useState } from 'react';

const TransactionForm = ({ type, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    beneficiaryAccount: '',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isTransfer = type === 'transfer';
  const title = type === 'deposit' ? 'Deposit' : type === 'withdraw' ? 'Withdrawal' : 'Transfer';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isTransfer && (
        <div>
          <label className="label">Beneficiary Account Number</label>
          <input
            type="text"
            name="beneficiaryAccount"
            value={formData.beneficiaryAccount}
            onChange={handleChange}
            placeholder="Enter account number"
            className="input-field"
            required
          />
        </div>
      )}

      <div>
        <label className="label">Amount ($)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
          min="0.01"
          step="0.01"
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="label">{isTransfer ? 'Remarks' : 'Description'}</label>
        <textarea
          name={isTransfer ? 'remarks' : 'description'}
          value={isTransfer ? formData.remarks : formData.description}
          onChange={handleChange}
          placeholder={`Enter ${isTransfer ? 'remarks' : 'description'} (optional)`}
          className="input-field resize-none"
          rows="3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? 'Processing...' : `Confirm ${title}`}
      </button>
    </form>
  );
};

export default TransactionForm;
