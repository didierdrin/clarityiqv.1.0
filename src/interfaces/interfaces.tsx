

export interface DataSource {
    id?: string;
    name: string;
    type: "Sales" | "Finance" | "Marketing" | "Operations" | "Customer Service";
    status: "Active" | "Inactive" | "Pending";
    lastSyncedDate?: string;
    syncFrequency: "Daily" | "Weekly" | "Monthly";
    dataQualityScore: number;
    departmentData?: Record<string, any>; // Flexible object for department-specific data
    recordedAt?: string; // Timestamp of record creation
  }
  
  export interface DashboardData {
    salesData: { name: string; value: number }[];
    revenueData: { name: string; value: number }[];
    totalRevenue: number;
    newCustomers: number;
  }
  
  export interface BusinessProcessData {
    processVisualization: { name: string; value: number; unit: string };
    optimizationRecommendations: { name: string; value: number }[];
    performanceIssues: { name: string; value: number };
  }
  
  export interface CustomerInsightsData {
    customerSegments: { name: string; avgPurchaseValue: number; numCustomers: number; lifetimeValue: number }[];
  }
  
  export interface FinancialPerformanceData {
    metricsOverview: { name: string; value: number }[];
  }
  
  export interface MarketCompetitiveData {
    marketAnalysis: { name: string; value: number | string }[];
  }
  
  export interface RiskManagementData {
    risks: { category: string; description: string; likelihood: number; impact: number; score: number }[];
  }
  
  export interface DecisionSupportData {
    initiatives: { name: string; startDate: string; endDate: string; status: string; description: string }[];
  }
  