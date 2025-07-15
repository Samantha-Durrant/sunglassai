import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Mail, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { projectId } from '../utils/supabase/info';

interface AnalyticsData {
  totalEmails: number;
  sentEmails: number;
  failedEmails: number;
  recentEmails: Array<{
    id: string;
    to: string;
    subject: string;
    status: string;
    sentAt: string;
  }>;
}

interface AnalyticsDashboardProps {
  accessToken: string | null;
}

export function AnalyticsDashboard({ accessToken }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalEmails: 0,
    sentEmails: 0,
    failedEmails: 0,
    recentEmails: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97f474e9/analytics`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.log('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const successRate = analytics.totalEmails > 0 ? (analytics.sentEmails / analytics.totalEmails) * 100 : 0;
  const failureRate = analytics.totalEmails > 0 ? (analytics.failedEmails / analytics.totalEmails) * 100 : 0;

  // Mock data for demonstrations (in real app, this would come from backend)
  const dailyEmailData = [
    { date: '2024-01-01', sent: 12, failed: 1 },
    { date: '2024-01-02', sent: 8, failed: 0 },
    { date: '2024-01-03', sent: 15, failed: 2 },
    { date: '2024-01-04', sent: 10, failed: 1 },
    { date: '2024-01-05', sent: 18, failed: 0 },
    { date: '2024-01-06', sent: 14, failed: 1 },
    { date: '2024-01-07', sent: 20, failed: 3 },
  ];

  const responseData = [
    { name: 'Sent', value: analytics.sentEmails, color: '#22c55e' },
    { name: 'Failed', value: analytics.failedEmails, color: '#ef4444' },
  ];

  const brandEngagementData = [
    { brand: 'Ray-Ban', emails: 5, responses: 2 },
    { brand: 'Oakley', emails: 3, responses: 1 },
    { brand: 'Persol', emails: 4, responses: 3 },
    { brand: 'Maui Jim', emails: 2, responses: 1 },
    { brand: 'Warby Parker', emails: 6, responses: 2 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Last 30 days</span>
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEmails}</div>
            <p className="text-xs text-muted-foreground">
              Emails sent to brands
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics.sentEmails} successful deliveries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failure Rate</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failureRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics.failedEmails} failed deliveries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">
              No responses tracked yet
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Delivery Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Email Delivery Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyEmailData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" fill="#22c55e" name="Sent" />
                <Bar dataKey="failed" fill="#ef4444" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Success/Failure Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Email Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={responseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {responseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Brand Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Email Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Email Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.recentEmails.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No recent emails</p>
              </div>
            ) : (
              <div className="space-y-3">
                {analytics.recentEmails.map((email) => (
                  <div key={email.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium truncate">{email.subject}</div>
                      <div className="text-sm text-gray-600">{email.to}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(email.sentAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant={email.status === 'sent' ? 'default' : 'destructive'}>
                      {email.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Brand Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {brandEngagementData.map((brand) => (
                <div key={brand.brand} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{brand.brand}</div>
                      <div className="text-sm text-gray-600">
                        {brand.emails} emails sent
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {brand.responses}/{brand.emails} responses
                    </div>
                    <div className="text-xs text-gray-500">
                      {((brand.responses / brand.emails) * 100).toFixed(0)}% rate
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">Best Performing Day</div>
                <div className="text-lg font-bold">Saturday</div>
                <div className="text-xs text-gray-500">Highest success rate</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium">Optimal Send Time</div>
                <div className="text-lg font-bold">10:00 AM</div>
                <div className="text-xs text-gray-500">Best response time</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium">Top Email Tone</div>
                <div className="text-lg font-bold">Professional</div>
                <div className="text-xs text-gray-500">Most effective approach</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}