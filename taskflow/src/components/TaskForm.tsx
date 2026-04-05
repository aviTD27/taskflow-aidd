"use client";

import { useState } from 'react';
import { addTask } from '@/lib/tasks';
import { useAuth } from '@/contexts/AuthContext';
import { Priority } from '@/types';

interface TaskFormProps {
  onTaskAdded: () => void;
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addTask(user.uid, {
        title,
        description,
        priority,
        dueDate,
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      onTaskAdded();
    } catch (err) {
      console.error(err);
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800">Create New Task</h3>
      
      {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">{error}</div>}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border border-gray-300"
          placeholder="Task title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border border-gray-300"
          rows={3}
          placeholder="Task description (optional)"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="block w-full rounded-md border text-slate-700 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="block w-full rounded-md border text-slate-700 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
