import Link from "next/link";
import { Suspense } from "react";

// components
import TableData from "@/components/TableData";
import Spinner from "@/components/Spinner";

export default function Home() {
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-4xl font-bold">
          Todo App using NextJS and Laravel
        </h1>
      </div>

      <Suspense fallback={<Spinner />}>
        <TableData />
      </Suspense>
    </div>
  );
}
