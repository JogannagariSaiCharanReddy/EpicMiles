import React from 'react';

const TestimonialsSection = () => {
  // In a real implementation, you'd map over an array of testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Alex T.",
      role: "Road Trip Enthusiast",
      avatarInitial: "A",
      quote: "EpicMiles made our cross-country road trip so much easier! No more arguments about who paid for what. We could all see the expenses in real-time.",
    },
    // ... more testimonials
  ];

  return (
    <div id="testimonials-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of happy travelers who use EpicMiles for their group trips</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-xl font-semibold text-indigo-600">{testimonial.avatarInitial}</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">"{testimonial.quote}"</p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TestimonialsSection;