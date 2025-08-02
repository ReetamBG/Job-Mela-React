import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { month: "Jan", applications: 45, shortlisted: 32 },
  { month: "Feb", applications: 52, shortlisted: 38 },
  { month: "Mar", applications: 48, shortlisted: 35 },
  { month: "Apr", applications: 61, shortlisted: 45 },
  { month: "May", applications: 55, shortlisted: 42 },
  { month: "Jun", applications: 67, shortlisted: 50 },
  { month: "Jul", applications: 73, shortlisted: 55 },
  { month: "Aug", applications: 78, shortlisted: 60 },
  { month: "Sep", applications: 82, shortlisted: 65 },
  { month: "Oct", applications: 87, shortlisted: 70 },
];

export default function ActivityChart() {
  return (
    <Card className="bg-gradient-card border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Top Active Jobs
          </CardTitle>
          <span className="text-sm text-muted-foreground">Last month</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-3"></div>
            <span className="text-sm text-muted-foreground">Applications</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-4"></div>
            <span className="text-sm text-muted-foreground">Shortlisted</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="applications"
                stroke="hsl(var(--chart-3))"
                fill="hsl(var(--chart-3))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="shortlisted"
                stroke="hsl(var(--chart-4))"
                fill="hsl(var(--chart-4))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

