'use client';
import React, { useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Dinaggregation from "@/components/dinaggregation";
import DashboardSection from "@/components/dashboardsection";
import BusinessProcess from "@/components/businessprocess";
import CustomerInsights from "@/components/customerinsights";
import FinancialPerformance from "@/components/financialperformance";
import MarketAndCompetitivePage from "@/components/marketncompetitive";
import RiskIdentification from "@/components/riskidentification";
import DecisionSupport from "@/components/decisionsupport";
// Icons
import QuestionMark1Icon from "../../public/icons/PlasmicIcon__QuestionMark1"; // plasmic-import: yY_Xh4fGKtqL/icon
import Bell1Icon from "../../public/icons/PlasmicIcon__Bell1"; // plasmic-import: n9zUMqSDbSlh/icon
import SearchIcon from "../../public/icons/PlasmicIcon__Search"; // plasmic-import: oIoWRcUyEgWn/icon
import Layout11Icon from "../../public/icons/PlasmicIcon__Layout11"; // plasmic-import: zToZXXJTB9dc/icon
import FolderIcon from "../../public/icons/PlasmicIcon__Folder"; // plasmic-import: 90X0AxWg__s9/icon
// import Line1Icon from "../../public/icons/PlasmicIcon__Line1"; // plasmic-import: hCmqTbEa_XEh/icon
import FarmerMarketIcon from "../../public/icons/PlasmicIcon__FarmerMarket"; // plasmic-import: 5cySklPsBu5b/icon
import CalendarIcon from "../../public/icons/PlasmicIcon__Calendar"; // plasmic-import: c4V_2BCP5vb8/icon
import FChatIcon from "../../public/icons/PlasmicIcon__FChat"; // plasmic-import: 6b5_xU8yWQFY/icon
import CandlestickChartIcon from "../../public/icons/PlasmicIcon__CandlestickChart"; // plasmic-import: ZYZreGho0u9b/icon
import WhiskersIcon from "../../public/icons/PlasmicIcon__Whiskers"; // plasmic-import: 6QYFPKXZ9GqK/icon
// import CurrencyDollar1Icon from "../../public/icons/PlasmicIcon__CurrencyDollar1"; // plasmic-import: USBnaJoUy1KG/icon
// import GroupIcon from "../../public/icons/PlasmicIcon__Group"; // plasmic-import: 6kUOcHOYzusH/icon
import FrameIcon from "../../public/icons/PlasmicIcon__Frame"; // plasmic-import: 99I2RlQV67k2/icon
// import ArrowUp1Icon from "../../public/icons/PlasmicIcon__ArrowUp1"; // plasmic-import: LK1XmH1YC1N6/icon
// import Calendar2Icon from "../../public/icons/PlasmicIcon__Calendar2"; // plasmic-import: dFXdcIaHC61R/icon
// import ChevronDownLargeIcon from "../../public/icons/PlasmicIcon__ChevronDownLarge"; // plasmic-import: MF4N_3wKmh_O/icon
// import ChevronLeftLargeIcon from "../../public/icons/PlasmicIcon__ChevronLeftLarge"; // plasmic-import: d-ag9IpbSnw-/icon
// import Menu5Icon from "../../public/icons/PlasmicIcon__Menu5"; // plasmic-import: 7KzZjpFqGdS5/icon
// import ChevronRightLargeIcon from "../../public/icons/PlasmicIcon__ChevronRightLarge"; // plasmic-import: VaHzNZUH3H4M/icon
// import FunnelIcon from "../../public/icons/PlasmicIcon__Funnel"; // plasmic-import: LV7HMvfyS4Un/icon
// import EditAltIcon from "../../public/icons/PlasmicIcon__EditAlt"; // plasmic-import: dE6pqSHD6AWY/icon
// import Group2Icon from "../../public/icons/PlasmicIcon__Group2"; 
// import Menu51Icon from "../../public/icons/PlasmicIcon__Menu51"; 
// import EllipseIcon from "../../public/icons/PlasmicIcon__Ellipse"; 
// import Line40Icon from "../../public/icons/PlasmicIcon__Line40"; 
// import chartRt8T6Nkpz3Qc from "./images/chart.svg";  

const Page = () => {
  const router = useRouter();
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
  ];

  const revenueData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 300 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];


  const [activeSection, setActiveSection] = useState<string>("Dashboard"); 

  function handleNavigateToSignin() {
    router.push("/signin");
  }
  return (
    <div className="min-h-screen bg-gray-100 text-green-900">
      {/* Sidebar and Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <aside className="col-span-2 bg-[#CCF6AD] shadow rounded-lg p-4 min-h-screen">
          <Image src="/images/image19.png" alt="logo" height="70" width="180" className="rounded-md mb-4"/>
          <hr className="border-slate-400" /><br />
          <nav>
          <ul className="space-y-2 relative">
      <li
        onClick={() => setActiveSection("Dashboard")}
        className={`relative flex items-center px-4 py-2 rounded-md cursor-pointer transform transition-all duration-200 ${
          activeSection === "Dashboard"
            ? "bg-green-500 text-white"
            : "bg-transparent text-gray-700 hover:bg-green-500 hover:text-white"
        }`}
      >
        <Layout11Icon
          className={`w-6 h-6 mr-4 ${
            activeSection === "Dashboard" ? "text-white" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            activeSection === "Dashboard" ? "text-white" : "text-gray-700"
          }`}
        >
          Dashboard
        </span>
      </li>
      <li
        onClick={() => setActiveSection("Dinaggregation")}
        className={`relative flex items-center px-4 py-2 rounded-md cursor-pointer transform transition-all duration-200 ${
          activeSection === "Dinaggregation"
            ? "bg-green-500 text-white"
            : "bg-transparent text-gray-700 hover:bg-green-500 hover:text-white"
        }`}
      >
        <FolderIcon
          className={`w-6 h-6 mr-4 ${
            activeSection === "Dinaggregation" ? "text-white" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            activeSection === "Dinaggregation" ? "text-white" : "text-gray-700"
          }`}
        >
          Data Integration & Aggregation
        </span>
      </li>
      <li
        onClick={() => setActiveSection("BusinessProcess")}
        className={`relative flex items-center px-4 py-2 rounded-md cursor-pointer transform transition-all duration-200 ${
          activeSection === "BusinessProcess"
            ? "bg-green-500 text-white"
            : "bg-transparent text-gray-700 hover:bg-green-500 hover:text-white"
        }`}
      >
        <FarmerMarketIcon
          className={`w-6 h-6 mr-4 ${
            activeSection === "BusinessProcess" ? "text-white" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            activeSection === "BusinessProcess" ? "text-white" : "text-gray-700"
          }`}
        >
          Business Process Analysis
        </span>
      </li>
      <li
        onClick={() => setActiveSection("CustomerInsights")}
        className={`relative flex items-center px-4 py-2 rounded-md cursor-pointer transform transition-all duration-200 ${
          activeSection === "CustomerInsights"
            ? "bg-green-500 text-white"
            : "bg-transparent text-gray-700 hover:bg-green-500 hover:text-white"
        }`}
      >
        <CalendarIcon
          className={`w-6 h-6 mr-4 ${
            activeSection === "CustomerInsights" ? "text-white" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            activeSection === "CustomerInsights" ? "text-white" : "text-gray-700"
          }`}
        >
          Customer Insights
        </span>
      </li>
      <li
        onClick={() => setActiveSection("FinancialPerformance")}
        className={`relative flex items-center px-4 py-2 rounded-md cursor-pointer transform transition-all duration-200 ${
          activeSection === "FinancialPerformance"
            ? "bg-green-500 text-white"
            : "bg-transparent text-gray-700 hover:bg-green-500 hover:text-white"
        }`}
      >
        <FChatIcon
          className={`w-6 h-6 mr-4 ${
            activeSection === "FinancialPerformance" ? "text-white" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            activeSection === "FinancialPerformance" ? "text-white" : "text-gray-700"
          }`}
        >
          Financial Performance
        </span>
      </li>
      <li
        onClick={() => setActiveSection("MarketnCompetitive")}
        className={`relative flex items-center px-4 py-2 rounded-md cursor-pointer transform transition-all duration-200 ${
          activeSection === "MarketnCompetitive"
            ? "bg-green-500 text-white"
            : "bg-transparent text-gray-700 hover:bg-green-500 hover:text-white"
        }`}
      >
        <CandlestickChartIcon
          className={`w-6 h-6 mr-4 ${
            activeSection === "MarketnCompetitive" ? "text-white" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            activeSection === "MarketnCompetitive" ? "text-white" : "text-gray-700"
          }`}
        >
          Market & Competitive
        </span>
      </li>
      <li
        onClick={() => setActiveSection("RiskIdentification")}
        className={`relative flex items-center px-4 py-2 rounded-md cursor-pointer transform transition-all duration-200 ${
          activeSection === "RiskIdentification"
            ? "bg-green-500 text-white"
            : "bg-transparent text-gray-700 hover:bg-green-500 hover:text-white"
        }`}
      >
        <WhiskersIcon
          className={`w-6 h-6 mr-4 ${
            activeSection === "RiskIdentification" ? "text-white" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            activeSection === "RiskIdentification" ? "text-white" : "text-gray-700"
          }`}
        >
          Risk Identification
        </span>
      </li>
      <li
        onClick={() => setActiveSection("StrategicPlanning")}
        className={`relative flex items-center px-4 py-2 rounded-md cursor-pointer transform transition-all duration-200 ${
          activeSection === "StrategicPlanning"
            ? "bg-green-500 text-white"
            : "bg-transparent text-gray-700 hover:bg-green-500 hover:text-white"
        }`}
      >
        <FrameIcon
          className={`w-6 h-6 mr-4 ${
            activeSection === "StrategicPlanning" ? "text-white" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            activeSection === "StrategicPlanning" ? "text-white" : "text-gray-700"
          }`}
        >
          Strategic Planning
        </span>
      </li>
    </ul>
         
          </nav>
        </aside>

        {/* Main Content */}
        <main className="col-span-10 space-y-6">
          {/* Header */}
          <header className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
            
            {/* Search Text Field */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 rounded-md w-[400px] px-4 py-2 pl-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
      <SearchIcon
        className="w-5 h-5 absolute left-3 top-2.5 text-gray-500"
        aria-hidden="true"
      />
    </div>
            <div className="flex items-center space-x-4">
              {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                New Report
              </button> */}
               <Bell1Icon className="w-6 h-6 mr-6 text-gray-500 cursor-pointer hover:text-green-500" />
               <QuestionMark1Icon className="w-6 h-6 mr-6 text-gray-500 cursor-pointer hover:text-green-500" />
               <div></div>
              <div onClick={() => handleNavigateToSignin()} className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-500" />
            </div>
          </header>

          {/* Charts and Stats */}
          <div>
          {activeSection === "Dashboard" && <DashboardSection />}
                {activeSection === "Dinaggregation" && <Dinaggregation />}
                 {activeSection === "BusinessProcess" && <BusinessProcess />}
                {activeSection === "CustomerInsights" && <CustomerInsights />}
                {activeSection === "FinancialPerformance" && <FinancialPerformance />}
                {activeSection === "MarketnCompetitive" && <MarketAndCompetitivePage />}
               {activeSection === "RiskIdentification" && <RiskIdentification />}
                 {activeSection === "StrategicPlanning" && <DecisionSupport />}
                {/* {activeSection === "SearchListing" && <PlasmicSearchListing />} */}
             
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default Page;
