import React, { useState, useEffect } from "react";
import {
  getFirestore,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";
import { app } from "../../firebase"; // Ensure Firebase is configured
import { Dialog } from "@headlessui/react";

const Dinaggregation: React.FC = () => {
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "Active",
    syncFrequency: "Daily",
    dataQualityScore: 0,
  });
  const firestore = getFirestore(app);

  // Real-time listener for data sources
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "dinaggregation"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataSources(data);
      },
      (error) => console.error("Error fetching data:", error)
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [firestore]);

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding a new data source
  const handleAddDataSource = async () => {
    try {
      await addDoc(collection(firestore, "dinaggregation"), {
        ...formData,
        lastSyncedDate: new Date().toISOString(),
      });
      setFormData({
        name: "",
        type: "",
        status: "Active",
        syncFrequency: "Daily",
        dataQualityScore: 0,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding data source:", error);
    }
  };

  return (
    <div className="relative top-0 left-0">
      {/* Page Title */}
      <div className="text-3xl font-bold text-green-600 mb-8">
        Data Integration and Aggregation
      </div>

      {/* Search and Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Search Box */}
        <div className="relative flex items-center bg-white border border-gray-300 rounded-md w-80 h-10 px-4">
          <svg
            className="absolute left-3 w-4 h-4 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm6.293-4.707a7 7 0 10-1.414 1.414l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 text-sm text-gray-700 outline-none"
          />
        </div>

        {/* Action Buttons */}
        <button className="flex items-center justify-center bg-white border border-gray-400 text-gray-600 px-4 py-2 rounded-md">
          Category
          <svg
            className="ml-2 w-4 h-4 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.879a1 1 0 011.414 1.414l-4 4.5a1 1 0 01-1.414 0l-4-4.5a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button className="flex items-center justify-center bg-white border border-gray-400 text-gray-600 px-4 py-2 rounded-md">
          Filter
          <svg
            className="ml-2 w-4 h-4 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011.7-.7l3 3a1 1 0 01-.3.7v9.6a1 1 0 001.4.9h.6a1 1 0 00.7-.3l3-3a1 1 0 01.7-.3h9.6a1 1 0 01.9 1.4v.6a1 1 0 00-.3.7l-3 3a1 1 0 01-.7.3H3a1 1 0 01-1-1V3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center bg-white border border-purple-500 text-purple-500 px-4 py-2 rounded-md"
        >
          Import
          <svg
            className="ml-2 w-4 h-4 text-purple-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.707 12.293a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 9.586V3a1 1 0 112 0v6.586l1.293-1.293a1 1 0 011.414 1.414l-3 3z"></path>
            <path d="M4 13a1 1 0 011 1v1a1 1 0 001 1h8a1 1 0 001-1v-1a1 1 0 112 0v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1a1 1 0 011-1z"></path>
          </svg>
        </button>
        <button className="flex items-center justify-center bg-white border border-purple-500 text-purple-500 px-4 py-2 rounded-md">
          Export
          <svg
            className="ml-2 w-4 h-4 text-purple-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M7 13a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 11-2 0v-2H9v2a1 1 0 01-2 0v-3z"></path>
            <path d="M10 4.293l1.293 1.293a1 1 0 011.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L9 4.293V12a1 1 0 102 0V4.293z"></path>
          </svg>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md mt-6 p-4">
        <div className="grid grid-cols-6 items-center text-gray-800 font-medium text-sm py-2 px-2">
          <span>Name</span>
          <span>Type</span>
          <span>Status</span>
          <span className="text-center">Sync Frequency</span>
          <span className="text-center">Last Synced Date</span>
          <span className="text-center">Action</span>
        </div>
        <div className="divide-y divide-gray-200">
          {dataSources.map((source) => (
            <div
              key={source.id}
              className="grid grid-cols-6 items-center text-gray-700 text-sm py-3 px-2 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <span>{source.name}</span>
              <span>{source.type}</span>
              <span
                className={
                  source.status === "Active" ? "text-green-500" : "text-red-500"
                }
              >
                {source.status}
              </span>
              <span className="text-center">{source.syncFrequency}</span>
              <span>2024-06-26 10:30 AM</span>
              <div className="flex justify-center gap-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 8a1 1 0 012 0v8a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v8a1 1 0 11-2 0V8z"></path>
                    <path
                      fillRule="evenodd"
                      d="M5 3a3 3 0 013-3h4a3 3 0 013 3v1h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v1H5V3zM7 3a1 1 0 011-1h4a1 1 0 011 1v1H7V3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a3 3 0 013-3h6a3 3 0 013 3v1h-2V3a1 1 0 00-1-1H7a1 1 0 00-1 1v1H4V3zm0 14a1 1 0 011-1h10a1 1 0 011 1v1H4v-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding Data */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50 text-black bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-md shadow-lg p-6 w-1/3">
          <h3 className="text-xl font-bold mb-4">Add New Data Source</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Data Source Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            <select
              name="syncFrequency"
              value={formData.syncFrequency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <input
              type="number"
              name="dataQualityScore"
              placeholder="Data Quality Score"
              value={formData.dataQualityScore}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleAddDataSource}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Dinaggregation;

// import React from "react";

// const Dinaggregation = () => {
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
//         <button className="flex items-center justify-center bg-white border border-purple-500 text-purple-500 px-4 py-2 rounded-md">
//           Import
//           <svg
//             className="ml-2 w-4 h-4 text-purple-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               d="M10.707 12.293a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 9.586V3a1 1 0 112 0v6.586l1.293-1.293a1 1 0 011.414 1.414l-3 3z"
//             ></path>
//             <path
//               d="M4 13a1 1 0 011 1v1a1 1 0 001 1h8a1 1 0 001-1v-1a1 1 0 112 0v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1a1 1 0 011-1z"
//             ></path>
//           </svg>
//         </button>
//         <button className="flex items-center justify-center bg-white border border-purple-500 text-purple-500 px-4 py-2 rounded-md">
//           Export
//           <svg
//             className="ml-2 w-4 h-4 text-purple-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               d="M7 13a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 11-2 0v-2H9v2a1 1 0 01-2 0v-3z"
//             ></path>
//             <path
//               d="M10 4.293l1.293 1.293a1 1 0 011.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L9 4.293V12a1 1 0 102 0V4.293z"
//             ></path>
//           </svg>
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-md mt-6 p-4">
//         <div className="grid grid-cols-4 items-center text-gray-800 font-medium text-sm py-2">
//           <span>Status</span>
//           <span>Type</span>
//           <span>Last Synced Date</span>
//           <span className="text-center">Action</span>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="grid grid-cols-4 items-center text-gray-700 text-sm py-3"
//             >
//               <span className="text-green-500">Active</span>
//               <span>Sales</span>
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
//     </div>
//   );
// };

// export default Dinaggregation;
