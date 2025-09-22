import React from 'react';

const reviews = [
  {
    id: 'PR001',
    period: 'Q2 2025',
    score: 4.7,
    reviewer: 'Jane Smith',
    comments: 'Excellent teamwork and project delivery.',
  },
  {
    id: 'PR002',
    period: 'Q1 2025',
    score: 4.5,
    reviewer: 'Jane Smith',
    comments: 'Consistent performance and positive attitude.',
  },
  {
    id: 'PR003',
    period: 'Q4 2024',
    score: 4.2,
    reviewer: 'Jane Smith',
    comments: 'Good progress, needs improvement in time management.',
  },
];

function Performance() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Performance Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">{review.period}</span>
              <span className="text-sm font-semibold text-green-600">Score: {review.score}/5</span>
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