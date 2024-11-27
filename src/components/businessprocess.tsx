import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DinaggregationService } from "@/services/dinaggregationService";
import Chart from "chart.js/auto";

// Type Definitions
interface DepartmentData {
  stockQuantity?: number;
  invoiceAmount?: number;
  conversionRate?: number;
  resolutionTime?: number;
  dataQualityScore?: number;
}

interface DataSource {
  name: string;
  type: string;
  departmentData?: DepartmentData;
}

const BusinessProcess: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [chartInstances, setChartInstances] = useState<Chart[]>([]);

  // Memoized Filtered Data
  const processVisualizationData = useMemo(() => 
    dataSources.filter((item) => item.type === "Operations"),
    [dataSources]
  );

  const optimizationRecommendationsData = useMemo(() => 
    dataSources.filter((item) => item.type === "Marketing"),
    [dataSources]
  );

  const performanceIssuesData = useMemo(() => 
    dataSources.filter((item) => item.type === "Customer Service"),
    [dataSources]
  );

  const detailedProcessAnalysisData = useMemo(() => 
    dataSources.filter((item) => item.type === "Finance"),
    [dataSources]
  );

  const processMiningData = dataSources; // Use all data for process mining

  // Fetch data from the service on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await DinaggregationService.fetchDataSources();
        setDataSources(data);
      } catch (error) {
        console.error("Failed to fetch data sources:", error);
        setError("Unable to load data sources");
      }
    }
    fetchData();
  }, []);

  // Safe Chart Rendering with Consistent ID Generation
  const renderChart = useCallback((canvasId: string, data: DataSource[], label: string, valueKey: keyof DepartmentData) => {
    // Generate a safe, consistent ID
    const safeCanvasId = `chart-${canvasId.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const ctx = document.getElementById(safeCanvasId) as HTMLCanvasElement;
    
    if (ctx) {
      // Destroy existing chart if it exists
      const existingChart = Chart.getChart(safeCanvasId);
      if (existingChart) {
        existingChart.destroy();
      }

      // Create new chart
      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((item) => item.name),
          datasets: [
            {
              label,
              data: data.map((item) => item.departmentData?.[valueKey] || 0),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Store chart instance for cleanup
      setChartInstances(prev => [...prev, newChart]);
    }
  }, []);

  // Render Charts with Memoized Data
  useEffect(() => {
    renderChart("processVisualization", processVisualizationData, "Stock Quantity", "stockQuantity");
    renderChart("detailedProcess", detailedProcessAnalysisData, "Invoice Amount", "invoiceAmount");
    renderChart("processMining", processMiningData, "General Data Overview", "dataQualityScore");
  }, [renderChart, processVisualizationData, detailedProcessAnalysisData, processMiningData]);

  // Cleanup Charts on Unmount
  useEffect(() => {
    return () => {
      chartInstances.forEach(chart => chart.destroy());
    };
  }, [chartInstances]);

  // Error Handling
  if (error) {
    return (
      <div className="text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="col-span-12 bg-white shadow-md flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gray-800">Business Process Analysis</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm hover:bg-gray-200">
            Export
          </button>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="col-span-12 p-6 space-y-6">
        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Process Visualization */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Process Visualization</h2>
            <div className="h-48">
              <canvas id="chart-processVisualization" className="w-full h-full" />
            </div>
          </div>

          {/* Optimization Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Optimization Recommendations</h2>
            <ul className="mt-6 space-y-2">
              {optimizationRecommendationsData.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-green-600">{item.departmentData?.conversionRate || 0}%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Performance Issues */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Performance Issues</h2>
            <ul className="mt-6 space-y-2">
              {performanceIssuesData.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-red-600">{item.departmentData?.resolutionTime || 0} hours</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detailed Process Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Detailed Process Analysis</h2>
            <div className="h-48">
              <canvas id="chart-detailedProcess" className="w-full h-full" />
            </div>
          </div>

          {/* Process Mining */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Process Mining</h2>
            <div className="h-48">
              <canvas id="chart-processMining" className="w-full h-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessProcess;

// import React, { useEffect, useState } from "react";
// import { DinaggregationService } from "@/services/dinaggregationService";
// import Chart from "chart.js/auto";

// const BusinessProcess: React.FC = () => {
//   const [dataSources, setDataSources] = useState<any[]>([]);

//   // Fetch data from the service on component mount
//   useEffect(() => {
//     async function fetchData() {
//       const data = await DinaggregationService.fetchDataSources();
//       setDataSources(data);
//     }
//     fetchData();
//   }, []);

//   // Categorize Data for Different Sections
//   const processVisualizationData = dataSources.filter(
//     (item) => item.type === "Operations"
//   );
//   const optimizationRecommendationsData = dataSources.filter(
//     (item) => item.type === "Marketing"
//   );
//   const performanceIssuesData = dataSources.filter(
//     (item) => item.type === "Customer Service"
//   );
//   const detailedProcessAnalysisData = dataSources.filter(
//     (item) => item.type === "Finance"
//   );
//   const processMiningData = dataSources; // Use all data for process mining

//   // UseEffect to Render Charts
//   useEffect(() => {
//     const renderChart = (canvasId: string, data: any, label: string, valueKey: string) => {
//       const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
//       if (ctx) {
//         new Chart(ctx, {
//           type: "bar",
//           data: {
//             labels: data.map((item: any) => item.name),
//             datasets: [
//               {
//                 label,
//                 data: data.map((item: any) => item.departmentData?.[valueKey] || 0),
//                 backgroundColor: "rgba(75, 192, 192, 0.2)",
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 borderWidth: 1,
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         });
//       }
//     };

//     // Render Charts
//     renderChart("processVisualizationChart", processVisualizationData, "Stock Quantity", "stockQuantity");
//     renderChart("detailedProcessChart", detailedProcessAnalysisData, "Invoice Amount", "invoiceAmount");
//     renderChart("processMiningChart", processMiningData, "General Data Overview", "dataQualityScore");
//   }, [processVisualizationData, detailedProcessAnalysisData, processMiningData]);

//   return (
//     <div className="grid grid-cols-12 gap-4 min-h-screen bg-gray-100">
//       {/* Header Section */}
//       <header className="col-span-12 bg-white shadow-md flex items-center justify-between p-4">
//         <h1 className="text-xl font-bold text-gray-800">Business Process Analysis</h1>
//         <div className="flex space-x-4">
//           <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm hover:bg-gray-200">
//             Export
//           </button>
//         </div>
//       </header>

//       {/* Main Content Section */}
//       <main className="col-span-12 p-6 space-y-6">
//         {/* Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Process Visualization */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Process Visualization</h2>
//             <canvas id="processVisualizationChart" className="w-full h-48" />
//           </div>

//           {/* Optimization Recommendations */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Optimization Recommendations</h2>
//             <ul className="mt-6 space-y-2">
//               {optimizationRecommendationsData.map((item, index) => (
//                 <li key={index} className="flex justify-between">
//                   <span>{item.name}</span>
//                   <span className="text-green-600">{item.departmentData?.conversionRate || 0}%</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Performance Issues */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Performance Issues</h2>
//             <ul className="mt-6 space-y-2">
//               {performanceIssuesData.map((item, index) => (
//                 <li key={index} className="flex justify-between">
//                   <span>{item.name}</span>
//                   <span className="text-red-600">{item.departmentData?.resolutionTime || 0} hours</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Detailed Process Analysis */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Detailed Process Analysis</h2>
//             <canvas id="detailedProcessChart" className="w-full h-48" />
//           </div>

//           {/* Process Mining */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Process Mining</h2>
//             <canvas id="processMiningChart" className="w-full h-48" />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BusinessProcess;




// import React from 'react';

// const BusinessProcess: React.FC = () => {
//   return (
//     <div className="grid grid-cols-12 gap-4 min-h-screen bg-gray-100">
//       {/* Header Section */}
//       <header className="col-span-12 bg-white shadow-md flex items-center justify-between p-4">
//         <h1 className="text-xl font-bold text-gray-800">Business Process Analysis</h1>
//         <div className="flex space-x-4">
//           <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm hover:bg-gray-200">
//             Export
//           </button>
//           <div className="relative">
//             <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm flex items-center space-x-2">
//               <span>Today</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//           </div>
//           <div className="relative">
//             <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm flex items-center space-x-2">
//               <span>Compare: Yesterday</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content Section */}
//       <main className="col-span-12 p-6 space-y-6">
//         {/* Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Process Visualization</h2>
//             <p className="text-4xl font-bold text-green-600 mt-4">40%</p>
//             <div className="flex justify-between mt-6">
//               <span className="text-sm text-gray-500">01:00 PM</span>
//               <span className="text-sm text-gray-500">03:00 PM</span>
//             </div>
//             {/* Placeholder for Bar Chart */}
//             <div className="w-full h-24 bg-gray-200 mt-4 rounded-lg" />
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Optimization Recommendations</h2>
//             <p className="text-4xl font-bold text-green-600 mt-4">30%</p>
//             <ul className="mt-6 space-y-2">
//               <li className="flex justify-between">
//                 <span>Buy Product</span>
//                 <span className="text-green-600">30%</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>View Product</span>
//                 <span className="text-green-600">40%</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Visit Store</span>
//                 <span className="text-green-600">100%</span>
//               </li>
//             </ul>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Performance Issues</h2>
//             <p className="text-4xl font-bold text-green-600 mt-4">40%</p>
//             <div className="w-full h-24 bg-gray-200 mt-4 rounded-lg" />
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Detailed Process Analysis</h2>
//             <div className="w-full h-48 bg-gray-200 mt-4 rounded-lg" />
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800">Process Mining</h2>
//             <div className="w-full h-48 bg-gray-200 mt-4 rounded-lg" />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BusinessProcess;
