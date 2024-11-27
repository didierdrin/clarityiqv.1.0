import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DashboardService } from "@/services/dashboardService";

interface SalesOverviewData {
  month: string;
  sales: number;
}

interface RevenueData {
  name: string;
  value: number;
}

interface QuickStats {
  totalRevenue: number;
  newCustomers: number;
}

interface DetailedReport {
  product: string;
  sales: number;
  revenue: string;
}

const DashboardSection: React.FC = () => {
  const [salesOverviewData, setSalesOverviewData] = useState<SalesOverviewData[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStats>({ totalRevenue: 0, newCustomers: 0 });
  const [detailedReport, setDetailedReport] = useState<DetailedReport[]>([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const salesData = await DashboardService.fetchSalesData();
        const { salesOverviewData, revenueData, quickStats, detailedReport } =
          DashboardService.processSalesData(salesData);

        setSalesOverviewData(salesOverviewData);
        setRevenueData(revenueData);
        setQuickStats(quickStats);
        setDetailedReport(detailedReport);
      } catch (error) {
        console.error("Failed to fetch and process dashboard data:", error);
      }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 mr-5">
      {/* Sales Overview */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <BarChart width={300} height={200} data={salesOverviewData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
        <PieChart width={300} height={200}>
          <Pie
            data={revenueData}
            cx={150}
            cy={100}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {revenueData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Quick Stats */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Total Revenue</span>
            <span className="font-bold">${quickStats.totalRevenue.toLocaleString()}</span>
          </li>
          <li className="flex justify-between">
            <span>New Customers</span>
            <span className="font-bold">{quickStats.newCustomers}</span>
          </li>
        </ul>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white shadow rounded-lg p-6 col-span-3">
        <h2 className="text-xl font-semibold mb-4">Detailed Report</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Product</th>
              <th className="p-2 text-right">Sales</th>
              <th className="p-2 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {detailedReport.map((report, index) => (
              <tr key={index} className="border-t hover:bg-slate-200 cursor-pointer">
                <td className="p-2">{report.product}</td>
                <td className="p-2 text-right">{report.sales}</td>
                <td className="p-2 text-right">{report.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSection;





// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// interface SalesOverviewData {
//   month: string;
//   sales: number;
// }

// interface RevenueData {
//   name: string;
//   value: number;
// }

// interface QuickStats {
//   totalRevenue: number;
//   newCustomers: number;
// }

// interface DetailedReport {
//   product: string;
//   sales: number;
//   revenue: string;
// }

// const DashboardSection: React.FC = () => {
//   const [salesOverviewData, setSalesOverviewData] = useState<SalesOverviewData[]>([]);
//   const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
//   const [quickStats, setQuickStats] = useState<QuickStats>({ totalRevenue: 0, newCustomers: 0 });
//   const [detailedReport, setDetailedReport] = useState<DetailedReport[]>([]);

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

//   useEffect(() => {
//     const fetchSalesData = async () => {
//       const db = getFirestore();
//       const snapshot = await getDocs(collection(db, "dinaggregation"));

//       const data = snapshot.docs
//         .map(doc => doc.data())
//         .filter(item => item.type === "Sales"); // Filter only sales data

//       processSalesData(data);
//     };

//     const processSalesData = (data: any[]) => {
//       // 1. Sales Overview Data
//       const monthlySales = data.reduce((acc: any, item: any) => {
//         const date = new Date(item.lastSyncedDate);
//         const month = date.toLocaleString("default", { month: "short" });

//         acc[month] = (acc[month] || 0) + item.departmentData.saleAmount;
//         return acc;
//       }, {});
//       setSalesOverviewData(
//         Object.keys(monthlySales).map(month => ({
//           month,
//           sales: monthlySales[month],
//         }))
//       );

//       // 2. Revenue Breakdown
//       const revenueBreakdown = data.reduce((acc: any, item: any) => {
//         const product = item.departmentData.productPurchased;
//         acc[product] = (acc[product] || 0) + item.departmentData.saleAmount;
//         return acc;
//       }, {});
//       setRevenueData(
//         Object.keys(revenueBreakdown).map(product => ({
//           name: product,
//           value: revenueBreakdown[product],
//         }))
//       );

//       // 3. Quick Stats
//       const totalRevenue = data.reduce(
//         (sum: number, item: any) => sum + item.departmentData.saleAmount,
//         0
//       );
//       const newCustomers = data.length; // Example: each record represents a new customer
//       setQuickStats({ totalRevenue, newCustomers });

//       // 4. Detailed Report
//       setDetailedReport(
//         data.map(item => ({
//           product: item.departmentData.productPurchased,
//           sales: item.departmentData.saleAmount,
//           revenue: `$${item.departmentData.saleAmount.toLocaleString()}`,
//         }))
//       );
//     };

//     fetchSalesData();
//   }, []);

//   return (
//     <div className="grid grid-cols-3 gap-6">
//       {/* Sales Overview */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
//         <BarChart width={300} height={200} data={salesOverviewData}>
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="sales" fill="#8884d8" />
//         </BarChart>
//       </div>

//       {/* Revenue Breakdown */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
//         <PieChart width={300} height={200}>
//           <Pie
//             data={revenueData}
//             cx={150}
//             cy={100}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {revenueData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           {/* <Legend /> */}
//           <Tooltip />
//         </PieChart>
//       </div>

//       {/* Quick Stats */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
//         <ul className="space-y-2">
//           <li className="flex justify-between">
//             <span>Total Revenue</span>
//             <span className="font-bold">${quickStats.totalRevenue.toLocaleString()}</span>
//           </li>
//           <li className="flex justify-between">
//             <span>New Customers</span>
//             <span className="font-bold">{quickStats.newCustomers}</span>
//           </li>
//         </ul>
//       </div>

//       {/* Detailed Report Table */}
//       <div className="bg-white shadow rounded-lg p-6 col-span-3">
//         <h2 className="text-xl font-semibold mb-4">Detailed Report</h2>
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2">Product</th>
//               <th className="p-2 text-right">Sales</th>
//               <th className="p-2 text-right">Revenue</th>
//             </tr>
//           </thead>
//           <tbody>
//             {detailedReport.map((report, index) => (
//               <tr key={index} className="border-t">
//                 <td className="p-2">{report.product}</td>
//                 <td className="p-2 text-right">{report.sales}</td>
//                 <td className="p-2 text-right">{report.revenue}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardSection;



// import React from 'react'; 

// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     PieChart,
//     Pie,
//     Cell,
//     Legend,
//   } from "recharts";



// export default function DashboardSection() {
//     const salesData = [
//         { month: "Jan", sales: 4000 },
//         { month: "Feb", sales: 3000 },
//         { month: "Mar", sales: 5000 },
//         { month: "Apr", sales: 4500 },
//       ];
    
//       const revenueData = [
//         { name: "Product A", value: 400 },
//         { name: "Product B", value: 300 },
//         { name: "Product C", value: 300 },
//       ];
    
//       const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
    
    
//     return (
//         <div className="grid grid-cols-3 gap-6">
//             {/* Sales Overview */}
//             <div className="bg-white shadow rounded-lg p-4">
//               <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
//               <BarChart width={300} height={200} data={salesData}>
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="sales" fill="#8884d8" />
//               </BarChart>
//             </div>

//             {/* Revenue Breakdown */}
//             <div className="bg-white shadow rounded-lg p-4">
//               <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
//               <PieChart width={300} height={200}>
//                 <Pie
//                   data={revenueData}
//                   cx={150}
//                   cy={100}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 //   label
//                 >
//                   {revenueData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Legend />
//                 <Tooltip />
//               </PieChart>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-white shadow rounded-lg p-4">
//               <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
//               <ul className="space-y-2">
//                 <li className="flex justify-between">
//                   <span>Total Revenue</span>
//                   <span className="font-bold">$45,000</span>
//                 </li>
//                 <li className="flex justify-between">
//                   <span>New Customers</span>
//                   <span className="font-bold">123</span>
//                 </li>
//               </ul>
//             </div>
          

//           {/* Detailed Report Table */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Detailed Report</h2>
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-2">Product</th>
//                   <th className="p-2 text-right">Sales</th>
//                   <th className="p-2 text-right">Revenue</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-t">
//                   <td className="p-2">Product A</td>
//                   <td className="p-2 text-right">450</td>
//                   <td className="p-2 text-right">$15,000</td>
//                 </tr>
//                 <tr className="border-t">
//                   <td className="p-2">Product B</td>
//                   <td className="p-2 text-right">350</td>
//                   <td className="p-2 text-right">$12,000</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div></div>
          
//     ); 
// }