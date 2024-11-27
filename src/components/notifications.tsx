import React, { useState, useEffect } from "react";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../firebase";
import { DinaggregationService } from "@/services/dinaggregationService";
import { DataSource } from "@/interfaces/interfaces";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const dinaggregationRef = collection(db, "dinaggregation");

    // Firestore listener for real-time updates
    const unsubscribe = onSnapshot(dinaggregationRef, (snapshot) => {
      const updatedNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DataSource[];
      setNotifications(updatedNotifications);
      setIsLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="text-3xl font-bold text-green-600">Notifications</div>
      </div>

      <div className="mt-6 bg-white shadow rounded-md p-4">
        {isLoading ? (
          <div>Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div>No notifications yet.</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="w-full flex justify-between items-center hover:bg-slate-200 cursor-pointer font-medium py-2 px-2 border-b last:border-b-0"
            >
              <span>{notification.name || "Unnamed Notification"}</span>
              <span>
      {notification.recordedAt
        ? new Date(notification.recordedAt).toLocaleString()
        : "Date not available"}
    </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;




// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   onSnapshot,
//   collection,
//   addDoc,
//   writeBatch,
//   doc,
// } from "firebase/firestore";
// import { Dialog } from "@headlessui/react";
// // import { DinaggregationService } from "@/services/dinaggregationService";
// import { firestore } from "../../firebase";
// import {
//   DataSource,
//   DashboardData,
//   BusinessProcessData,
//   CustomerInsightsData,
//   FinancialPerformanceData,
//   MarketCompetitiveData,
//   RiskManagementData,
//   DecisionSupportData,
// } from "@/interfaces/interfaces";

// const Notifications: React.FC = () => {
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6 gap-4">
//         <div className="text-3xl font-bold text-green-600">Notifications</div>
//       </div>

//       <div className="mt-6 bg-white shadow rounded-md p-4">
//         <div className="w-full flex font-bold py-2">
//           <span>New upload</span>
//           <span>03/10/2024</span>
//         </div>
       
//       </div>

   
//     </div>
//   );
// };

// export default Notifications;
