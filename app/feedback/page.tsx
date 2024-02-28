"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FeedbackStats {
  total: number;
  byCategory: {
    family: number;
    friends: number;
    industry: number;
  };
  averageRating: string;
  surveyCompletionRate: string;
}

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'family' as 'family' | 'friends' | 'industry',
    rating: 5,
    comments: '',
    surveyCompleted: false
  });
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/feedback');
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          surveyUrl: 'https://redcap.latrobe.edu.au/redcap/surveys/?s=PPEKFTMPXF4KKEFY'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage('✅ Thank you for your feedback! Please complete the ethical survey.');
        setFormData({
          name: '',
          email: '',
          category: 'family',
          rating: 5,
          comments: '',
          surveyCompleted: false
        });
        loadStats();
      } else {
        setMessage('❌ Error saving feedback. Please try again.');
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openSurvey = () => {
    window.open('https://redcap.latrobe.edu.au/redcap/surveys/?s=PPEKFTMPXF4KKEFY', '_blank');
    setFormData(prev => ({ ...prev, surveyCompleted: true }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            User Feedback Collection - Assignment 2
          </h1>
          <p className="text-gray-600 mb-6">Student: Vinit Kumar (21946017)</p>
          
          {/* Ethical Survey Notice */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              📋 Ethical Survey Requirement
            </h3>
            <p className="text-blue-600 mb-4">
              As part of Assignment 2, we need feedback from 2 people from each category: family, friends, and industry professionals.
              Please complete the ethical survey after providing your feedback.
            </p>
            <button 
              onClick={openSurvey}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              📝 Complete Ethical Survey
            </button>
          </div>

          {/* Feedback Form */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Provide Feedback</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="family">👨👩👧👦 Family</option>
                    <option value="friends">👥 Friends</option>
                    <option value="industry">🏢 Industry Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rating: {formData.rating}/5 ⭐
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Comments</label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please share your thoughts about the application..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="surveyCompleted"
                    checked={formData.surveyCompleted}
                    onChange={(e) => setFormData(prev => ({ ...prev, surveyCompleted: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="surveyCompleted" className="text-sm">
                    I have completed the ethical survey
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>

              {message && (
                <div className="mt-4 p-3 rounded-lg bg-gray-100">
                  {message}
                </div>
              )}
            </div>

            {/* Statistics */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Feedback Statistics</h2>
              {stats && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">📊 Overall Stats</h3>
                    <p>Total Feedback: <strong>{stats.total}</strong></p>
                    <p>Average Rating: <strong>{stats.averageRating}/5 ⭐</strong></p>
                    <p>Survey Completion: <strong>{stats.surveyCompletionRate}%</strong></p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">👥 By Category</h3>
                    <div className="space-y-1">
                      <p>👨👩👧👦 Family: <strong>{stats.byCategory.family}</strong></p>
                      <p>👥 Friends: <strong>{stats.byCategory.friends}</strong></p>
                      <p>🏢 Industry: <strong>{stats.byCategory.industry}</strong></p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold mb-2 text-green-800">🎯 Assignment 2 Target</h3>
                    <p className="text-green-600 text-sm">
                      Need 2 from each category (6 total)
                    </p>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>Family: {stats.byCategory.family}/2 {stats.byCategory.family >= 2 ? '✅' : '⏳'}</p>
                      <p>Friends: {stats.byCategory.friends}/2 {stats.byCategory.friends >= 2 ? '✅' : '⏳'}</p>
                      <p>Industry: {stats.byCategory.industry}/2 {stats.byCategory.industry >= 2 ? '✅' : '⏳'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}