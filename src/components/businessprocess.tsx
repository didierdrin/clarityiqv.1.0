import React from 'react';

const BusinessProcess: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="col-span-12 bg-white shadow-md flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gray-800">Business Process Analysis</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm hover:bg-gray-200">
            Export
          </button>
          <div className="relative">
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm flex items-center space-x-2">
              <span>Today</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="relative">
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm flex items-center space-x-2">
              <span>Compare: Yesterday</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="col-span-12 p-6 space-y-6">
        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Process Visualization</h2>
            <p className="text-4xl font-bold text-green-600 mt-4">40%</p>
            <div className="flex justify-between mt-6">
              <span className="text-sm text-gray-500">01:00 PM</span>
              <span className="text-sm text-gray-500">03:00 PM</span>
            </div>
            {/* Placeholder for Bar Chart */}
            <div className="w-full h-24 bg-gray-200 mt-4 rounded-lg" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Optimization Recommendations</h2>
            <p className="text-4xl font-bold text-green-600 mt-4">30%</p>
            <ul className="mt-6 space-y-2">
              <li className="flex justify-between">
                <span>Buy Product</span>
                <span className="text-green-600">30%</span>
              </li>
              <li className="flex justify-between">
                <span>View Product</span>
                <span className="text-green-600">40%</span>
              </li>
              <li className="flex justify-between">
                <span>Visit Store</span>
                <span className="text-green-600">100%</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Performance Issues</h2>
            <p className="text-4xl font-bold text-green-600 mt-4">40%</p>
            <div className="w-full h-24 bg-gray-200 mt-4 rounded-lg" />
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Detailed Process Analysis</h2>
            <div className="w-full h-48 bg-gray-200 mt-4 rounded-lg" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Process Mining</h2>
            <div className="w-full h-48 bg-gray-200 mt-4 rounded-lg" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessProcess;
