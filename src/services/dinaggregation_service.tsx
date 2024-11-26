
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Firestore,
  serverTimestamp, 
  FieldValue
} from 'firebase/firestore';

import { 
  DataSource, 
  DataIntegrationMetrics, 
  DataSourceFilter,
  SyncStatus 
} from '@/interfaces/dinaggregation_interface'; 

export class DinaggregationService {
  private firestore: Firestore;
  private dataSourcesCollection: string;

  constructor(firestoreInstance: Firestore) {
    this.firestore = firestoreInstance;
    this.dataSourcesCollection = 'dinaggregation';
  }

  // Calculation Methods
  calculateDataIntegrationMetrics(dataSources: DataSource[]): DataIntegrationMetrics {
    const activeSources = dataSources.filter(source => source.status === 'Active');
    
    return {
      totalDataSources: dataSources.length,
      activeSources: activeSources.length,
      inactiveSources: dataSources.length - activeSources.length,
      totalRecordsProcessed: dataSources.reduce((sum, source) => 
        sum + (source.recordsProcessed || 0), 0),
      dataIntegrityRate: this.calculateDataIntegrityRate(dataSources),
      lastFullSyncTimestamp: this.getLatestSyncTimestamp(dataSources),
      averageSyncTime: this.calculateAverageSyncTime(dataSources)
    };
  }

  private calculateDataIntegrityRate(dataSources: DataSource[]): number {
    const cleanSources = dataSources.filter(source => 
      source.dataQualityScore > 90 && source.status === 'Active'
    ).length;
    
    return cleanSources / dataSources.length * 100;
  }

  private getLatestSyncTimestamp(dataSources: DataSource[]) {
    return dataSources
      .filter(source => source.lastSyncedDate)
      .reduce((latest, current) => 
        current.lastSyncedDate > latest ? current.lastSyncedDate : latest, 
        dataSources[0]?.lastSyncedDate
      );
  }

  private calculateAverageSyncTime(dataSources: DataSource[]): number {
    // Placeholder for actual sync time calculation
    return 0; // Implement actual logic based on sync logs
  }

  // Firebase Data Source Methods
  async fetchDataSources(filter?: DataSourceFilter): Promise<DataSource[]> {
    try {
      let q = query(collection(this.firestore, this.dataSourcesCollection));
      
      // Apply filters if provided
      if (filter) {
        const filterConditions = [];
        if (filter.type) {
          filterConditions.push(where('type', '==', filter.type));
        }
        if (filter.status) {
          filterConditions.push(where('status', '==', filter.status));
        }
        if (filter.minQualityScore !== undefined) {
          filterConditions.push(where('dataQualityScore', '>=', filter.minQualityScore));
        }
        
        q = query(q, ...filterConditions);
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as DataSource));
    } catch (error) {
      console.error('Error fetching data sources:', error);
      return [];
    }
  }

  async addDataSource(dataSource: Omit<DataSource, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, this.dataSourcesCollection), {
        ...dataSource,
        lastSyncedDate: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding data source:', error);
      throw error;
    }
  }

  async updateDataSource(id: string, updates: Partial<DataSource>): Promise<void> {
    try {
      const docRef = doc(this.firestore, this.dataSourcesCollection, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating data source:', error);
      throw error;
    }
  }

  async deleteDataSource(id: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, this.dataSourcesCollection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting data source:', error);
      throw error;
    }
  }

  // Sync Operations
  async performDataSourceSync(sourceId: string): Promise<SyncStatus> {
    // Implement actual sync logic
    return {
      sourceId,
      status: 'Completed',
      startTime: serverTimestamp(), 
      endTime: serverTimestamp(),
      recordsProcessed: 1000,
      errorCount: 0
    };
  }
}

// Export a function to create the service with Firestore instance
export const createDinaggregationService = (firestoreInstance: Firestore) => 
  new DinaggregationService(firestoreInstance);
