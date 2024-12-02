import React, { useState } from "react";

const Faqs: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      title: "Data Integration & Aggregation",
      description:
        "ClarityIQ integrates data from disparate sources, including sales, finance, marketing, and customer service systems, into a unified repository. Automated processes ensure data accuracy, consistency, and completeness for analysis.",
    },
    {
      title: "Performance Dashboards & KPI Monitoring",
      description:
        "Customizable dashboards provide real-time visibility into KPIs, metrics, and trends across departments. Interactive visualization tools enable stakeholders to track performance and make data-driven decisions.",
    },
    {
      title: "Business Process Analysis",
      description:
        "Process mining algorithms identify bottlenecks and inefficiencies in workflows. Visualization tools highlight process variations and recommend streamlining opportunities for enhanced operational efficiency.",
    },
    {
      title: "Customer Insights & Segmentation",
      description:
        "Customer analytics tools segment customers by demographics, purchasing behavior, and preferences. Predictive analytics forecast trends, anticipate churn risk, and suggest personalized strategies for engagement.",
    },
    {
      title: "Financial Performance Analysis",
      description:
        "Financial modeling tools analyze income statements, balance sheets, and cash flows to assess profitability, liquidity, and solvency. Scenario planning projects financial performance under different conditions.",
    },
    {
      title: "Market & Competitive Intelligence",
      description:
        "Market analysis modules gather external data and competitor intelligence to identify trends and positioning. Benchmarking tools compare performance metrics, market share, and strategies against peers.",
    },
    {
      title: "Risk Identification & Management",
      description:
        "Risk analytics algorithms assess vulnerabilities in operations and supply chains. Heatmaps and scenario tools quantify risks and prioritize mitigation efforts to protect organizational interests.",
    },
    {
      title: "Strategic Planning & Decision Support",
      description:
        "Strategic planning modules support the development and execution of initiatives and goals. Decision tools offer scenario analysis and actionable insights for strategic business planning.",
    },
  ];

  const toggleFaq = (title: string) => {
    setOpenFaq((prev) => (prev === title ? null : title));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="text-3xl font-bold text-green-600">
          Frequently Asked Questions
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-md p-4">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            {/* FAQ Title */}
            <button
              onClick={() => toggleFaq(faq.title)}
              className="w-full flex justify-between items-center font-bold text-gray-800 text-lg py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            >
              <span>{faq.title}</span>
              <span>
                {openFaq === faq.title ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </button>

            {/* FAQ Description */}
            {openFaq === faq.title && (
              <div className="mt-2 px-4 text-gray-700 text-sm">
                {faq.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;


