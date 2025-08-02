import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "Male", value: 75, color: "hsl(var(--chart-1))" },
    { name: "Female", value: 25, color: "hsl(var(--chart-3))" },
];

export default function GenderChart() {
    return (
        <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="text-base font-medium">Total Employees</CardTitle>
                <div className="text-2xl font-bold">590</div>
            </CardHeader>
            <CardContent>
                <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-muted-foreground">Male</div>
                        <div className="text-3xl font-bold">75</div>
                    </div>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-chart-1"></div>
                        <span className="text-sm text-muted-foreground">Male (75%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-chart-3"></div>
                        <span className="text-sm text-muted-foreground">Female (25%)</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}