"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/schema/todo-schema";
import { ITodoFormInput } from "@/interfaces/todo-interface";
import Swal from "sweetalert2";
import useTodoStore from "@/store/useTodoStore";
import { createTodo } from "@/services/todo-service";
import Link from "next/link";

const CreateTodoPage = () => {
  const { todos: todoData, setTodos } = useTodoStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodoFormInput>({
    resolver: yupResolver(todoSchema),
  });

  const onSubmit = async (data: ITodoFormInput) => {
    Swal.fire({
      title: "Are you sure you want to create this TODO?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.value) {
        try {
          await createTodo(data);
          handleRedirect("A TODO was succesfully created");
        } catch (error) {
          Swal.fire({
            title: `Error creating todo: ${error}`,
            text: "",
            icon: "error",
          });
          console.error("Error creating todo:", error);
        }
      }
    });
  };

  const handleRedirect = (notifMsg: string) => {
    Swal.fire({
      title: notifMsg,
      text: "",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.value) {
        redirectHome();
      }
    });
  };

  const redirectHome = () => {
    return (window.location.href = "/");
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-40">Add New Todo</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            {/* <label
              htmlFor="todo"
              className="block text-sm font-medium text-gray-900"
            >
              Todo
            </label> */}
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
            Submit Todo
          </button>
          <Link href={`/`} className="btn btn-info mr-4">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoPage;
