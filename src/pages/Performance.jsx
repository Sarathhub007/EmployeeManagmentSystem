import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

function Performance() {
  const { performanceReviews, loadPerformanceReviews } = useApp();

  useEffect(() => {
    loadPerformanceReviews(); // fetch reviews when component mounts
  }, []);

  const getStatusColor = (score) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Performance Reviews</h2>
      <div className="space-y-4">
        {performanceReviews.map((review) => (
          <div key={review.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">{review.period}</span>
              <span className={`text-sm font-semibold ${getStatusColor(review.score)}`}>
                Score: {review.score}/5
              </span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Reviewer:</span>
              <span className="ml-2 text-gray-900">{review.reviewer}</span>
            </div>
            <div className="text-gray-700 text-sm">{review.comments}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Performance;
