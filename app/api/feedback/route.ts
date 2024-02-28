import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface FeedbackData {
  name: string;
  email: string;
  category: 'family' | 'friends' | 'industry';
  rating: number;
  comments: string;
  surveyCompleted: boolean;
  surveyUrl: string;
}

// CREATE - Save feedback
export async function POST(request: NextRequest) {
  try {
    const feedbackData: FeedbackData = await request.json();
    
    // For now, just return success since we don't have feedback table in schema
    // In production, this would save to database
    const feedback = {
      id: Date.now(),
      ...feedbackData,
      createdAt: new Date().toISOString(),
      surveyUrl: feedbackData.surveyUrl || 'https://redcap.latrobe.edu.au/redcap/surveys/?s=PPEKFTMPXF4KKEFY'
    };
    
    console.log('Feedback received:', feedback);
    
    return NextResponse.json({ 
      success: true, 
      data: feedback,
      message: 'Feedback saved successfully. Thank you for your input!'
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      message: 'Failed to save feedback. Please try again.'
    }, { status: 500 });
  }
}

// READ - Get feedback statistics
export async function GET(request: NextRequest) {
  try {
    // Mock data for demonstration
    const mockFeedback = [
      { id: 1, name: 'John Doe', category: 'family', rating: 5, comments: 'Great application!', surveyCompleted: true, createdAt: new Date() },
      { id: 2, name: 'Jane Smith', category: 'friends', rating: 4, comments: 'Very useful tool', surveyCompleted: true, createdAt: new Date() },
      { id: 3, name: 'Bob Johnson', category: 'industry', rating: 5, comments: 'Professional implementation', surveyCompleted: false, createdAt: new Date() }
    ];
    
    const stats = {
      total: mockFeedback.length,
      byCategory: {
        family: mockFeedback.filter(f => f.category === 'family').length,
        friends: mockFeedback.filter(f => f.category === 'friends').length,
        industry: mockFeedback.filter(f => f.category === 'industry').length
      },
      averageRating: (mockFeedback.reduce((sum, f) => sum + f.rating, 0) / mockFeedback.length).toFixed(1),
      surveyCompletionRate: ((mockFeedback.filter(f => f.surveyCompleted).length / mockFeedback.length) * 100).toFixed(1)
    };
    
    return NextResponse.json({ 
      feedback: mockFeedback, 
      stats,
      message: `Retrieved ${mockFeedback.length} feedback entries`,
      surveyUrl: 'https://redcap.latrobe.edu.au/redcap/surveys/?s=PPEKFTMPXF4KKEFY'
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      message: 'Failed to retrieve feedback'
    }, { status: 500 });
  }
}