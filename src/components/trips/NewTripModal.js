// src/components/trips/NewTripModal.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Add editingTrip prop
const NewTripModal = ({ isOpen, onClose, onSubmit, editingTrip = null }) => {
  const { currentUser } = useAuth();
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [participants, setParticipants] = useState(['']); // Array of email strings

  useEffect(() => {
    if (isOpen) {
      if (editingTrip) {
        // If editing, pre-fill form with editingTrip data
        setTripName(editingTrip.name);
        setDestination(editingTrip.destination);
        setStartDate(editingTrip.startDate);
        setEndDate(editingTrip.endDate);
        // Participants in editingTrip are objects {id, name, email}, convert to email strings for the form
        setParticipants(editingTrip.participants.map(p => p.email).filter(Boolean));
      } else {
        // If creating, reset fields and pre-fill current user
        setTripName('');
        setDestination('');
        setStartDate('');
        setEndDate('');
        if (currentUser && currentUser.email) {
          setParticipants([currentUser.email]);
        } else {
          setParticipants(['']);
        }
      }
    }
  }, [isOpen, editingTrip, currentUser]);

  const handleAddParticipantField = () => {
    setParticipants([...participants, '']);
  };

  const handleRemoveParticipantField = (index) => {
    // Prevent removing creator if it's an edit and creator is first
    if (editingTrip && index === 0 && participants[index] === (editingTrip.participants.find(p => p.id === editingTrip.createdBy)?.email || currentUser?.email) ) {
        return;
    }
    // Prevent removing the current user if it's a new trip and they are the first participant
    if (!editingTrip && index === 0 && participants[index] === currentUser?.email) {
        return;
    }
    if (participants.length === 1) return; // Don't remove the last field entirely

    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tripName || !destination || !startDate || !endDate) {
      alert('Please fill in all trip details.');
      return;
    }
    const validParticipants = participants.filter(email => email && email.trim() !== '');
    if (validParticipants.length === 0) {
      alert('Please add at least one participant.');
      return;
    }
    
    const tripData = {
      name: tripName,
      destination,
      startDate,
      endDate,
      participants: validParticipants,
    };

    // If editing, include the trip ID
    if (editingTrip) {
      tripData.id = editingTrip.id;
      tripData.createdBy = editingTrip.createdBy; // Preserve original creator
    }

    onSubmit(tripData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto my-8 overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              {editingTrip ? 'Edit Trip' : 'Create New Trip'} {/* Dynamic Title */}
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {/* Trip Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="trip-name">Trip Name</label>
              <input id="trip-name" type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Summer Vacation" required />
            </div>
            {/* Destination */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="trip-destination">Destination</label>
              <input id="trip-destination" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Paris, France" required />
            </div>
            {/* Start Date */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="trip-start-date">Start Date</label>
              <input id="trip-start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            {/* End Date */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="trip-end-date">End Date</label>
              <input id="trip-end-date" type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            {/* Participants */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Participants (by Email)</label>
              <div id="participants-container" className="space-y-2">
                {participants.map((email, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleParticipantChange(index, e.target.value)}
                      className="participant-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="participant@example.com"
                      // Disable editing for current user's email if it's the creator in new/edit mode
                      disabled={
                        (editingTrip && index === 0 && email === (editingTrip.participants.find(p => p.id === editingTrip.createdBy)?.email || currentUser?.email)) ||
                        (!editingTrip && index === 0 && email === currentUser?.email)
                      }
                      required
                    />
                    {/* Conditional rendering for remove button */}
                    {!((editingTrip && index === 0 && email === (editingTrip.participants.find(p => p.id === editingTrip.createdBy)?.email || currentUser?.email)) ||
                       (!editingTrip && index === 0 && email === currentUser?.email) ||
                       participants.length <= 1
                    ) && (
                      <button type="button" onClick={() => handleRemoveParticipantField(index)} className="text-red-500 hover:text-red-700 p-1" title="Remove participant">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={handleAddParticipantField} className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                Add Participant
              </button>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
            <button type="submit" className="gradient-bg text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
              {editingTrip ? 'Save Changes' : 'Create Trip'} {/* Dynamic Button Text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTripModal;