import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "Electricity", complaints: 400, resolved: 300 },
    { name: "Water", complaints: 300, resolved: 200 },
    { name: "Gas", complaints: 200, resolved: 180 },
    { name: "Municipal", complaints: 278, resolved: 200 },
    { name: "Waste", complaints: 189, resolved: 150 },
    { name: "Property", complaints: 150, resolved: 100 },
];

const pieData = [
    { name: "Resolved", value: 856, color: "#22c55e" },
    { name: "Pending", value: 342, color: "#f97316" },
    { name: "Critical", value: 50, color: "#ef4444" },
];

const Analytics = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
                <p className="text-muted-foreground">Detailed insights into system performance and citizen satisfaction.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Complaints by Department</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                                <Legend />
                                <Bar dataKey="complaints" fill="#3b82f6" name="Total Complaints" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="resolved" fill="#22c55e" name="Resolved" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Overall Status Distribution</h3>
                    <div className="h-[300px] w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
