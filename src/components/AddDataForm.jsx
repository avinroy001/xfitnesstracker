import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddDataForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    intake: '',
    burned: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...formData,
      intake: Number(formData.intake),
      burned: Number(formData.burned)
    };
    onSubmit(newItem);
    setFormData({ date: '', intake: '', burned: '', description: '' });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <h2 className="text-xl font-semibold mb-4">Update Today's Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Calories Intake</label>
          <input
            type="number"
            name="intake"
            placeholder="Enter Today's Calorie Intake"
            value={formData.intake}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Calories Burned</label>
          <input
            type="number"
            name="burned"
            placeholder="Enter Today's Calorie Burned"
            value={formData.burned}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter a short description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddDataForm;