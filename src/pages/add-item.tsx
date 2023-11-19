import React from 'react';
import Link from 'next/link';

const addItem: React.FC = () => {
  return (
    <div className="bg-white p-4 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-4">
          <Link href="/" className="text-black font-bold text-lg">
            &lt;
          </Link>
          <h1 className="text-2xl font-extrabold ml-2">Add Item</h1>
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
                className="input-field w-full bg-gray-300 p-2 rounded mx-auto"
                placeholder="Name"
              />
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                id="price"
                className="input-field w-full bg-gray-300 p-2 rounded mx-auto"
                placeholder="Price"
              />
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                id="quantity"
                className="input-field w-full bg-gray-300 p-2 rounded mx-auto"
                placeholder="Stock Quantity"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full px-2">
        <button
          type="submit"
          className="bg-red-400 text-white font-bold py-2 px-2 w-full rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default addItem;
