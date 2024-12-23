import React, { useState, useEffect } from "react";
import { RiskIdentificationService } from "@/services/riskIdentificationService";
import { RiskManagementData } from "@/interfaces/interfaces";

const RiskIdentification: React.FC = () => {
  const [riskData, setRiskData] = useState<RiskManagementData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const data = await RiskIdentificationService.fetchRiskManagementData();
        setRiskData(data[0]); // Assuming first document contains risk data
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching risk data:", err);
        setError("Failed to fetch risk data");
        setIsLoading(false);
      }
    };

    fetchRiskData();
  }, []);

  // Risk scoring and mitigation strategy generator
  const generateRiskStrategy = (likelihood: number, impact: number) => {
    const riskScore = likelihood * impact;
    let strategy = "";

    if (riskScore <= 3) {
      strategy = "Monitor and maintain current controls";
    } else if (riskScore <= 6) {
      strategy = "Develop additional preventive measures";
    } else if (riskScore <= 9) {
      strategy = "Implement robust risk mitigation plans";
    } else {
      strategy = "Immediate and comprehensive risk intervention required";
    }

    return { riskScore, strategy };
  };

  if (isLoading) {
    return <div>Loading risk data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 rounded-lg flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Risk Identification & Management
          </h1>
          <div className="flex items-center space-x-4">
            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Report
            </button> */}
            {/* <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-200">
              Export
            </button> */}
          </div>
        </header>

        {/* Table */}
        <section className="mt-6 bg-white shadow-md rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                {["Risk Category", "Risk Description", "Likelihood", "Impact", "Risk Score", "Mitigation Strategy"].map((header) => (
                  <th key={header} className="p-4 text-left text-sm text-gray-700 border-b">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riskData?.risks.map((risk, index) => {
                const { riskScore, strategy } = generateRiskStrategy(risk.likelihood, risk.impact);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-800">{risk.category}</td>
                    <td className="p-4 text-gray-800">{risk.description}</td>
                    <td className="p-4 text-gray-800">{risk.likelihood}</td>
                    <td className="p-4 text-gray-800">{risk.impact}</td>
                    <td className="p-4 text-gray-800">{riskScore}</td>
                    <td className="p-4 text-gray-800">{strategy}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Pagination */}
        {/* <footer className="mt-6 flex justify-end space-x-2">
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Prev
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            1
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            2
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </button>
        </footer> */}
      </main>
    </div>
  );
};

export default RiskIdentification;


