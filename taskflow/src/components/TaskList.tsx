"use client";

import { Task } from '@/types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onUpdate: () => void;
}

export default function TaskList({ tasks, loading, onUpdate }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm flex gap-4">
            <div className="h-5 w-5 bg-gray-200 rounded mt-1 shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center bg-white p-12 rounded-2xl border-2 border-gray-100 border-dashed animate-in fade-in duration-500 shadow-sm flex flex-col items-center justify-center">
        <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <svg className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">You're all caught up!</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
          There are currently no tasks matching your filters. Create a new one to get started on your next goal.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
