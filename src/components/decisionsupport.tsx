import React, { useState, useEffect } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const StrategicInitiatives: React.FC = () => {
  const [initiatives, setInitiatives] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        setIsLoading(true);
        const db = getFirestore();
        const snapshot = await getDocs(collection(db, "dinaggregation"));

        const data = snapshot.docs.map(doc => doc.data());
        const processedInitiatives = processInitiatives(data);
        setInitiatives(processedInitiatives);
      } catch (err) {
        setError("Failed to fetch strategic initiatives");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  const processInitiatives = (data: any[]) => {
    return data.map(item => ({
      initiative: item.name,
      startDate: item.lastSyncedDate || "N/A",
      endDate: calculateEndDate(item.syncFrequency, item.lastSyncedDate),
      status: item.status,
      description: generateDescription(item.type, item.dataQualityScore),
    }));
  };

  const calculateEndDate = (syncFrequency: string, startDate: string | undefined) => {
    if (!startDate) return "N/A";

    const start = new Date(startDate);
    switch (syncFrequency) {
      case "Daily":
        start.setDate(start.getDate() + 7);
        break;
      case "Weekly":
        start.setDate(start.getDate() + 30);
        break;
      case "Monthly":
        start.setMonth(start.getMonth() + 6);
        break;
      default:
        return "N/A";
    }
    return start.toISOString().split("T")[0];
  };

  const generateDescription = (type: string, dataQualityScore: number) => {
    const benefits = {
      Sales: `Increase revenue and optimize customer acquisition strategies. Data quality: ${dataQualityScore}%.`,
      Finance: `Streamline financial processes and improve budget tracking. Data quality: ${dataQualityScore}%.`,
      Marketing: `Enhance brand visibility and campaign ROI. Data quality: ${dataQualityScore}%.`,
      Operations: `Optimize supply chain and improve inventory management. Data quality: ${dataQualityScore}%.`,
      "Customer Service": `Improve customer satisfaction and reduce resolution time. Data quality: ${dataQualityScore}%.`,
    };
    return benefits[type as keyof typeof benefits] || "General strategic initiative.";
  };

  const totalPages = Math.ceil(initiatives.length / itemsPerPage); // Total number of pages

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = initiatives.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Data for the current page

  if (isLoading) {
    return <div className="p-4">Loading Strategic Initiatives...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col bg-white">
        <div className="p-4 shadow-md flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-700">Strategic Initiatives</h1>
          
        </div>

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
              {currentData.map((initiative, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-2">{initiative.initiative}</td>
                  <td className="p-2">{initiative.startDate}</td>
                  <td className="p-2">{initiative.endDate}</td>
                  <td className="p-2">{initiative.status}</td>
                  <td className="p-2">{initiative.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicInitiatives;

