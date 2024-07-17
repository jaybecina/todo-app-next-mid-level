import axiosInstance from "@/axios/axiosInstance";
import { ITodoFormInput, ITodoResponse } from "@/interfaces/todo-interface";

export const getAllTodos = async (): Promise<ITodoResponse> => {
  try {
    const response = await axiosInstance.get("/api/todo");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
};

export const getTodoById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/api/todo/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch a todo");
  }
};

export const deleteTodoById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/todo/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete todo");
  }
};

export const createTodo = async (data: ITodoFormInput) => {
  try {
    const response = await axiosInstance.post("/api/todo", data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create todo");
  }
};

export const updateTodo = async (id: number, data: ITodoFormInput) => {
  try {
    const response = await axiosInstance.put(`/api/todo/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update todo");
  }
};
