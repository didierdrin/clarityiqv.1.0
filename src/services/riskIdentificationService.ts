import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { RiskManagementData, DataSource } from "@/interfaces/interfaces";

export const RiskIdentificationService = {
  async fetchRiskManagementData(): Promise<RiskManagementData[]> {
    const db = getFirestore();
    
    // Query for risk management related data sources
    const q = query(
      collection(db, "dinaggregation"), 
      where("type", "in", ["Operations", "Finance", "Sales"])
    );

    const snapshot = await getDocs(q);
    
    // Transform data sources into risk management data
    const riskData: RiskManagementData[] = snapshot.docs.map((doc) => {
      const data = doc.data() as DataSource;
      
      // Generate risks based on different data source types
      const risks = [];
      
      switch (data.type) {
        case "Operations":
          risks.push({
            category: "Operational Risk",
            description: `Inventory management for ${data.name}`,
            likelihood: Math.ceil(Math.random() * 5),
            impact: Math.ceil(Math.random() * 5),
            score: 0 // Will be calculated in component
          });
          break;
        
        case "Finance":
          risks.push({
            category: "Financial Risk",
            description: `Financial tracking for ${data.name}`,
            likelihood: Math.ceil(Math.random() * 5),
            impact: Math.ceil(Math.random() * 5),
            score: 0 // Will be calculated in component
          });
          break;
        
        case "Sales":
          risks.push({
            category: "Sales Risk",
            description: `Sales channel risk for ${data.name}`,
            likelihood: Math.ceil(Math.random() * 5),
            impact: Math.ceil(Math.random() * 5),
            score: 0 // Will be calculated in component
          });
          break;
      }
      
      return { risks };
    });

    return riskData;
  },
};


