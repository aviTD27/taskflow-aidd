import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: Timestamp;
}
