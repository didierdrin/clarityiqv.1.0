import { getFirestore, getDocs, collection } from "firebase/firestore";

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

export const DashboardService = {
  async fetchSalesData() {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, "dinaggregation"));
    const data = snapshot.docs
      .map(doc => doc.data())
      .filter(item => item.type === "Sales"); // Filter only sales data
    return data;
  },

  processSalesData(data: any[]) {
    // 1. Sales Overview Data
    const monthlySales = data.reduce((acc: any, item: any) => {
      const date = new Date(item.lastSyncedDate);
      const month = date.toLocaleString("default", { month: "short" });

      acc[month] = (acc[month] || 0) + item.departmentData.saleAmount;
      return acc;
    }, {});
    const salesOverviewData: SalesOverviewData[] = Object.keys(monthlySales).map(month => ({
      month,
      sales: monthlySales[month],
    }));

    // 2. Revenue Breakdown
    const revenueBreakdown = data.reduce((acc: any, item: any) => {
      const product = item.departmentData.productPurchased;
      acc[product] = (acc[product] || 0) + item.departmentData.saleAmount;
      return acc;
    }, {});
    const revenueData: RevenueData[] = Object.keys(revenueBreakdown).map(product => ({
      name: product,
      value: revenueBreakdown[product],
    }));

    // 3. Quick Stats
    const totalRevenue = data.reduce(
      (sum: number, item: any) => sum + item.departmentData.saleAmount,
      0
    );
    const newCustomers = data.length; // Example: each record represents a new customer
    const quickStats: QuickStats = { totalRevenue, newCustomers };

    // 4. Detailed Report
    const detailedReport: DetailedReport[] = data.map(item => ({
      product: item.departmentData.productPurchased,
      sales: item.departmentData.saleAmount,
      revenue: `$${item.departmentData.saleAmount.toLocaleString()}`,
    }));

    return { salesOverviewData, revenueData, quickStats, detailedReport };
  },
};


