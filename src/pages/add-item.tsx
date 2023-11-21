import React from "react";
import Link from "next/link";

const addItem: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-white p-4">
      <div>
        <div className="mb-4 flex items-center">
          <Link href="/" className="text-lg font-bold text-black">
            &lt;
          </Link>
          <h1 className="ml-2 text-2xl font-extrabold">Add Item</h1>
        </div>

        <div className="mb-4">
          <p className="text-lg font-bold">Information</p>
        </div>

        <div className="form-wrapper">
          <form className="space-y-2">
            <div className="relative mb-2">
              <input
                type="text"
                id="name"
                className="input-field mx-auto w-full rounded bg-gray-300 p-2"
                placeholder="Name"
              />
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                id="price"
                className="input-field mx-auto w-full rounded bg-gray-300 p-2"
                placeholder="Price"
              />
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                id="quantity"
                className="input-field mx-auto w-full rounded bg-gray-300 p-2"
                placeholder="Stock Quantity"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full px-2">
        <button
          type="submit"
          className="w-full rounded-md bg-red-400 px-2 py-2 font-bold text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default addItem;
