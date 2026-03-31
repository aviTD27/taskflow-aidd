export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}
