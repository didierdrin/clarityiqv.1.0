import { getFirestore, getDocs, collection } from "firebase/firestore";
import { FinancialPerformanceData } from "@/interfaces/interfaces";

export const FinancialPerformanceService = {
  async fetchFinancialPerformanceData(): Promise<FinancialPerformanceData[]> {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, "financial_performance"));
    return snapshot.docs.map((doc) => doc.data()) as FinancialPerformanceData[];
  },
};
