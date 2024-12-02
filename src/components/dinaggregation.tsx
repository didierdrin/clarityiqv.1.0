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


  const handleDeleteDataSource = async (id: string) => {
    try {
      // Optional: Add a confirmation dialog
      const confirmDelete = window.confirm("Are you sure you want to delete this data source?");
      
      if (confirmDelete) {
        await DinaggregationService.deleteDataSource(id);
        // The real-time listener (onSnapshot) will automatically update the UI
      }
    } catch (error) {
      console.error("Error deleting data source:", error);
      // Optional: Add error notification
      alert("Failed to delete data source. Please try again.");
    }
  };
  

  return (
    <div>
      
      <div className="flex items-center justify-between mb-6 gap-4">
      <div className="text-3xl font-bold text-green-600">Data Integration and Aggregation</div>
        
              <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center bg-white border border-purple-500 text-purple-500 px-4 py-2  mr-9 rounded-md"
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
            <button onClick={() => handleDeleteDataSource(source.id!)} className="text-red-500">Delete</button>
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


