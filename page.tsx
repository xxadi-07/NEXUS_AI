"use client"

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  BarChart3, 
  ChevronUp, 
  Download, 
  FileText, 
  MoreHorizontal, 
  Percent, 
  RotateCcw, 
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
} from 'recharts';

// Mock data
const performanceData = [
  { name: 'Jan', leads: 400, content: 240, insights: 320 },
  { name: 'Feb', leads: 300, content: 139, insights: 280 },
  { name: 'Mar', leads: 200, content: 980, insights: 200 },
  { name: 'Apr', leads: 278, content: 390, insights: 210 },
  { name: 'May', leads: 189, content: 480, insights: 220 },
  { name: 'Jun', leads: 239, content: 380, insights: 250 },
  { name: 'Jul', leads: 349, content: 430, insights: 290 },
];

const recentActivities = [
  { type: 'lead', title: 'New lead generated: Sarah Johnson - CTO', time: '2 hours ago' },
  { type: 'content', title: 'Created marketing copy: "Q3 Feature Announcement"', time: '5 hours ago' },
  { type: 'analytics', title: 'Sales data analysis completed: 28% growth detected', time: '1 day ago' },
  { type: 'lead', title: 'New lead generated: Michael Chen - VP of Marketing', time: '1 day ago' },
  { type: 'content', title: 'Social media post generated: "AI Trends 2025"', time: '2 days ago' },
];

const statsCards = [
  { title: 'Total Leads', value: '3,247', change: '+12.5%', icon: <Users className="h-5 w-5" /> },
  { title: 'Content Created', value: '842', change: '+24.3%', icon: <FileText className="h-5 w-5" /> },
  { title: 'Data Insights', value: '156', change: '+5.4%', icon: <BarChart3 className="h-5 w-5" /> },
  { title: 'Conversion Rate', value: '18.2%', change: '+2.1%', icon: <Percent className="h-5 w-5" /> },
];

const activityIcons = {
  lead: <Users className="h-5 w-5 text-blue-500" />,
  content: <FileText className="h-5 w-5 text-indigo-500" />,
  analytics: <BarChart3 className="h-5 w-5 text-green-500" />,
};

export default function DashboardPage() {
  const [chartPeriod, setChartPeriod] = useState('7d');

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's an overview of your AI activity.</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card, index) => (
          <Card key={index} className="bg-secondary/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className="p-1 bg-primary/10 rounded-full">
                {card.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center text-xs text-green-500">
                <ChevronUp className="h-3 w-3 mr-1" />
                {card.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2 bg-secondary/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                Activity across all AI tools
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className={chartPeriod === '7d' ? 'bg-primary/10' : ''} onClick={() => setChartPeriod('7d')}>
                7D
              </Button>
              <Button variant="outline" size="sm" className={chartPeriod === '30d' ? 'bg-primary/10' : ''} onClick={() => setChartPeriod('30d')}>
                30D
              </Button>
              <Button variant="outline" size="sm" className={chartPeriod === '90d' ? 'bg-primary/10' : ''} onClick={() => setChartPeriod('90d')}>
                90D
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorContent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="leads" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="content" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorContent)" />
                <Area type="monotone" dataKey="insights" stroke="hsl(var(--chart-3))" fillOpacity={1} fill="url(#colorInsights)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))] mr-2"></div>
                <span className="text-sm">Lead Generation</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))] mr-2"></div>
                <span className="text-sm">Content Creation</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))] mr-2"></div>
                <span className="text-sm">Data Insights</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Your latest AI interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {activityIcons[activity.type as keyof typeof activityIcons]}
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 px-0 w-full justify-start text-blue-500">
              View all activity
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Module Specific Insights */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">AI Module Insights</h2>
        <Tabs defaultValue="sales">
          <TabsList className="mb-4">
            <TabsTrigger value="sales">Sales & Leads</TabsTrigger>
            <TabsTrigger value="analytics">Data Analytics</TabsTrigger>
            <TabsTrigger value="content">Content Creation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-secondary/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Lead Quality</CardTitle>
                    <CardDescription>Conversion potential by source</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Export data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { source: 'LinkedIn', score: 85 },
                      { source: 'Website', score: 63 },
                      { source: 'Email', score: 72 },
                      { source: 'Referral', score: 93 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="source" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Intent Signals</CardTitle>
                    <CardDescription>Buyer intent trends</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Export data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={[
                      { day: 'Mon', intent: 34 },
                      { day: 'Tue', intent: 42 },
                      { day: 'Wed', intent: 57 },
                      { day: 'Thu', intent: 45 },
                      { day: 'Fri', intent: 59 },
                      { day: 'Sat', intent: 38 },
                      { day: 'Sun', intent: 30 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Line type="monotone" dataKey="intent" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Link href="/dashboard/sales">
              <Button variant="outline" className="w-full">
                Go to Sales & Lead Generation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle>Data Analysis Summary</CardTitle>
                <CardDescription>Recent insights from your business data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="font-medium mb-2">Revenue Growth Insight</h3>
                    <p className="text-sm text-muted-foreground">
                      Your Q2 revenue shows a 23% increase compared to Q1, with the strongest growth in the enterprise segment.
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="font-medium mb-2">Customer Behavior Pattern</h3>
                    <p className="text-sm text-muted-foreground">
                      We've detected a 34% higher engagement rate for customers who received the personalized onboarding experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full">
                Go to Data Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
                <CardDescription>AI-generated content from the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Blog Post', title: 'The Future of AI in Business', created: '2 days ago' },
                    { type: 'Social Media', title: 'Product Feature Announcement', created: '3 days ago' },
                    { type: 'Email', title: 'Monthly Newsletter: June 2025', created: '5 days ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="text-xs text-muted-foreground">{item.type}</div>
                        <div className="font-medium">{item.title}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{item.created}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Link href="/dashboard/content">
              <Button variant="outline" className="w-full">
                Go to Content Creation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}