import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DashboardService } from './dashboardService';
import { CustomerInsightsService } from './customerInsightsService';
import { RiskIdentificationService } from './riskIdentificationService';

export const PDFExportService = {
  async generateFinancialPerformancePDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Ensure type safety for autoTable
    const addTable = (options: Parameters<typeof autoTable>[1]) => {
      autoTable(doc, options);
      return doc;
    };

    // Set document properties
    doc.setFontSize(18);
    doc.text('Financial Performance Report', 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Fetch required data
    const salesData = await DashboardService.fetchSalesData();
    const processedSalesData = DashboardService.processSalesData(salesData);
    const customerInsights = await CustomerInsightsService.fetchCustomerInsights();
    const riskData = await RiskIdentificationService.fetchRiskManagementData();

    // 1. Metrics Overview Section
    doc.setFontSize(14);
    doc.text('1. Metrics Overview', 14, 50);
    doc.setFontSize(10);

    // Sales Overview Table
    addTable({
      startY: 60,
      head: [['Month', 'Sales']],
      body: processedSalesData.salesOverviewData.map(item => [
        item.month, 
        `$${item.sales.toLocaleString()}`
      ]),
      theme: 'striped',
      styles: {
        fontSize: 10,
        cellPadding: 4
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' }
      }
    });

    // 2. Department KPIs Section
    doc.addPage();
    doc.setFontSize(14);
    doc.text('2. Department KPIs', 14, 22);
    doc.setFontSize(10);

    // Customer Segments Table
    addTable({
      startY: 32,
      head: [['Customer Segment', 'Avg Purchase Value', 'Number of Customers', 'Lifetime Value']],
      body: customerInsights.customerSegments.map(segment => [
        segment.name, 
        `$${segment.avgPurchaseValue.toLocaleString()}`, 
        segment.numCustomers,
        segment.lifetimeValue
      ]),
      theme: 'striped',
      styles: {
        fontSize: 10,
        cellPadding: 4
      }
    });

    // 3. Functional Areas Section
    doc.addPage();
    doc.setFontSize(14);
    doc.text('3. Functional Areas - Risk Management', 14, 22);
    doc.setFontSize(10);

    // Risk Management Table
    const flattenedRisks = riskData.flatMap(riskGroup => riskGroup.risks);
    addTable({
      startY: 32,
      head: [['Risk Category', 'Description', 'Likelihood', 'Impact', 'Risk Score']],
      body: flattenedRisks.map(risk => [
        risk.category,
        risk.description,
        risk.likelihood,
        risk.impact,
        risk.likelihood * risk.impact // Simple risk score calculation
      ]),
      theme: 'striped',
      styles: {
        fontSize: 10,
        cellPadding: 4
      }
    });

    // Save the PDF
    doc.save('Financial_Performance_Report.pdf');
  }
};