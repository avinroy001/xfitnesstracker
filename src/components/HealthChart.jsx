import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HealthChart = ({ data }) => {
  // Always show pie chart (Overall Data)
  const totalIntake = data.reduce((sum, item) => sum + item.intake, 0);
  const totalBurned = data.reduce((sum, item) => sum + item.burned, 0);

  const pieData = [
    { name: 'Intake', value: totalIntake || 1 },
    { name: 'Burned', value: totalBurned || 1 }
  ];

  // Weekly Health Trends - show only when data exists
  const getWeeklyData = () => {
    if (data.length === 0) return [];
    
    // Get last 7 unique dates
    const uniqueDates = [...new Set(data.map(item => item.date))].sort().slice(-7);
    
    return uniqueDates.map(date => {
      const items = data.filter(item => item.date === date);
      const totalIntake = items.reduce((sum, item) => sum + item.intake, 0);
      const totalBurned = items.reduce((sum, item) => sum + item.burned, 0);
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        intake: totalIntake,
        burned: totalBurned
      };
    });
  };

  const weeklyData = getWeeklyData();

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

      {/* Weekly Health Trends - visible when data exists */}
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