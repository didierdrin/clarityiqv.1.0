import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
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
};



// import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
// import { DataSource } from "@/interfaces/interfaces";

// export const DinaggregationService = {
//   async addDataSource(data: DataSource) {
//     const db = getFirestore();
//     await addDoc(collection(db, "dinaggregation"), {
//       ...data,
//       recordedAt: new Date().toISOString(), // Ensure timestamp is added
//     });
//   },

//   async fetchDataSources(): Promise<DataSource[]> {
//     const db = getFirestore();
//     const snapshot = await getDocs(collection(db, "dinaggregation"));
//     return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as DataSource));
//   },
// };


// import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
// import { DataSource } from "@/interfaces/interfaces";

// export const DinaggregationService = {
//   async addDataSource(data: DataSource) {
//     const db = getFirestore();
//     await addDoc(collection(db, "dinaggregation"), data);
//   },

//   async fetchDataSources(): Promise<DataSource[]> {
//     const db = getFirestore();
//     const snapshot = await getDocs(collection(db, "dinaggregation"));
//     return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as DataSource));
//   },
// };