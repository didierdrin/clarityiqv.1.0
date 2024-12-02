import { getFirestore, query, where, getDocs, collection } from "firebase/firestore";
import { CustomerInsightsData, DataSource } from "@/interfaces/interfaces";

export const CustomerInsightsService = {
  async fetchCustomerInsights(): Promise<CustomerInsightsData> {
    const db = getFirestore();
    
    // Query for data sources of type "Customer Service"
    const q = query(collection(db, "dinaggregation"), where("type", "==", "Customer Service"));
    const snapshot = await getDocs(q);
    
    // Extract customer service data
    const customerServiceData = snapshot.docs.map(doc => doc.data() as DataSource);
    
    // Calculate insights based on actual data
    const customerSegments = this.processCustomerServiceData(customerServiceData);

    return { customerSegments };
  },

  processCustomerServiceData(data: DataSource[]): CustomerInsightsData['customerSegments'] {
    // Categorize tickets based on resolution time
    const categorizeTicket = (resolutionTime: number, dataQualityScore: number) => {
      if (resolutionTime <= 1 && dataQualityScore >= 90) return "High Value";
      if (resolutionTime <= 2 && dataQualityScore >= 80) return "Medium Value";
      if (resolutionTime <= 3 && dataQualityScore >= 70) return "Low Value";
      return "New Customers";
    };

    // Group and aggregate data
    const segmentGroups = {
      "High Value": { count: 0, totalResolutionTime: 0, totalDataQualityScore: 0 },
      "Medium Value": { count: 0, totalResolutionTime: 0, totalDataQualityScore: 0 },
      "Low Value": { count: 0, totalResolutionTime: 0, totalDataQualityScore: 0 },
      "New Customers": { count: 0, totalResolutionTime: 0, totalDataQualityScore: 0 }
    };

    // Process each data point
    data.forEach(item => {
      const resolutionTime = item.departmentData?.resolutionTime || 0;
      const dataQualityScore = item.dataQualityScore || 0;
      const segment = categorizeTicket(resolutionTime, dataQualityScore);

      segmentGroups[segment].count++;
      segmentGroups[segment].totalResolutionTime += resolutionTime;
      segmentGroups[segment].totalDataQualityScore += dataQualityScore;
    });

    // Map to customer insights format with calculated values
    return [
      {
        name: "High Value",
        avgPurchaseValue: this.calculateAvgValue(segmentGroups["High Value"], 'resolution'),
        numCustomers: segmentGroups["High Value"].count,
        lifetimeValue: this.calculateAvgValue(segmentGroups["High Value"], 'dataQuality')
      },
      {
        name: "Medium Value",
        avgPurchaseValue: this.calculateAvgValue(segmentGroups["Medium Value"], 'resolution'),
        numCustomers: segmentGroups["Medium Value"].count,
        lifetimeValue: this.calculateAvgValue(segmentGroups["Medium Value"], 'dataQuality')
      },
      {
        name: "Low Value",
        avgPurchaseValue: this.calculateAvgValue(segmentGroups["Low Value"], 'resolution'),
        numCustomers: segmentGroups["Low Value"].count,
        lifetimeValue: this.calculateAvgValue(segmentGroups["Low Value"], 'dataQuality')
      },
      {
        name: "New Customers",
        avgPurchaseValue: this.calculateAvgValue(segmentGroups["New Customers"], 'resolution'),
        numCustomers: segmentGroups["New Customers"].count,
        lifetimeValue: this.calculateAvgValue(segmentGroups["New Customers"], 'dataQuality')
      }
    ];
  },

  calculateAvgValue(
    group: { 
      count: number; 
      totalResolutionTime: number; 
      totalDataQualityScore: number 
    }, 
    type: 'resolution' | 'dataQuality'
  ): number {
    if (group.count === 0) return 0;
    
    if (type === 'resolution') {
      // Calculate average based on resolution time, scaled to represent purchase value
      const avgResolutionTime = group.totalResolutionTime / group.count;
      return Math.round(avgResolutionTime * 1000);
    } else {
      // Calculate average data quality score
      const avgDataQualityScore = group.totalDataQualityScore / group.count;
      return Math.round(avgDataQualityScore);
    }
  }
};


