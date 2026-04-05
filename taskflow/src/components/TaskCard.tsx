"use client";

import { useState } from 'react';
import { Task, Priority } from '@/types';
import { toggleTaskCompleted, deleteUserTask } from '@/lib/tasks';

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

const priorityColors: Record<Priority, { bg: string; text: string; dot: string }> = {
  high: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  low: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
};

export default function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [loading, setLoading] = useState(false);
  const colors = priorityColors[task.priority];

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleTaskCompleted(task.id, !task.completed);
      onUpdate();
    } catch (error) {
      console.error('Failed to update task', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    try {
      await deleteUserTask(task.id);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete task', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`group p-5 rounded-xl border transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
      task.completed ? 'bg-gray-50/70 border-gray-200 opacity-75 grayscale-[0.5]' : 'bg-white border-gray-100 hover:border-indigo-100'
    }`}>
      <div className="flex items-start gap-4">
        <label className="flex h-6 items-center cursor-pointer mt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            disabled={loading}
            className="h-5 w-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-1 cursor-pointer disabled:opacity-50 transition-colors duration-200"
          />
        </label>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h4 className={`text-base font-semibold truncate transition-all duration-300 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
              {task.title}
            </h4>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.bg} ${colors.text} transition-colors duration-300 ${task.completed ? 'opacity-50' : 'opacity-100'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
          
          {task.description && (
            <p className={`mt-1.5 text-sm transition-all duration-300 ${task.completed ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
              {task.description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
              <div className="flex items-center gap-1">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {task.createdAt?.toDate ? task.createdAt.toDate().toLocaleDateString() : 'Today'}
              </div>
            </div>
            
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Delete task"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
