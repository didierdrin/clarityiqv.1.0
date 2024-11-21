import React from "react";

const CustomerInsights = () => {
  return (
    <div className="relative w-screen min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-green-500 text-white py-4 px-8">
        <h1 className="text-2xl font-semibold">Customer Insights</h1>
      </header>

      {/* Actions Section */}
      <div className="flex justify-end gap-4 p-4 bg-white shadow-md">
        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow">
          <span className="text-sm">Add Report</span>
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 4v8M4 8h8" />
          </svg>
        </button>
        <button className="flex items-center px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-md shadow">
          <span className="text-sm">Import</span>
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4 8h8M8 4v8" />
          </svg>
        </button>
        <button className="flex items-center px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-md shadow">
          <span className="text-sm">Export</span>
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 4v8M4 8h8" />
          </svg>
        </button>
      </div>

      {/* Main Table Section */}
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Customer Segmentation</h2>
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gray-100 text-gray-700 py-3 px-4">
            <div>Customer Segment</div>
            <div>Average Purchase Value</div>
            <div>Number of Customers</div>
            <div>Lifetime Value</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-4 py-3 px-4">
              <div className="text-green-500">High Value</div>
              <div>95,769</div>
              <div>9,800</div>
              <div>$10,000</div>
            </div>
            <div className="grid grid-cols-4 py-3 px-4 bg-gray-50">
              <div className="text-yellow-500">Medium Value</div>
              <div>33,978</div>
              <div>14,500</div>
              <div>$7,000</div>
            </div>
            <div className="grid grid-cols-4 py-3 px-4">
              <div className="text-red-500">Low Value</div>
              <div>648,648</div>
              <div>5,000</div>
              <div>$2,908</div>
            </div>
            <div className="grid grid-cols-4 py-3 px-4 bg-gray-50">
              <div className="text-blue-500">New Customers</div>
              <div>26,689</div>
              <div>2,034</div>
              <div>$1,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;
