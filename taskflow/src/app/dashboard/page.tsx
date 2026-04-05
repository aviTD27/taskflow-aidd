"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getTasks } from '@/lib/tasks';
import { Task } from '@/types';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import TaskFilters, { PriorityFilter, StatusFilter, SortOption } from '@/components/TaskFilters';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('due_asc');

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    try {
      setTasksLoading(true);
      const fetchedTasks = await getTasks(user.uid);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setTasksLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(query));
    }

    if (priorityFilter !== 'all') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        result = result.filter(t => !t.completed);
      } else if (statusFilter === 'completed') {
        result = result.filter(t => t.completed);
      }
    }

    result.sort((a, b) => {
      if (sortBy === 'due_asc') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'due_desc') {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      } else if (sortBy === 'priority') {
        const priorityScore: Record<string, number> = { high: 3, medium: 2, low: 1 };
        return priorityScore[b.priority] - priorityScore[a.priority];
      }
      return 0;
    });

    return result;
  }, [tasks, searchQuery, priorityFilter, statusFilter, sortBy]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">
          Welcome back! Here's an overview of your tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 sticky top-8">
          <TaskForm onTaskAdded={fetchTasks} />
        </div>
        
        <div className="md:col-span-2">
          <TaskFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <div className="bg-transparent rounded-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 px-1">Your Tasks</h2>
            <TaskList tasks={filteredTasks} loading={tasksLoading} onUpdate={fetchTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
