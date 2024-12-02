import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DinaggregationService } from "@/services/dinaggregationService";
import Chart from "chart.js/auto";
import jsPDF from 'jspdf';


import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF & { 
      previous: {
        finalY: number;
      };
    };
  }
}



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


  const exportToPDF = useCallback(() => {
    try {
      const doc = new jsPDF();
  
      // Set document title
      doc.setFontSize(18);
      doc.text("Business Process Analysis Report", 14, 22);
  
      // Increase Y position to prevent overlap
      let startY = 30;
  
      // Process Visualization Data Table
      doc.setFontSize(12);
      doc.text("Process Visualization", 14, startY + 20);
      const processTable = doc.autoTable({
        startY: startY + 25,
        head: [['Name', 'Stock Quantity']],
        body: processVisualizationData.map(item => [
          item.name, 
          item.departmentData?.stockQuantity?.toString() || 'N/A'
        ]),
        theme: 'striped'
      });
  
      startY = processTable.previous.finalY;
  
      // Optimization Recommendations Table
      doc.text("Optimization Recommendations", 14, startY + 10);
      const optimizationTable = doc.autoTable({
        startY: startY + 15,
        head: [['Name', 'Conversion Rate']],
        body: optimizationRecommendationsData.map(item => [
          item.name, 
          `${item.departmentData?.conversionRate || 0}%`
        ]),
        theme: 'striped'
      });
  
      startY = optimizationTable.previous.finalY;
  
      // Performance Issues Table
      doc.text("Performance Issues", 14, startY + 10);
      const performanceTable = doc.autoTable({
        startY: startY + 15,
        head: [['Name', 'Resolution Time']],
        body: performanceIssuesData.map(item => [
          item.name, 
          `${item.departmentData?.resolutionTime || 0} hours`
        ]),
        theme: 'striped'
      });
  
      startY = performanceTable.previous.finalY;
  
      // Detailed Process Analysis Table
      doc.text("Detailed Process Analysis", 14, startY + 10);
      doc.autoTable({
        startY: startY + 15,
        head: [['Name', 'Invoice Amount']],
        body: detailedProcessAnalysisData.map(item => [
          item.name, 
          item.departmentData?.invoiceAmount?.toString() || 'N/A'
        ]),
        theme: 'striped'
      });
  
      // Save the PDF
      doc.save("Business_Process_Analysis_Report.pdf");
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please check the console for details.');
    }
  }, [
    processVisualizationData, 
    optimizationRecommendationsData, 
    performanceIssuesData, 
    detailedProcessAnalysisData
  ]);

// Add this method to handle the export
const handleExport = useCallback(() => {
  try {
    if (dataSources.length === 0) {
      alert('No data available to export.');
      return;
    }
    exportToPDF();
    alert('PDF Report Generated Successfully!');
  } catch (error) {
    console.error('Export failed:', error);
    alert('Failed to generate PDF. Please try again.');
  }
}, [exportToPDF, dataSources]);


  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="col-span-12 bg-white shadow-md flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gray-800">Business Process Analysis</h1>
        <div className="flex space-x-4">
          <button onClick={handleExport} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm hover:bg-gray-200">
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
