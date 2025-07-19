import React, { useEffect, useState } from "react";
import { CompanyKeyMetrics } from "../../types/company";
import { useOutletContext } from "react-router-dom";
import { getKeyMetrics } from "../../api/companies";
import RatioList from "../ratio-list/RatioList";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => company.marketCap,
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => company.returnOnEquityTTM,
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) => company.returnOnTangibleAssetsTTM,
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cash Flow Yield",
    render: (company: CompanyKeyMetrics) => company.freeCashFlowYieldTTM,
    subTitle:
      "Free cash flow divided by market cap — how much cash the business returns",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) => company.grahamNumberTTM,
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "Capex to Revenue",
    render: (company: CompanyKeyMetrics) => company.capexToRevenueTTM,
    subTitle: "Percentage of revenue spent on capital expenditures",
  },
  {
    label: "Research & Development to Revenue",
    render: (company: CompanyKeyMetrics) =>
      company.researchAndDevelopementToRevenueTTM,
    subTitle:
      "Portion of revenue reinvested in innovation and product development",
  },
  {
    label: "Stock-Based Compensation to Revenue",
    render: (company: CompanyKeyMetrics) =>
      company.stockBasedCompensationToRevenueTTM,
    subTitle: "How much of the revenue is paid to employees via stock",
  },
  {
    label: "Cash Conversion Cycle",
    render: (company: CompanyKeyMetrics) => company.cashConversionCycleTTM,
    subTitle:
      "Time (in days) to turn investments in inventory into cash from sales",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [companyData, setComapnyData] = useState<CompanyKeyMetrics>();

  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      const value = await getKeyMetrics(ticker);
      setComapnyData(value?.data[0]);
    };
    getCompanyKeyMetrics();
  }, [ticker]);

  return (
    <>
      {companyData ? (
        <RatioList data={companyData} config={tableConfig} />
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default CompanyProfile;
