import React, { useState } from 'react';
import { ArrowLeft, Star, Send, User, Calendar, ThumbsUp, Award } from 'lucide-react';
import type { User as UserType } from '../App';

type ReviewsPageProps = {
  user: UserType;
  onNavigate: (page: 'dashboard' | 'login') => void;
};

type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
  likes: number;
  savings: number;
};

const ReviewsPage: React.FC<ReviewsPageProps> = ({ user, onNavigate }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    savings: ''
  });
  const [showAddReview, setShowAddReview] = useState(false);

  const reviews: Review[] = [
    {
      id: '1',
      user: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely incredible! This app helped me identify that my old AC was consuming 60% more electricity than it should. After following the suggestions, my bill reduced by ₹1,200 in just one month. The AI predictions were spot-on!',
      date: new Date('2024-12-15'),
      verified: true,
      likes: 24,
      savings: 1200
    },
    {
      id: '2',
      user: 'Rajesh Kumar',
      rating: 5,
      comment: 'Perfect for our office. We discovered that leaving computers on standby was costing us ₹800 extra per month. The appliance-wise breakdown was eye-opening. Highly recommend for businesses!',
      date: new Date('2024-12-10'),
      verified: true,
      likes: 18,
      savings: 800
    },
    {
      id: '3',
      user: 'Anjali Patel',
      rating: 4,
      comment: 'Great insights about peak hour usage. Shifted our washing machine and dishwasher timings to off-peak hours and saved ₹450 monthly. The interface is very user-friendly.',
      date: new Date('2024-12-08'),
      verified: true,
      likes: 15,
      savings: 450
    },
    {
      id: '4',
      user: 'Vikram Singh',
      rating: 5,
      comment: 'The OCR feature works flawlessly! Just uploaded my PDF bill and got detailed analysis within seconds. The water heater optimization tip alone saved me ₹600 per month.',
      date: new Date('2024-12-05'),
      verified: true,
      likes: 22,
      savings: 600
    },
    {
      id: '5',
      user: 'Meera Gupta',
      rating: 4,
      comment: 'Love the prediction feature! It accurately predicted our summer bill increase and helped us prepare by installing LED lights. The suggestions are practical and easy to implement.',
      date: new Date('2024-12-02'),
      verified: true,
      likes: 12,
      savings: 300
    },
    {
      id: '6',
      user: 'Amit Verma',
      rating: 5,
      comment: 'Fantastic for hostel management! We analyzed our common area electricity usage and optimized timings for water heaters and ACs. Saved ₹2,000 across all rooms combined.',
      date: new Date('2024-11-28'),
      verified: true,
      likes: 31,
      savings: 2000
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalSavings = reviews.reduce((sum, review) => sum + review.savings, 0);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate review submission
    console.log('Review submitted:', newReview);
    setNewReview({ rating: 5, comment: '', savings: '' });
    setShowAddReview(false);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate(user ? 'dashboard' : 'login')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">User Reviews & Testimonials</h1>
                <p className="text-sm text-gray-600">See what our users are saying</p>
              </div>
            </div>
            {user && (
              <button
                onClick={() => setShowAddReview(true)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all"
              >
                Write Review
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{reviews.length}</p>
            <p className="text-gray-600">Total Reviews</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">₹{totalSavings.toLocaleString()}</p>
            <p className="text-gray-600">Total Savings</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ThumbsUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">98%</p>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">What Our Users Say</h2>
          
          <div className="grid gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.user.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-800">{review.user}</h3>
                        {review.verified && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Verified User
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <ThumbsUp className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{review.likes}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {Math.floor((Date.now() - review.date.getTime()) / (1000 * 60 * 60 * 24))} days ago
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-green-100 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-green-700">
                          Saved ₹{review.savings}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddReview && user && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Write a Review</h2>
              <button
                onClick={() => setShowAddReview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= newReview.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 hover:text-yellow-400'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your experience with Smart Power Optimizer..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Savings (₹)
                </label>
                <input
                  type="number"
                  value={newReview.savings}
                  onChange={(e) => setNewReview({ ...newReview, savings: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-xl transition-all flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;