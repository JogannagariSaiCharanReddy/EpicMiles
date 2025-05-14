// src/components/expenses/BalanceSummary.js
import React from 'react';

// Helper function to calculate balances
const calculateBalances = (expenses, participants) => {
  if (!participants || participants.length === 0) return {};

  const balances = {}; // Store net balance for each participant: participantId -> amount
  participants.forEach(p => balances[p.id] = 0);

  expenses.forEach(expense => {
    const payerId = expense.paidBy;
    const amount = expense.amount;
    const splitBetweenIds = expense.splitBetween;
    const numSharers = splitBetweenIds.length;

    if (numSharers === 0) return; // Avoid division by zero

    const shareAmount = amount / numSharers;

    // Payer gets credited the full amount they paid
    balances[payerId] += amount;

    // Each person sharing the expense gets debited their share
    splitBetweenIds.forEach(sharerId => {
      balances[sharerId] -= shareAmount;
    });
  });

  return balances;
};


// Helper function to simplify debts (Splitwise algorithm idea)
const simplifyDebts = (balances) => {
  const sortedDebtors = [];
  const sortedCreditors = [];

  for (const personId in balances) {
    if (balances[personId] < 0) {
      sortedDebtors.push({ id: personId, amount: balances[personId] });
    } else if (balances[personId] > 0) {
      sortedCreditors.push({ id: personId, amount: balances[personId] });
    }
  }

  // Sort by amount (debtors by most owed, creditors by most due)
  // Debtors amount is negative, so sort ascending to get largest debt first
  // Creditors amount is positive, so sort descending to get largest credit first
  sortedDebtors.sort((a, b) => a.amount - b.amount);
  sortedCreditors.sort((a, b) => b.amount - a.amount);

  const transactions = [];
  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < sortedDebtors.length && creditorIndex < sortedCreditors.length) {
    const debtor = sortedDebtors[debtorIndex];
    const creditor = sortedCreditors[creditorIndex];
    const amountToSettle = Math.min(-debtor.amount, creditor.amount);

    if (amountToSettle > 0.005) { // Threshold to avoid tiny amounts due to float precision
        transactions.push({
            from: debtor.id,
            to: creditor.id,
            amount: amountToSettle,
        });

        debtor.amount += amountToSettle;
        creditor.amount -= amountToSettle;
    }


    if (Math.abs(debtor.amount) < 0.005) { // Debtor settled
      debtorIndex++;
    }
    if (Math.abs(creditor.amount) < 0.005) { // Creditor settled
      creditorIndex++;
    }
  }
  return transactions;
};


const BalanceSummary = ({ expenses = [], participants = [] }) => {
  const getParticipantName = (participantId) => {
    const participant = participants.find(p => p.id === participantId);
    return participant ? (participant.name || participant.email) : 'Unknown User';
  };

  if (participants.length === 0) {
    return null; // Or some placeholder if no participants
  }

  const netBalances = calculateBalances(expenses, participants);
  const simplifiedTransactions = simplifyDebts(netBalances);


  return (
    <div id="trip-summary" className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Balance Summary</h3>
      <div id="balance-container" className="space-y-3">
        {participants.length > 0 && Object.keys(netBalances).length > 0 ? (
          Object.entries(netBalances).map(([participantId, balance]) => {
            // Skip if balance is very close to zero
            if (Math.abs(balance) < 0.01) return null;

            const name = getParticipantName(participantId);
            return (
              <div key={participantId} className="flex justify-between items-center">
                <span className="text-gray-700">{name}</span>
                {balance > 0 ? (
                  <span className="text-green-600 font-medium">
                    is owed ${balance.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    owes ${Math.abs(balance).toFixed(2)}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No balances to show yet. Add some expenses!</p>
        )}

        {simplifiedTransactions.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-700 mb-2">To Settle Up:</h4>
                <ul className="space-y-1">
                    {simplifiedTransactions.map((txn, index) => (
                        <li key={index} className="text-sm text-gray-600">
                            {getParticipantName(txn.from)} owes {getParticipantName(txn.to)} ${txn.amount.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        )}
        {Object.keys(netBalances).length > 0 && simplifiedTransactions.length === 0 && !expenses.some(e => e.amount > 0) && (
            <p className="text-gray-500 mt-2">Everyone is settled up!</p>
        )}
      </div>
    </div>
  );
};

export default BalanceSummary;