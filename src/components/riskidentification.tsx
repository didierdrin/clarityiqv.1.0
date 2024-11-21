import React from "react";

const RiskIdentification = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Main Content */}
      <main className="flex-1 ">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 rounded-lg flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Risk Identification & Management
          </h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Report
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-200">
              Export
            </button>
          </div>
        </header>

        {/* Table */}
        <section className="mt-6 bg-white shadow-md rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left text-sm text-gray-700 border-b">
                  Risk Category
                </th>
                <th className="p-4 text-left text-sm text-gray-700 border-b">
                  Risk Description
                </th>
                <th className="p-4 text-left text-sm text-gray-700 border-b">
                  Likelihood
                </th>
                <th className="p-4 text-left text-sm text-gray-700 border-b">
                  Impact
                </th>
                <th className="p-4 text-left text-sm text-gray-700 border-b">
                  Risk Score
                </th>
                <th className="p-4 text-left text-sm text-gray-700 border-b">
                  Mitigation Strategy
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-4 text-gray-800">Operational Risk</td>
                <td className="p-4 text-gray-800">Equipment failure</td>
                <td className="p-4 text-gray-800">1</td>
                <td className="p-4 text-gray-800">3</td>
                <td className="p-4 text-gray-800">3</td>
                <td className="p-4 text-gray-800">
                  Diversified suppliers, safety stock
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 text-gray-800">Supply Chain Risk</td>
                <td className="p-4 text-gray-800">Supplier delays</td>
                <td className="p-4 text-gray-800">9</td>
                <td className="p-4 text-gray-800">1</td>
                <td className="p-4 text-gray-800">9</td>
                <td className="p-4 text-gray-800">
                  Regular maintenance, backup equipment
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Pagination */}
        <footer className="mt-6 flex justify-end space-x-2">
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Prev
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            1
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            2
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </button>
        </footer>
      </main>
    </div>
  );
};

export default RiskIdentification;
