// src/pages/ExpensesPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import MainLayout from '../components/layout/MainLayout';
import NewExpenseModal from '../components/expenses/NewExpenseModal';
import ExpenseList from '../components/expenses/ExpenseList';
import BalanceSummary from '../components/expenses/BalanceSummary';
import { useAuth } from '../contexts/AuthContext';

const ExpensesPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation(); // Get location object
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const storedTrips = localStorage.getItem(`trips_${currentUser.email}`);
      if (storedTrips) {
        const parsedTrips = JSON.parse(storedTrips);
        setTrips(parsedTrips);

        // Check if a selectedTripId was passed via navigation state
        const navigatedTripId = location.state?.selectedTripId;
        if (navigatedTripId) {
          const tripToSelect = parsedTrips.find(t => t.id === navigatedTripId);
          if (tripToSelect) {
            setSelectedTrip(tripToSelect);
          }
        }
      } else {
        setTrips([]);
      }
    }
  }, [currentUser, location.state]); // Add location.state as a dependency

  // Load expenses when a trip is selected (existing useEffect)
  useEffect(() => {
    if (selectedTrip && currentUser) {
      const storedExpenses = localStorage.getItem(`expenses_${selectedTrip.id}_${currentUser.email}`);
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      } else {
        setExpenses([]);
      }
    } else {
      setExpenses([]);
    }
  }, [selectedTrip, currentUser]);

  // Save expenses to localStorage (existing useEffect)
  useEffect(() => {
    if (selectedTrip && currentUser) {
      localStorage.setItem(`expenses_${selectedTrip.id}_${currentUser.email}`, JSON.stringify(expenses));
    }
  }, [expenses, selectedTrip, currentUser]);

  const handleTripSelect = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    setSelectedTrip(trip);
    // Optional: Clear navigation state after using it so manual selection works as expected
    // This is a bit more advanced and might not be necessary for now.
    // window.history.replaceState({}, document.title) // Clears location.state
  };
  
  // ... (rest of the functions: handleOpenModal, handleCloseModal, handleAddExpense remain the same) ...
  const handleOpenModal = () => {
   if (!selectedTrip) {
     alert("Please select a trip first!");
     return;
   }
   setIsModalOpen(true);
 };
 const handleCloseModal = () => setIsModalOpen(false);

 const handleAddExpense = (newExpenseData) => {
   if (!selectedTrip || !currentUser) return;
   const expenseToAdd = {
     id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
     tripId: selectedTrip.id,
     ...newExpenseData,
   };
   setExpenses(prevExpenses => [...prevExpenses, expenseToAdd]);
   handleCloseModal();
 };


  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
            {trips.length > 0 && (
              <div className="mt-1">
                <select
                  id="trip-selector"
                  value={selectedTrip ? selectedTrip.id : ''}
                  onChange={(e) => handleTripSelect(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Select a Trip --</option>
                  {trips.map(trip => (
                    <option key={trip.id} value={trip.id}>{trip.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <button
            onClick={handleOpenModal}
            disabled={!selectedTrip}
            className={`gradient-bg text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center ${
              !selectedTrip ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Expense
          </button>
        </div>

        {selectedTrip ? (
          <>
            <BalanceSummary expenses={expenses} participants={selectedTrip.participants} />
            <ExpenseList expenses={expenses} tripParticipants={selectedTrip.participants} />
            {expenses.length === 0 && (
              <div id="empty-expenses" className="text-center py-12 bg-white rounded-lg shadow-sm mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No expenses for this trip yet</h3>
                <p className="mt-1 text-gray-500">Add your first expense to start tracking</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Please select a trip</h3>
            <p className="mt-1 text-gray-500">Choose a trip from the dropdown above to view or add expenses.</p>
          </div>
        )}
      </div>

      {isModalOpen && selectedTrip && (
        <NewExpenseModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddExpense}
          tripParticipants={selectedTrip.participants}
        />
      )}
    </MainLayout>
  );
};

export default ExpensesPage;