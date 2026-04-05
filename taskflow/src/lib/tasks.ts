import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Task } from '@/types';

export const addTask = async (userId: string, task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'completed'>) => {
  const tasksRef = collection(db, 'tasks');
  const docRef = await addDoc(tasksRef, {
    ...task,
    userId,
    completed: false,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getTasks = async (userId: string): Promise<Task[]> => {
  const tasksRef = collection(db, 'tasks');
  const q = query(
    tasksRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  const tasks: Task[] = [];
  querySnapshot.forEach((document) => {
    // Keep Timestamp instance so we don't have to parse it
    tasks.push({ id: document.id, ...document.data() } as Task);
  });
  
  return tasks;
};

export const toggleTaskCompleted = async (taskId: string, completed: boolean) => {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, { completed });
};

export const deleteUserTask = async (taskId: string) => {
  const taskRef = doc(db, 'tasks', taskId);
  await deleteDoc(taskRef);
};
