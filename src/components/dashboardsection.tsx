import React from 'react'; 

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

export default function DashboardSection() {
    const salesData = [
        { month: "Jan", sales: 4000 },
        { month: "Feb", sales: 3000 },
        { month: "Mar", sales: 5000 },
        { month: "Apr", sales: 4500 },
      ];
    
      const revenueData = [
        { name: "Product A", value: 400 },
        { name: "Product B", value: 300 },
        { name: "Product C", value: 300 },
      ];
    
      const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
    
    
    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Sales Overview */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
              <BarChart width={300} height={200} data={salesData}>
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
                //   label
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>

            {/* Quick Stats */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Total Revenue</span>
                  <span className="font-bold">$45,000</span>
                </li>
                <li className="flex justify-between">
                  <span>New Customers</span>
                  <span className="font-bold">123</span>
                </li>
              </ul>
            </div>
          

          {/* Detailed Report Table */}
          <div className="bg-white shadow rounded-lg p-6">
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
                <tr className="border-t">
                  <td className="p-2">Product A</td>
                  <td className="p-2 text-right">450</td>
                  <td className="p-2 text-right">$15,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Product B</td>
                  <td className="p-2 text-right">350</td>
                  <td className="p-2 text-right">$12,000</td>
                </tr>
              </tbody>
            </table>
          </div></div>
          
    ); 
}