"use client";

import Link from "next/link";
import useTodoStore from "@/store/useTodoStore";
import { ITodoData } from "@/interfaces/todo-interface";
import { useTodos } from "@/hooks/useTodos";
import { deleteTodoById } from "@/services/todo-service";
import Swal from "sweetalert2";
import Spinner from "./Spinner";
import { formatDate } from "@/utils/formatDate";

export default function TableData() {
  const { todos: todoData, setTodos } = useTodoStore();
  const { isLoading, error, refetch, isRefetching } = useTodos();

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
          setTodos(response.data);
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

  if (isLoading || isRefetching) {
    return (
      <>
        <div className="mt-10">
          <Spinner />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className="mb-2 w-full text-right">
          <Link href="/todo/create" className="btn btn-primary">
            Create
          </Link>
        </div>
        <table className="table table-zebra">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Todo</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoData.length > 0 ? (
              todoData.map((rs: ITodoData, index: number) => (
                <tr key={rs.id} className="bg-white border-b">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{rs.todo}</td>
                  <td className="py-3 px-6">{formatDate(rs.created_at)}</td>
                  <td className="flex justify-center gap-1 py-3">
                    <Link href={`/todo/view/${rs.id}`} className="btn btn-info">
                      View
                    </Link>
                    <Link
                      href={`/todo/edit/${rs.id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(rs.id)}
                      className="btn btn-secondary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 px-6" colSpan={4}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
