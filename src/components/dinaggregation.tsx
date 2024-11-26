import React, { useState, useEffect } from "react";
import { getFirestore, onSnapshot, collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { Dialog } from "@headlessui/react";
import { DinaggregationService } from "@/services/dinaggregationService";
import { firestore } from "../../firebase"; 
import {
  DataSource,
  DashboardData,
  BusinessProcessData,
  CustomerInsightsData,
  FinancialPerformanceData,
  MarketCompetitiveData,
  RiskManagementData,
  DecisionSupportData,
} from "@/interfaces/interfaces";



const Dinaggregation: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [department, setDepartment] = useState<string>("Sales");
  const [formData, setFormData] = useState<Partial<DataSource>>({
    name: "",
    type: "Sales",
    status: "Active",
    syncFrequency: "Daily",
    dataQualityScore: 0,
    lastSyncedDate: new Date().toISOString().split('T')[0],
  });

  // Department-specific form state
  const [departmentSpecificData, setDepartmentSpecificData] = useState<any>({});

  const [isClient, setIsClient] = useState(false);

  // Fetch data sources in real-time
  useEffect(() => {
    setIsClient(true);
    const unsubscribe = onSnapshot(
      collection(firestore, "dinaggregation"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DataSource[];
        setDataSources(data);
      },
      (error) => console.error("Error fetching data:", error)
    );

    return () => unsubscribe();
  }, [firestore]);

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle department-specific input changes
  const handleDepartmentSpecificChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepartmentSpecificData({ ...departmentSpecificData, [name]: value });
  };

  // Add new data source to Firestore
  const handleAddDataSource = async () => {
    try {
      // Combine general and department-specific data
      const completeData = {
        ...formData,
        departmentData: departmentSpecificData,
        recordedAt: new Date().toISOString(), // Add timestamp of record
      } as DataSource;

      await DinaggregationService.addDataSource(completeData);
      
      // Reset form data
      setFormData({
        name: "",
        type: "Sales",
        status: "Active",
        syncFrequency: "Daily",
        dataQualityScore: 0,
        lastSyncedDate: new Date().toISOString().split('T')[0],
      });
      setDepartmentSpecificData({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding data source:", error);
    }
  };

  // Render department-specific input fields
  const renderDepartmentFields = () => {
    switch (formData.type) {
      case "Sales":
        return (
          <>
            <div>
              <label className="block text-gray-700">Customer Transaction ID</label>
              <input
                type="text"
                name="customerTransactionId"
                value={departmentSpecificData.customerTransactionId || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Product Purchased</label>
              <input
                type="text"
                name="productPurchased"
                value={departmentSpecificData.productPurchased || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Sale Amount</label>
              <input
                type="number"
                name="saleAmount"
                value={departmentSpecificData.saleAmount || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
          </>
        );
      case "Finance":
        return (
          <>
            <div>
              <label className="block text-gray-700">Revenue Stream</label>
              <input
                type="text"
                name="revenueStream"
                value={departmentSpecificData.revenueStream || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Expense Type</label>
              <input
                type="text"
                name="expenseType"
                value={departmentSpecificData.expenseType || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Invoice Amount</label>
              <input
                type="number"
                name="invoiceAmount"
                value={departmentSpecificData.invoiceAmount || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
          </>
        );
      case "Marketing":
        return (
          <>
            <div>
              <label className="block text-gray-700">Campaign Name</label>
              <input
                type="text"
                name="campaignName"
                value={departmentSpecificData.campaignName || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Ad Spend</label>
              <input
                type="number"
                name="adSpend"
                value={departmentSpecificData.adSpend || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Conversion Rate</label>
              <input
                type="number"
                name="conversionRate"
                value={departmentSpecificData.conversionRate || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
                step="0.1"
              />
            </div>
          </>
        );
      case "Operations":
        return (
          <>
            <div>
              <label className="block text-gray-700">Product ID</label>
              <input
                type="text"
                name="productId"
                value={departmentSpecificData.productId || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={departmentSpecificData.stockQuantity || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Warehouse Location</label>
              <input
                type="text"
                name="warehouseLocation"
                value={departmentSpecificData.warehouseLocation || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
          </>
        );
      case "Customer Service":
        return (
          <>
            <div>
              <label className="block text-gray-700">Ticket ID</label>
              <input
                type="text"
                name="ticketId"
                value={departmentSpecificData.ticketId || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Issue Description</label>
              <input
                type="text"
                name="issueDescription"
                value={departmentSpecificData.issueDescription || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Resolution Time (Hours)</label>
              <input
                type="number"
                name="resolutionTime"
                value={departmentSpecificData.resolutionTime || ""}
                onChange={handleDepartmentSpecificChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };









  

  return (
    <div>
      <div className="text-3xl font-bold text-green-600 mb-8">Data Integration and Aggregation</div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Data Source
        </button>

        {/* <button
  onClick={() => MockDataGenerator.addBulkMockData()}
  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
>
  Add Mock Data
</button> */}

      </div>

      <div className="mt-6 bg-white shadow rounded-md p-4">
        <div className="grid grid-cols-6 font-bold py-2">
          <span>Name</span>
          <span>Type</span>
          <span>Status</span>
          <span>Sync Frequency</span>
          <span>Last Synced Date</span>
          <span>Actions</span>
        </div>
        {dataSources.map((source) => (
          <div key={source.id} className="grid grid-cols-6 py-2 hover:bg-gray-100">
            <span>{source.name}</span>
            <span>{source.type}</span>
            <span>{source.status}</span>
            <span>{source.syncFrequency}</span>
            <span>{source.lastSyncedDate}</span>
            <button className="text-red-500">Delete</button>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className= "fixed inset-0 z-50 overflow-y-auto flex pt-[100px] items-center justify-center text-black">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
        <button 
      onClick={() => setIsModalOpen(false)}
      className="relative top-7 left-[320px] text-gray-600 hover:text-gray-900"
    >
      ✖️ {/* Simple unicode close icon */}
    </button>
          <h3 className="text-xl font-bold mb-4">Add Data Source</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Department</label>
            <select
              name="type"
              value={formData.type || "Sales"}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            >
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Customer Service">Customer Service</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              placeholder="Enter data source name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Sync Frequency</label>
            <select
              name="syncFrequency"
              value={formData.syncFrequency || "Daily"}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="mb-4">
  <label className="block text-gray-700 mb-2">Last Synced Date</label>
  <input
    type="date"
    name="lastSyncedDate"
    value={formData.lastSyncedDate || new Date().toISOString().split('T')[0]}
    onChange={handleInputChange}
    className="border rounded-md p-2 w-full"
  />
</div>

          {/* Department-specific input fields */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">{formData.type} Department Details</h4>
            {renderDepartmentFields()}
          </div>

          <button
            onClick={handleAddDataSource}
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md w-full"
          >
            Save Data Source
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Dinaggregation;



// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   onSnapshot,
//   collection,
//   addDoc,
// } from "firebase/firestore";
// import { app } from "../../firebase"; // Ensure Firebase is configured
// import { Dialog } from "@headlessui/react";

// const Dinaggregation: React.FC = () => {
//   const [dataSources, setDataSources] = useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     status: "Active",
//     syncFrequency: "Daily",
//     dataQualityScore: 0,
//   });
//   const firestore = getFirestore(app);

//   // Real-time listener for data sources
//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(firestore, "dinaggregation"),
//       (snapshot) => {
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setDataSources(data);
//       },
//       (error) => console.error("Error fetching data:", error)
//     );

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, [firestore]);

//   // Handle form input change
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle adding a new data source
//   const handleAddDataSource = async () => {
//     try {
//       await addDoc(collection(firestore, "dinaggregation"), {
//         ...formData,
//         lastSyncedDate: new Date().toISOString(),
//       });
//       setFormData({
//         name: "",
//         type: "",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 0,
//       });
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error adding data source:", error);
//     }
//   };

//   return (
//     <div className="relative top-0 left-0">
//       {/* Page Title */}
//       <div className="text-3xl font-bold text-green-600 mb-8">
//         Data Integration and Aggregation
//       </div>

//       {/* Search and Action Buttons */}
//       <div className="flex items-center gap-4">
//         {/* Search Box */}
//         <div className="relative flex items-center bg-white border border-gray-300 rounded-md w-80 h-10 px-4">
//           <svg
//             className="absolute left-3 w-4 h-4 text-gray-600"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm6.293-4.707a7 7 0 10-1.414 1.414l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707z"></path>
//           </svg>
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full pl-8 text-sm text-gray-700 outline-none"
//           />
//         </div>

//         {/* Action Buttons */}
//         <button className="flex items-center justify-center bg-white border border-gray-400 text-gray-600 px-4 py-2 rounded-md">
//           Category
//           <svg
//             className="ml-2 w-4 h-4 text-gray-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.879a1 1 0 011.414 1.414l-4 4.5a1 1 0 01-1.414 0l-4-4.5a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//         </button>
//         <button className="flex items-center justify-center bg-white border border-gray-400 text-gray-600 px-4 py-2 rounded-md">
//           Filter
//           <svg
//             className="ml-2 w-4 h-4 text-gray-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M3 3a1 1 0 011.7-.7l3 3a1 1 0 01-.3.7v9.6a1 1 0 001.4.9h.6a1 1 0 00.7-.3l3-3a1 1 0 01.7-.3h9.6a1 1 0 01.9 1.4v.6a1 1 0 00-.3.7l-3 3a1 1 0 01-.7.3H3a1 1 0 01-1-1V3z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//         </button>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center justify-center bg-white border border-purple-500 text-purple-500 px-4 py-2 rounded-md"
//         >
//           Import
//           <svg
//             className="ml-2 w-4 h-4 text-purple-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M10.707 12.293a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 9.586V3a1 1 0 112 0v6.586l1.293-1.293a1 1 0 011.414 1.414l-3 3z"></path>
//             <path d="M4 13a1 1 0 011 1v1a1 1 0 001 1h8a1 1 0 001-1v-1a1 1 0 112 0v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1a1 1 0 011-1z"></path>
//           </svg>
//         </button>
//         <button className="flex items-center justify-center bg-white border border-purple-500 text-purple-500 px-4 py-2 rounded-md">
//           Export
//           <svg
//             className="ml-2 w-4 h-4 text-purple-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M7 13a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 11-2 0v-2H9v2a1 1 0 01-2 0v-3z"></path>
//             <path d="M10 4.293l1.293 1.293a1 1 0 011.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L9 4.293V12a1 1 0 102 0V4.293z"></path>
//           </svg>
//         </button>
//       </div>

//       {/* Data Table */}
//       <div className="bg-white rounded-lg shadow-md mt-6 p-4">
//         <div className="grid grid-cols-6 items-center text-gray-800 font-medium text-sm py-2 px-2">
//           <span>Name</span>
//           <span>Type</span>
//           <span>Status</span>
//           <span className="text-center">Sync Frequency</span>
//           <span className="text-center">Last Synced Date</span>
//           <span className="text-center">Action</span>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {dataSources.map((source) => (
//             <div
//               key={source.id}
//               className="grid grid-cols-6 items-center text-gray-700 text-sm py-3 px-2 rounded-md hover:bg-slate-200 cursor-pointer"
//             >
//               <span>{source.name}</span>
//               <span>{source.type}</span>
//               <span
//                 className={
//                   source.status === "Active" ? "text-green-500" : "text-red-500"
//                 }
//               >
//                 {source.status}
//               </span>
//               <span className="text-center">{source.syncFrequency}</span>
//               <span>2024-06-26 10:30 AM</span>
//               <div className="flex justify-center gap-2">
//                 <button className="text-gray-500 hover:text-gray-700">
//                   <svg
//                     className="w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M6 8a1 1 0 012 0v8a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v8a1 1 0 11-2 0V8z"></path>
//                     <path
//                       fillRule="evenodd"
//                       d="M5 3a3 3 0 013-3h4a3 3 0 013 3v1h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v1H5V3zM7 3a1 1 0 011-1h4a1 1 0 011 1v1H7V3z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//                 <button className="text-gray-500 hover:text-gray-700">
//                   <svg
//                     className="w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M4 3a3 3 0 013-3h6a3 3 0 013 3v1h-2V3a1 1 0 00-1-1H7a1 1 0 00-1 1v1H4V3zm0 14a1 1 0 011-1h10a1 1 0 011 1v1H4v-1z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal for Adding Data */}
//       <Dialog
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         className="fixed inset-0 flex items-center justify-center z-50 text-black bg-black bg-opacity-50"
//       >
//         <div className="bg-white rounded-md shadow-lg p-6 w-1/3">
//           <h3 className="text-xl font-bold mb-4">Add New Data Source</h3>
//           <div className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Data Source Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               type="text"
//               name="type"
//               placeholder="Type"
//               value={formData.type}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//               <option value="Pending">Pending</option>
//             </select>
//             <select
//               name="syncFrequency"
//               value={formData.syncFrequency}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="Daily">Daily</option>
//               <option value="Weekly">Weekly</option>
//               <option value="Monthly">Monthly</option>
//             </select>
//             <input
//               type="number"
//               name="dataQualityScore"
//               placeholder="Data Quality Score"
//               value={formData.dataQualityScore}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="px-4 py-2 bg-gray-200 rounded-md mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAddDataSource}
//               className="px-4 py-2 bg-green-500 text-white rounded-md"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default Dinaggregation;






// Mock Data Generation Utility
// export const MockDataGenerator = {
//   generateSalesMockData(): DataSource[] {
//     return [
//       {
//         name: "Online Sales Platform",
//         type: "Sales",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 85,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           customerTransactionId: "SALE-001",
//           productPurchased: "Laptop Pro X1",
//           saleAmount: 1200
//         }
//       },
//       {
//         name: "Retail Store Sales",
//         type: "Sales",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 92,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           customerTransactionId: "SALE-002",
//           productPurchased: "Smart Watch Elite",
//           saleAmount: 250
//         }
//       },
//       {
//         name: "B2B Sales Channel",
//         type: "Sales",
//         status: "Active",
//         syncFrequency: "Weekly",
//         dataQualityScore: 78,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           customerTransactionId: "SALE-003",
//           productPurchased: "Enterprise Server Cluster",
//           saleAmount: 45000
//         }
//       },
//       {
//         name: "International Sales",
//         type: "Sales",
//         status: "Active",
//         syncFrequency: "Monthly",
//         dataQualityScore: 88,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           customerTransactionId: "SALE-004",
//           productPurchased: "Global Distribution Kit",
//           saleAmount: 22000
//         }
//       }
//     ];
//   },

//   generateFinanceMockData(): DataSource[] {
//     return [
//       {
//         name: "Revenue Tracking System",
//         type: "Finance",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 90,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           revenueStream: "Software Licensing",
//           expenseType: "R&D",
//           invoiceAmount: 75000
//         }
//       },
//       {
//         name: "Expense Management",
//         type: "Finance",
//         status: "Active",
//         syncFrequency: "Weekly",
//         dataQualityScore: 85,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           revenueStream: "Consulting Services",
//           expenseType: "Marketing",
//           invoiceAmount: 42000
//         }
//       },
//       {
//         name: "Investment Tracking",
//         type: "Finance",
//         status: "Active",
//         syncFrequency: "Monthly",
//         dataQualityScore: 95,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           revenueStream: "Venture Capital",
//           expenseType: "Administration",
//           invoiceAmount: 150000
//         }
//       },
//       {
//         name: "Financial Reporting",
//         type: "Finance",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 92,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           revenueStream: "Product Sales",
//           expenseType: "Operations",
//           invoiceAmount: 62000
//         }
//       }
//     ];
//   },

//   generateMarketingMockData(): DataSource[] {
//     return [
//       {
//         name: "Digital Marketing Platform",
//         type: "Marketing",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 88,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           campaignName: "Summer Sale Campaign",
//           adSpend: 15000,
//           conversionRate: 4.5
//         }
//       },
//       {
//         name: "Social Media Marketing",
//         type: "Marketing",
//         status: "Active",
//         syncFrequency: "Weekly",
//         dataQualityScore: 82,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           campaignName: "Influencer Collaboration",
//           adSpend: 25000,
//           conversionRate: 3.8
//         }
//       },
//       {
//         name: "Email Marketing System",
//         type: "Marketing",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 90,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           campaignName: "Product Launch Promo",
//           adSpend: 10000,
//           conversionRate: 5.2
//         }
//       },
//       {
//         name: "Content Marketing",
//         type: "Marketing",
//         status: "Active",
//         syncFrequency: "Monthly",
//         dataQualityScore: 85,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           campaignName: "Thought Leadership Series",
//           adSpend: 8000,
//           conversionRate: 2.7
//         }
//       }
//     ];
//   },

//   generateOperationsMockData(): DataSource[] {
//     return [
//       {
//         name: "Inventory Management",
//         type: "Operations",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 95,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           productId: "PROD-001",
//           stockQuantity: 5000,
//           warehouseLocation: "Central Warehouse"
//         }
//       },
//       {
//         name: "Supply Chain Tracking",
//         type: "Operations",
//         status: "Active",
//         syncFrequency: "Weekly",
//         dataQualityScore: 87,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           productId: "PROD-002",
//           stockQuantity: 2500,
//           warehouseLocation: "East Coast Facility"
//         }
//       },
//       {
//         name: "Production Planning",
//         type: "Operations",
//         status: "Active",
//         syncFrequency: "Monthly",
//         dataQualityScore: 92,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           productId: "PROD-003",
//           stockQuantity: 7500,
//           warehouseLocation: "West Coast Hub"
//         }
//       },
//       {
//         name: "Logistics Coordination",
//         type: "Operations",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 89,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           productId: "PROD-004",
//           stockQuantity: 3000,
//           warehouseLocation: "Southern Distribution Center"
//         }
//       }
//     ];
//   },

//   generateCustomerServiceMockData(): DataSource[] {
//     return [
//       {
//         name: "Customer Support Portal",
//         type: "Customer Service",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 90,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           ticketId: "TICKET-001",
//           issueDescription: "Product Performance Inquiry",
//           resolutionTime: 2
//         }
//       },
//       {
//         name: "Technical Support Line",
//         type: "Customer Service",
//         status: "Active",
//         syncFrequency: "Weekly",
//         dataQualityScore: 85,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           ticketId: "TICKET-002",
//           issueDescription: "Software Update Assistance",
//           resolutionTime: 1.5
//         }
//       },
//       {
//         name: "Customer Feedback System",
//         type: "Customer Service",
//         status: "Active",
//         syncFrequency: "Monthly",
//         dataQualityScore: 88,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           ticketId: "TICKET-003",
//           issueDescription: "Product Recommendation",
//           resolutionTime: 3
//         }
//       },
//       {
//         name: "Complaint Resolution Tracker",
//         type: "Customer Service",
//         status: "Active",
//         syncFrequency: "Daily",
//         dataQualityScore: 92,
//         lastSyncedDate: new Date().toISOString(),
//         departmentData: {
//           ticketId: "TICKET-004",
//           issueDescription: "Billing Dispute",
//           resolutionTime: 4
//         }
//       }
//     ];
//   },

//   async addBulkMockData() {
//     const batch = writeBatch(firestore);
//     const dinaggregationRef = collection(firestore, "dinaggregation");

//     const allMockData = [
//       ...this.generateSalesMockData(),
//       ...this.generateFinanceMockData(),
//       ...this.generateMarketingMockData(),
//       ...this.generateOperationsMockData(),
//       ...this.generateCustomerServiceMockData()
//     ];

//     allMockData.forEach((data) => {
//       const docRef = doc(dinaggregationRef);
//       batch.set(docRef, { 
//         ...data, 
//         recordedAt: new Date().toISOString() 
//       });
//     });

//     try {
//       await batch.commit();
//       console.log("Bulk mock data added successfully!");
//     } catch (error) {
//       console.error("Error adding bulk mock data:", error);
//     }
//   }
// };





