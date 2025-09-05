import React from 'react';

const Sell = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-[#2F4DA2]">Sell a Share</h1>
      <p className="mb-4 text-gray-700">
        Here you can post shares for sale. Other users can view your listing and show interest. Once interested,
        they can initiate a chat to negotiate the price.
      </p>

      <form className="space-y-4 max-w-xl">
        <div>
          <label className="block font-semibold">Number of Shares to Sell</label>
          <input
            type="number"
            placeholder="Enter number of shares"
            className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-semibold">Price per Share (USD)</label>
          <input
            type="number"
            placeholder="Enter price per share"
            className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-semibold">Additional Notes (Optional)</label>
          <textarea
            placeholder="Mention any condition or note..."
            rows="4"
            className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#2F4DA2] hover:bg-[#1A3C85] text-white px-6 py-2 rounded-md font-semibold transition"
        >
          Post Share for Sale
        </button>
      </form>
    </div>
  );
};

export default Sell;