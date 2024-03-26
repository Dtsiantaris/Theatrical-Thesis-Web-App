import Image from "next/image";
import Link from "next/link";
import React from "react";
import Search from "../../../src/components/dashboard/search/search";
import TablePagination from "../../../src/components/TablePagination";

function editTheatrePage() {
  return (
    <div className="mt-14 p-5 bg-gray-400 rounded-lg">
      <div className="flex items-center justify-between">
        <Search placeholder="Βρες εναν θεατρο..." />
        <Link href="/dashboard/edittheatre/add">
          <button className="p-3 bg-secondary border-none rounded-md">
            Προσθηκη νεου
          </button>
        </Link>
      </div>
      <table className="mt-10 w-full border-separate">
        <thead>
          <tr>
            <td>Ονομα</td>
            <td>Πληροφοριες</td>
            <td>Τοποθεσια</td>
            <td>Δημιουργηθηκε</td>
            <td>Acion</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <Image
                  className="rounded-full object-cover"
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                />
                Θεατρο σκιων
              </div>
            </td>
            <td>lorem ipsum lorem ipsum lorem ipsum</td>
            <td>θεσσαλονικη</td>
            <td>3.20.2024</td>
            <td>
              <div className="flex gap-3">
                <Link href="/dashboard/edittheatre/test">
                  <button className="px-2 py-2 rounded-md border-none text-white bg-teal-800">
                    View
                  </button>
                </Link>
                <button className="px-2 py-2 rounded-md border-none text-white bg-red-400">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <TablePagination />
    </div>
  );
}

export default editTheatrePage;
