import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HealthChart = ({ data }) => {
  // Get last 7 days of data
  const getLast7Days = () => {
    const today = new Date();
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const last7Days = getLast7Days();
  
  // Create data for each day (even if no data exists)
  const weeklyData = last7Days.map(date => {
    const item = data.find(d => d.date === date);
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      intake: item ? item.intake : 0,
      burned: item ? item.burned : 0
    };
  });

  const totalIntake = data.reduce((sum, item) => sum + item.intake, 0);
  const totalBurned = data.reduce((sum, item) => sum + item.burned, 0);

  const pieData = [
    { name: 'Intake', value: totalIntake },
    { name: 'Burned', value: totalBurned }
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Overall Data</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Health Trends should always be visible after data is added */}
      {data.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4 mt-10">Weekly Health Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="intake" fill="#0088FE" name="Calories Intake" />
                <Bar dataKey="burned" fill="#00C49F" name="Calories Burned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default HealthChart;