import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { DataSource } from "@/interfaces/interfaces";

export const MarketAndCompetitiveService = {
  async fetchMarketingData(): Promise<DataSource[]> {
    const db = getFirestore();
    const q = query(
      collection(db, "dinaggregation"), 
      where("type", "==", "Marketing")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as DataSource));
  },
};


// import { getFirestore, getDocs, collection } from "firebase/firestore";
// import { MarketCompetitiveData } from "@/interfaces/interfaces";

// export const MarketAndCompetitiveService = {
//   async fetchMarketCompetitiveData(): Promise<MarketCompetitiveData[]> {
//     const db = getFirestore();
//     const snapshot = await getDocs(collection(db, "market_competitive"));
//     return snapshot.docs.map((doc) => doc.data()) as MarketCompetitiveData[];
//   },
// };
