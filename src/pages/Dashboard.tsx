import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FileText, Users, Upload, CheckCircle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
import StatsCard  from "@/components/StatsCard";
import ChartCard from "@/components/ChartCard";
import { ActivityItemProps } from "@/utils/propsInterface";
import { useEffect } from "react";

const ActivityItem = ({ icon: Icon, title, description, time }: ActivityItemProps) => (
  <div className="flex items-center gap-4 rounded-lg border p-3">
    <div className="rounded-full bg-primary/10 p-2">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <div className="text-xs text-muted-foreground">{time}</div>
  </div>
);

const Dashboard = () => {
  const {userList,resources,uploadedFiles,processedForms,submissions } = useAppContext(); 
  const submissionData = [
    { name: "Jan", count: 12 },
    { name: "Feb", count: 19 },
    { name: "Mar", count: 15 },
    { name: "Apr", count: 27 },
    { name: "May", count: 32 },
    { name: "Jun", count: 24 },
    { name: "Jul", count: 38 },
  ];

  const categoryData = [
    { name: "General Inquiry", value: 35 },
    { name: "Support Request", value: 25 },
    { name: "Feedback", value: 20 },
    { name: "Complaint", value: 15 },
    { name: "Other", value: 5 },
  ];

  const activities = [
    {
      icon: FileText,
      title: "New form submission",
      description: "John Doe submitted a Support Request form",
      time: "2 minutes ago",
    },
    {
      icon: Upload,
      title: "File uploaded",
      description: "Sarah Johnson uploaded 3 files to her submission",
      time: "15 minutes ago",
    },
    {
      icon: Users,
      title: "New user registered",
      description: "Michael Smith created an account",
      time: "1 hour ago",
    },
    {
      icon: CheckCircle,
      title: "Form processed",
      description: "Admin processed Emily Wilson's feedback form",
      time: "3 hours ago",
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of form submissions and user activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Submissions"
          icon={FileText}
          value={resources?.length || 0}
          description=""
        />
        <StatsCard
          title="Registered Users"
          icon={Users}
          value={userList?.length || 0}
          description=""
        />
        <StatsCard
          title="Files Uploaded"
          icon={Upload}
          value={uploadedFiles?.length || 0}
          description=""
        />
        <StatsCard
          title="Processed Forms"
          icon={CheckCircle}
          value={processedForms?.length || 0}
          description=""
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <ChartCard
            title="Submissions Over Time"
            description="Number of form submissions per month"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <ChartCard
            title="Submissions by Category"
            description="Distribution of submissions across categories"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest form submissions and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityItem key={activity.title} {...activity} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;