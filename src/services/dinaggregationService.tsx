import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { DataSource } from "@/interfaces/interfaces";

export const DinaggregationService = {
  async addDataSource(data: DataSource) {
    const db = getFirestore();
    await addDoc(collection(db, "dinaggregation"), {
      ...data,
      recordedAt: new Date().toISOString(),
    });
  },

  async fetchDataSources(): Promise<DataSource[]> {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, "dinaggregation"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as DataSource));
  },

  async deleteDataSource(id: string) {
    const db = getFirestore();
    const docRef = doc(db, "dinaggregation", id);
    await deleteDoc(docRef);
  },

};


