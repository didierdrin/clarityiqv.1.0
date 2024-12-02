// page.tsx
import React from "react";
import { PDFExportService } from "@/services/financialPerformanceService";

const FinancialPerformance: React.FC = () => {

  const handleExport = async () => {
    try {
      // Show loading indicator (optional)
      await PDFExportService.generateFinancialPerformancePDF();
      // Optionally show success message
      alert('PDF Report Generated Successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };


  return (
    <div className="min-h-screen  flex">
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Financial Performance Dashboard
          </h1>
          <div className="flex space-x-4">
            <button onClick={handleExport} className="flex items-center px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
              Export
            </button>
            {/* <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Add Report
            </button> */}
          </div>
        </header>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Metrics Overview
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Gain insights into performance trends.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Department KPIs
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Evaluate key performance indicators.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Functional Areas
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Discover actionable insights across departments.
            </p>
          </div>
        </section>

        {/* Pagination */}
        <footer className="flex justify-between items-center mt-8">
          <p className="text-sm text-gray-500"><b>Note:</b> All the KPIs data are exported in one document</p>
          <div className="flex space-x-2">
           
          </div>
        </footer>
      </main>
    </div>
  );
};

export default FinancialPerformance;
