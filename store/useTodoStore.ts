import create from "zustand";
import { ITodoData } from "@/interfaces/todo-interface";

interface TodoState {
  todos: ITodoData[];
  setTodos: (todos: ITodoData[]) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
}));

export default useTodoStore;
