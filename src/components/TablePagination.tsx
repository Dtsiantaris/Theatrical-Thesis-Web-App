import React from "react";

function TablePagination() {
  return (
    <div className="p-3 flex justify-between">
      <button
        className="px-2 py-2 bg-gray-300 disabled:cursor-not-allowed opacity-20 bg-white rounded-lg"
        disabled
      >
        Previous
      </button>
      <button className="px-3 py-2 bg-gray-300 rounded-lg">Next</button>
    </div>
  );
}

export default TablePagination;
