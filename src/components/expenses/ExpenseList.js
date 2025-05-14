// src/components/expenses/ExpenseList.js
import React from 'react';

const ExpenseList = ({ expenses = [], tripParticipants = [] }) => {
  const getParticipantName = (participantId) => {
    const participant = tripParticipants.find(p => p.id === participantId);
    return participant ? (participant.name || participant.email) : 'Unknown';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString(undefined, options);
  };

  if (expenses.length === 0) {
    // This state is handled by ExpensesPage now, but good to have a fallback
    // return <div className="text-center py-6 text-gray-500">No expenses recorded yet.</div>;
    return null; // ExpensesPage will show its own empty state
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">All Expenses</h3>
      </div>
      <div id="expenses-list" className="divide-y divide-gray-200">
        {expenses.map(expense => (
          <div key={expense.id} className="p-4 expense-item"> {/* Added expense-item for potential odd/even styling */}
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-md font-medium text-gray-800">{expense.description}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Paid by {getParticipantName(expense.paidBy)} • {formatDate(expense.date)}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Split among: {expense.splitBetween.map(id => getParticipantName(id)).join(', ')}
                </p>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                ${expense.amount.toFixed(2)}
              </div>
            </div>
            {/* Add edit/delete buttons later */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;