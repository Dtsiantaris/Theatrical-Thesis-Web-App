import Image from "next/image";
import React from "react";

function SingleUserPage() {
  return (
    <div className="mt-14 p-5 bg-gray-400 rounded-lg flex">
      <div className="h-max basis-2/6 bg-gray-500 p-5 rounded-lg font-bold text-gray-800">
        <div className="w-full h-80 relative rounded-lg overflow-hidden mb-5">
          <Image src="/noavatar.png" alt="" fill />
        </div>
        John Doe
      </div>
      <div className="ml-5 basis-3/4 bg-gray-500 p-5 rounded-lg">
        <form action="" className="flex flex-col">
          <label>Ονομα</label>
          <input
            className="p-5 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            type="text"
            name="username"
            placeholder="John Doe"
          ></input>
          <label>Email</label>
          <input
            className="p-5 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            type="email"
            name="email"
            placeholder="Email"
          ></input>
          <label>Κωδικος</label>
          <input
            className="p-5 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            type="password"
            name="password"
          ></input>
          <label>Τηλωφονο</label>
          <input
            className="p-5 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            type="text"
            name="phone"
            placeholder="+30 6912345678"
          ></input>
          <label>Πληροφοριες</label>
          <textarea
            className="p-5 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            name="address"
            placeholder="Πληροφοριες"
          />
          <label>Is Admin?</label>
          <select
            className="p-5 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            name="isAddmin"
            id="isAdmin"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button className="p-5 w-full bg-teal-800 border-none rounded-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default SingleUserPage;
