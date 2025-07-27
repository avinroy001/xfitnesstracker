import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import AddDataForm from './components/AddDataForm';
import EditDataForm from './components/EditDataForm';
import HealthChart from './components/HealthChart';
import RecentStats from './components/RecentStats';

const LOCAL_STORAGE_KEY = "healthAndFitness";

function App() {
  const [data, setData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setData(JSON.parse(stored));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleAdd = (newItem) => {
    setData([...data, newItem]);
    enqueueSnackbar("Data added successfully!", { variant: "success" });
  };

  const handleUpdate = (updatedItem) => {
    setData(data.map(item => item.id === updatedItem.id ? updatedItem : item));
    setIsEditModalOpen(false);
    enqueueSnackbar("Data updated successfully!", { variant: "info" });
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    enqueueSnackbar("Data deleted successfully!", { variant: "warning" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Health And Fitness Tracker</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          + Add data
        </button>
      </div>

      <HealthChart data={data} />

      <RecentStats
        data={data}
        onEdit={(item) => {
          setEditItem(item);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <AddDataForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />

      {editItem && (
        <EditDataForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          item={editItem}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}

export default App;