import React, { useState, useEffect } from "react";
import { MarketAndCompetitiveService } from "@/services/marketAndCompetitiveService";
import { DataSource } from "@/interfaces/interfaces";

const MarketAndCompetitive: React.FC = () => {
  const [marketingData, setMarketingData] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketingData = async () => {
      try {
        setIsLoading(true);
        const data = await MarketAndCompetitiveService.fetchMarketingData();
        setMarketingData(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch marketing data");
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchMarketingData();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow-md p-4">
        <div className="text-xl font-bold text-green-600">
          Market and Competitive Intelligence
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600">
            Add Report
          </button>
          <div className="h-8 w-8 bg-blue-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600">A</span>
          </div>
          <button className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m4-2h.01M17 16h-2m1-8h.01M8 9h.01M4 16h1m2 0h.01M4 12h1m6-4h.01M4 8h1"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Marketing Campaign Analysis</h1>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex bg-gray-200 text-gray-600 font-semibold">
            <div className="w-1/3 p-4">Metric</div>
            <div className="w-1/3 p-4">Value</div>
            <div className="w-1/3 p-4">Data Source</div>
          </div>
          <div className="divide-y divide-gray-200">
            {marketingData.map((data, index) => (
              <div key={data.id || index} className="flex">
                <div className="w-1/3 p-4">Campaign Name</div>
                <div className="w-1/3 p-4">{data.departmentData?.campaignName || 'N/A'}</div>
                <div className="w-1/3 p-4">{data.name || 'Marketing Data'}</div>
              </div>
            ))}
            {marketingData.map((data, index) => (
              <div key={`ad-spend-${data.id || index}`} className="flex">
                <div className="w-1/3 p-4">Ad Spend</div>
                <div className="w-1/3 p-4">${data.departmentData?.adSpend || 'N/A'}</div>
                <div className="w-1/3 p-4">Marketing Budget</div>
              </div>
            ))}
            {marketingData.map((data, index) => (
              <div key={`conversion-rate-${data.id || index}`} className="flex">
                <div className="w-1/3 p-4">Conversion Rate</div>
                <div className="w-1/3 p-4">{data.departmentData?.conversionRate}%</div>
                <div className="w-1/3 p-4">Campaign Performance</div>
              </div>
            ))}
            <div className="flex">
              <div className="w-1/3 p-4">Sync Frequency</div>
              <div className="w-1/3 p-4">{marketingData[0]?.syncFrequency || 'Not Set'}</div>
              <div className="w-1/3 p-4">Data Update Cycle</div>
            </div>
            <div className="flex">
              <div className="w-1/3 p-4">Last Recorded</div>
              <div className="w-1/3 p-4">
                {marketingData[0]?.recordedAt 
                  ? new Date(marketingData[0].recordedAt).toLocaleString() 
                  : 'N/A'}
              </div>
              <div className="w-1/3 p-4">Data Timestamp</div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-6 gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-500 text-white">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketAndCompetitive;

// import React from "react";

// const MarketAndCompetitive: React.FC = () => {
//   return (
//     <div className="relative min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="flex items-center justify-between bg-white shadow-md p-4">
//         <div className="text-xl font-bold text-green-600">
//           Market and Competitive Intelligence
//         </div>
//         <div className="flex items-center gap-4">
//           <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600">
//             Add Report
//           </button>
//           <div className="h-8 w-8 bg-blue-200 rounded-full flex items-center justify-center">
//             <span className="text-xs font-bold text-blue-600">A</span>
//           </div>
//           <button className="text-gray-500 hover:text-gray-800">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M13 16h-1v-4h-1m4-2h.01M17 16h-2m1-8h.01M8 9h.01M4 16h1m2 0h.01M4 12h1m6-4h.01M4 8h1"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <h1 className="text-2xl font-semibold mb-6">Market Analysis</h1>

//         {/* Table */}
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="flex bg-gray-200 text-gray-600 font-semibold">
//             <div className="w-1/3 p-4">Metric</div>
//             <div className="w-1/3 p-4">Value</div>
//             <div className="w-1/3 p-4">Data Source</div>
//           </div>
//           <div className="divide-y divide-gray-200">
//             <div className="flex">
//               <div className="w-1/3 p-4">Market Size</div>
//               <div className="w-1/3 p-4">$10 billion</div>
//               <div className="w-1/3 p-4">Industry Reports</div>
//             </div>
//             <div className="flex">
//               <div className="w-1/3 p-4">Market Growth Rate</div>
//               <div className="w-1/3 p-4">5% annually</div>
//               <div className="w-1/3 p-4">External Data Sources</div>
//             </div>
//             <div className="flex">
//               <div className="w-1/3 p-4">Customer Preferences</div>
//               <div className="w-1/3 p-4">Eco-friendly products</div>
//               <div className="w-1/3 p-4">Surveys & Market Research</div>
//             </div>
//             <div className="flex">
//               <div className="w-1/3 p-4">Industry Trends</div>
//               <div className="w-1/3 p-4">Automation & Sustainability</div>
//               <div className="w-1/3 p-4">Industry Reports</div>
//             </div>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-end items-center mt-6 gap-2">
//           <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
//             &lt;
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-500 text-white">
//             1
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
//             2
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
//             3
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketAndCompetitive;
