import { useQuery } from "@tanstack/react-query";
import useTodoStore from "@/store/useTodoStore";
import { ITodoData } from "@/interfaces/todo-interface";
import { getAllTodos } from "../services/todo-service";

export const useTodos = () => {
  const { setTodos } = useTodoStore();

  const {
    data: todos,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["cached_todos"],
    queryFn: async () => {
      const response = await getAllTodos();
      setTodos(response.data);
      return response.data;
    },
  });

  return {
    todos,
    isLoading,
    error,
    refetch,
    isRefetching,
  };
};
