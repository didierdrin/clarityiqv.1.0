import { FieldValue, Timestamp } from 'firebase/firestore';

// Represents a single data source
export interface DataSource {
  id: string;            // Unique identifier for data source
  name: string;          // Name of data source (e.g., "Sales System", "CRM")
  type: string;          // Type of data (Sales, Finance, Marketing, etc.)
  status: 'Active' | 'Inactive' | 'Pending'; // Operational status
  lastSyncedDate: Timestamp; // Last synchronization timestamp
  syncFrequency: 'Hourly' | 'Daily' | 'Weekly' | 'Monthly'; // Frequency of data sync
  dataQualityScore: number; // Percentage of data completeness and accuracy
  recordsProcessed?: number; // Optional: Total records processed during sync
  errorCount?: number;       // Optional: Number of errors encountered
  startTime: FieldValue | Timestamp; // Sync operation start time (server-generated or local)
  endTime: FieldValue | Timestamp;   // Sync operation end time (server-generated or local)
}

// Represents metrics calculated from multiple data sources
export interface DataIntegrationMetrics {
  totalDataSources: number;       // Total number of data sources
  activeSources: number;          // Number of active sources
  inactiveSources: number;        // Number of inactive sources
  totalRecordsProcessed: number;  // Total records processed across all sources
  dataIntegrityRate: number;      // Percentage of data integrity
  lastFullSyncTimestamp: Timestamp; // Timestamp of the most recent full sync
  averageSyncTime: number;        // Average time taken for synchronization
}

// Represents the status of a data synchronization process
export interface SyncStatus {
  sourceId: string;               // ID of the data source being synced
  status: 'Completed' | 'In Progress' | 'Failed'; // Sync operation status
  startTime: Timestamp | FieldValue;           // Timestamp of when the sync started
  endTime: Timestamp | FieldValue;             // Timestamp of when the sync ended
  recordsProcessed: number;       // Total number of records processed
  errorCount: number;             // Number of errors encountered during sync
  errorDetails?: string[];        // Optional: List of error messages/details
}

// Filters applied when querying data sources
export interface DataSourceFilter {
  type?: string;                  // Optional: Filter by type of data source
  status?: 'Active' | 'Inactive' | 'Pending'; // Optional: Filter by operational status
  minQualityScore?: number;       // Optional: Filter by minimum data quality score
}



// import { FieldValue, Timestamp } from 'firebase/firestore';

// export interface DataSource {
//   id: string;            // Unique identifier for data source
//   name: string;          // Name of data source (e.g., "Sales System", "CRM")
//   type: string;          // Type of data (Sales, Finance, Marketing, etc.)
//   status: 'Active' | 'Inactive' | 'Pending';
//   lastSyncedDate: Timestamp;
//   syncFrequency: 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';
//   dataQualityScore: number; // Percentage of data completeness and accuracy
//   recordsProcessed?: number;
//   errorCount?: number;
//   startTime: FieldValue | Timestamp; 
//   endTime: FieldValue | Timestamp; 
// }

// export interface DataIntegrationMetrics {
//   totalDataSources: number;
//   activeSources: number;
//   inactiveSources: number;
//   totalRecordsProcessed: number;
//   dataIntegrityRate: number;
//   lastFullSyncTimestamp: Timestamp;
//   averageSyncTime: number;
// }

// export interface SyncStatus {
//   sourceId: string;
//   status: 'Completed' | 'In Progress' | 'Failed';
//   startTime: Timestamp;
//   endTime: Timestamp;
//   recordsProcessed: number;
//   errorCount: number;
//   errorDetails?: string[];
// }

// export interface DataSourceFilter {
//   type?: string;
//   status?: 'Active' | 'Inactive' | 'Pending';
//   minQualityScore?: number;
// }