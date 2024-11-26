import { getFirestore, getDocs, collection } from "firebase/firestore";
import { DecisionSupportData } from "@/interfaces/interfaces";

export const DecisionSupportService = {
  async fetchDecisionSupportData(): Promise<DecisionSupportData[]> {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, "decision_support"));
    return snapshot.docs.map((doc) => doc.data()) as DecisionSupportData[];
  },
};
