// src/pages/TripsPage.js
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import NewTripModal from '../components/trips/NewTripModal';
import TripCard from '../components/trips/TripCard';
import { useAuth } from '../contexts/AuthContext';

// Mock function (keep it as it is for now)
const getUserByEmail = (email) => {
  if (email) return { id: email, email: email, name: email.split('@')[0] };
  return null;
};

const TripsPage = () => {
  const { currentUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null); // State for trip being edited

  useEffect(() => {
    if (currentUser) {
      const storedTrips = localStorage.getItem(`trips_${currentUser.email}`);
      if (storedTrips) setTrips(JSON.parse(storedTrips));
      else setTrips([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`trips_${currentUser.email}`, JSON.stringify(trips));
    }
  }, [trips, currentUser]);

  const handleOpenModalForCreate = () => {
    setEditingTrip(null); // Ensure we are in "create" mode
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (tripToEdit) => {
    setEditingTrip(tripToEdit); // Set the trip to be edited
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTrip(null); // Clear editing state when modal closes
  };

  const handleSubmitTrip = (tripData) => {
    if (!currentUser) return;

    const participantObjects = tripData.participants
      .map(email => getUserByEmail(email.trim()))
      .filter(user => user !== null);
    
    // Ensure creator is included if it's a new trip, or if it's an edit, ensure the original creator is preserved as participant
    const creatorEmail = editingTrip ? (editingTrip.participants.find(p=> p.id === editingTrip.createdBy)?.email || currentUser.email) : currentUser.email;
    if (!participantObjects.some(p => p.email === creatorEmail)) {
        const creatorUser = getUserByEmail(creatorEmail);
        if (creatorUser) participantObjects.unshift(creatorUser); // Add to the beginning
    }


    if (editingTrip) {
      // Update existing trip
      setTrips(prevTrips =>
        prevTrips.map(trip =>
          trip.id === editingTrip.id
            ? { ...trip, ...tripData, participants: participantObjects } // Merge, but ensure ID and createdBy from original editingTrip are kept if not in tripData
            : trip
        )
      );
    } else {
      // Create new trip
      const tripToAdd = {
        id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...tripData,
        participants: participantObjects,
        createdBy: currentUser.id || currentUser.email,
      };
      setTrips(prevTrips => [...prevTrips, tripToAdd]);
    }
    handleCloseModal();
  };

  const handleDeleteTrip = (tripIdToDelete) => {
    if (window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
      setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripIdToDelete));
      // Optional: Also delete associated expenses from localStorage
      if (currentUser) {
        localStorage.removeItem(`expenses_${tripIdToDelete}_${currentUser.email}`);
      }
      alert("Trip deleted successfully.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Trips</h2>
          <button
            onClick={handleOpenModalForCreate} // Use specific handler
            className="gradient-bg text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
            New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div id="empty-trips" className="text-center py-12">
            {/* ... empty state SVG and text ... */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No trips yet</h3>
            <p className="mt-1 text-gray-500">Create your first trip to get started</p>
          </div>
        ) : (
          <div id="trips-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onEdit={handleOpenModalForEdit} // Pass edit handler
                onDelete={handleDeleteTrip}   // Pass delete handler
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <NewTripModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitTrip}
          editingTrip={editingTrip} // Pass the trip being edited (or null for create)
        />
      )}
    </MainLayout>
  );
};

export default TripsPage;