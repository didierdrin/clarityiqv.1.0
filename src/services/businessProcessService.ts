import { getFirestore, getDocs, collection } from "firebase/firestore";
import { BusinessProcessData } from "@/interfaces/interfaces";

export const BusinessProcessService = {
  async fetchBusinessProcessData(): Promise<BusinessProcessData[]> {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, "business_process"));
    return snapshot.docs.map((doc) => doc.data()) as BusinessProcessData[];
  },
};
