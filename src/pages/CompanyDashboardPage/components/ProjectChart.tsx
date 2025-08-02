import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    { month: "Jan", projects: 45 },
    { month: "Feb", projects: 52 },
    { month: "Mar", projects: 48 },
    { month: "Apr", projects: 61 },
    { month: "May", projects: 55 },
    { month: "Jun", projects: 67 },
    { month: "Jul", projects: 73 },
    { month: "Aug", projects: 78 },
    { month: "Sep", projects: 82 },
    { month: "Oct", projects: 87 },
];

export default function ProjectChart() {
    return (
        <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-base font-medium">Total Projects</CardTitle>
                        <div className="text-2xl font-bold">87</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Last month</div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-primary">Ongoing 24 Projects</span>
                    <span className="text-muted-foreground">7/28/2025</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis hide />
                            <Bar
                                dataKey="projects"
                                fill="hsl(var(--chart-1))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}