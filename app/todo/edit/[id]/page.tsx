"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { ITodoFormInput } from "@/interfaces/todo-interface";
import { todoSchema } from "@/schema/todo-schema";
import { getTodoById, updateTodo } from "@/services/todo-service";
import Link from "next/link";

const ViewTodoPage: React.FC = ({ params }: any) => {
  const id = params.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ITodoFormInput>({
    resolver: yupResolver(todoSchema),
  });

  useEffect(() => {
    fetchTodo(Number(id));
  }, [id]);

  const fetchTodo = async (id: number) => {
    try {
      const result = await getTodoById(id);
      setValue("todo", result.data.todo);
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await updateTodo(id, data);
      handleRedirect("Todo updated successfully");
    } catch (error) {
      Swal.fire({
        title: `Error updating todo: ${error}`,
        text: "",
        icon: "error",
      });
      console.error("Error updating todo:", error);
    }
  };

  const handleRedirect = (notifMsg: string) => {
    Swal.fire({
      title: notifMsg,
      text: "",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        redirectHome();
      }
    });
  };

  const redirectHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-40">Edit Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <input
            type="text"
            id="todo"
            {...register("todo")}
            className={`input input-bordered input-primary w-full max-w-xs ${
              errors.todo ? "input-error" : ""
            }`}
            placeholder="Enter a TODO..."
          />
          {errors.todo && (
            <p className="text-sm text-red-500">{errors.todo.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary mr-4">
          Update Todo
        </button>
        <Link href={`/`} className="btn btn-info mr-4">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default ViewTodoPage;
