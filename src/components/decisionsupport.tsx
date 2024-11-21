import React from "react";

const DecisionSupport: React.FC = () => {
  return (
    <div className="flex flex-col  h-screen">
   

      {/* Main Content */}
      <div className="flex-grow flex flex-col bg-white">
        <div className="p-4 shadow-md flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-700">Strategic Initiatives</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              <span>Import</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-green-200">
              <tr>
                <th className="text-left p-2">Initiative</th>
                <th className="text-left p-2">Start Date</th>
                <th className="text-left p-2">End Date</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-2">Enter new international markets</td>
                <td className="p-2">2024-01-01</td>
                <td className="p-2">2024-12-31</td>
                <td className="p-2">In Progress</td>
                <td className="p-2">Increase market share by 10%</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-2">Product Innovation</td>
                <td className="p-2">2024-03-01</td>
                <td className="p-2">2024-12-01</td>
                <td className="p-2">Not Started</td>
                <td className="p-2">Launch eco-friendly products</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DecisionSupport;
