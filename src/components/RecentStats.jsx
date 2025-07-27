import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const RecentStats = ({ data, onEdit, onDelete }) => {
  const recentData = [...data].reverse().slice(0, 5);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Recent Health Statistics</h2>
      <div className="space-y-4">
        {recentData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-medium">{item.date}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm">Calories Intake = {item.intake} | Calories Burned = {item.burned}</p>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => onEdit(item)} className="text-blue-500 hover:text-blue-700">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentStats;