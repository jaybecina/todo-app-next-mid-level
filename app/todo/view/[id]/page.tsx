"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { ITodoData, ITodoFormInput } from "@/interfaces/todo-interface";
import { todoSchema } from "@/schema/todo-schema";
import useTodoStore from "@/store/useTodoStore";
import { useTodos } from "@/hooks/useTodos";
import {
  deleteTodoById,
  getTodoById,
  updateTodo,
} from "@/services/todo-service";
import Link from "next/link";

const ViewTodoPage: React.FC = ({ params }: any) => {
  const id = params.id;
  const { todos: todoData, setTodos } = useTodoStore();
  const { isLoading, error, refetch, isRefetching } = useTodos();
  const [todo, setTodo] = useState<ITodoData | null>(null);

  useEffect(() => {
    fetchTodo(parseInt(id));
  }, [id]);

  const fetchTodo = async (id: number) => {
    try {
      const response = await getTodoById(id);
      setTodo(response.data);
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure you want to delete this TODO?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.value) {
        try {
          const response = await deleteTodoById(id);
          setTodo(response.data);
          handleRefetch("A TODO was succesfully deleted");
        } catch (error) {
          Swal.fire({
            title: `Error deleting todo: ${error}`,
            text: "",
            icon: "error",
          });
          console.error("Error deleting todo:", error);
        }
      }
    });
  };

  const handleRefetch = (notifMsg: string) => {
    refetch().then((res) => {
      Swal.fire({
        title: notifMsg,
        text: "",
        icon: "success",
      });
    });
  };

  return (
    <div className="max-w-md mx-auto mt-14">
      <h1 className="text-2xl text-center mb-14">View Todo</h1>
      <h5 className="text-xl text-center mb-2">{todo?.todo}</h5>
      <div className="mt-44">
        <Link href={`/`} className="btn btn-info mr-4">
          Back
        </Link>
        <Link href={`/todo/edit/${id}`} className="btn btn-primary mr-4">
          Edit
        </Link>
        <button onClick={() => handleDelete(id)} className="btn btn-secondary">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewTodoPage;
