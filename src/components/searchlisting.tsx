import React from "react";
import { DinaggregationService } from "@/services/dinaggregationService";

const SearchListing: React.FC<{ searchResults: any[] }> = ({ searchResults }) => {
  
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
        <div className="text-3xl font-bold text-green-600">Search Results</div>
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
        {searchResults.length > 0 ? (
          searchResults.map((source) => (
            <div
              key={source.id}
              className="grid grid-cols-6 py-2 hover:bg-gray-100"
            >
              <span>{source.name}</span>
              <span>{source.type}</span>
              <span>{source.status}</span>
              <span>{source.syncFrequency}</span>
              <span>{source.lastSyncedDate}</span>
              <button onClick={() => handleDeleteDataSource(source.id!)} className="text-red-500">Delete</button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchListing;

