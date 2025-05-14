// src/components/trips/TripCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Pass down onEdit and onDelete props from TripsPage
const TripCard = ({ trip, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString(undefined, options);
  };

  const handleManageExpenses = () => {
    navigate('/expenses', { state: { selectedTripId: trip.id } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card hover:shadow-xl flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">{trip.name}</h3>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Destination:</span> {trip.destination}
        </p>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Dates:</span> {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </p>
        <p className="text-gray-600 text-sm mb-3">
          <span className="font-medium">Participants:</span> {trip.participants?.length || 0}
        </p>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => onEdit(trip)} // Call onEdit with the trip data
            className="text-xs px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(trip.id)} // Call onDelete with the trip ID
            className="text-xs px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
          >
            Delete
          </button>
        </div>
        <button
          className="text-sm text-indigo-500 hover:text-indigo-700 font-medium"
          onClick={handleManageExpenses}
        >
          Manage Expenses →
        </button>
      </div>
    </div>
  );
};

export default TripCard;