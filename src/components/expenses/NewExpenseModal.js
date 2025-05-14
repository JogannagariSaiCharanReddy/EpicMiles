// src/components/expenses/NewExpenseModal.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // To pre-select current user as payer

const NewExpenseModal = ({ isOpen, onClose, onSubmit, tripParticipants = [] }) => {
  const { currentUser } = useAuth();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today
  const [paidBy, setPaidBy] = useState('');
  const [splitBetween, setSplitBetween] = useState([]); // Array of participant IDs

  useEffect(() => {
    // Pre-select current user as payer if they are a participant
    if (currentUser && tripParticipants.some(p => p.id === (currentUser.id || currentUser.email))) {
      setPaidBy(currentUser.id || currentUser.email);
    } else if (tripParticipants.length > 0) {
      // Or default to the first participant if current user not in trip (should not happen ideally)
      setPaidBy(tripParticipants[0].id);
    }

    // By default, select all trip participants for splitting
    setSplitBetween(tripParticipants.map(p => p.id));

    // Reset fields when modal opens or participants change
    if (isOpen) {
        setDescription('');
        setAmount('');
        setDate(new Date().toISOString().slice(0, 10));
    }

  }, [isOpen, currentUser, tripParticipants]);

  const handleSplitChange = (participantId) => {
    setSplitBetween(prev =>
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date || !paidBy || splitBetween.length === 0) {
      alert('Please fill in all expense details and select how to split.');
      return;
    }
    if (parseFloat(amount) <= 0) {
        alert('Amount must be greater than zero.');
        return;
    }
    onSubmit({
      description,
      amount: parseFloat(amount),
      date,
      paidBy, // This should be a participant ID
      splitBetween, // Array of participant IDs
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto my-8 overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Add New Expense</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="expense-description">Description</label>
              <input id="expense-description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Dinner, Groceries, Tickets" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="expense-amount">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span> {/* Or your preferred currency symbol */}
                </div>
                <input id="expense-amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0.00" required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="expense-date">Date</label>
              <input id="expense-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="expense-payer">Paid by</label>
              <select id="expense-payer" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                <option value="" disabled>Select payer</option>
                {tripParticipants.map(p => (
                  <option key={p.id} value={p.id}>{p.name || p.email}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Split between</label>
              <div id="split-container" className="space-y-1 max-h-40 overflow-y-auto border border-gray-200 p-2 rounded-md">
                {tripParticipants.map(p => (
                  <div key={p.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`split-${p.id}`}
                      checked={splitBetween.includes(p.id)}
                      onChange={() => handleSplitChange(p.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={`split-${p.id}`} className="ml-2 text-sm text-gray-700">{p.name || p.email}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
            <button type="submit" className="gradient-bg text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExpenseModal;