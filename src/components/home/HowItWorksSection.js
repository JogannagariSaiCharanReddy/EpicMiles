// Example for src/components/home/HowItWorksSection.js
import React from 'react';

const HowItWorksSection = () => {
  return (
    // Your JSX for this section
    <div id="how-it-works-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Three simple steps to stress-free group travel finances</p>
        </div>
        {/* ... rest of the HTML from your original example converted to JSX ... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6 card">
            <div className="flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create a Trip</h3>
            <p className="text-gray-600">Set up your trip details and invite all participants via email. Everyone gets access to the shared trip.</p>
          </div>
          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-sm p-6 card">
            <div className="flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Expenses</h3>
            <p className="text-gray-600">During your trip, everyone can add expenses and specify who paid and how to split the cost.</p>
          </div>
          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-sm p-6 card">
            <div className="flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Settle Up</h3>
            <p className="text-gray-600">After the trip, see exactly who owes what to whom. No more complicated calculations or awkward money conversations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection; // <-- Make sure this line is present and correct