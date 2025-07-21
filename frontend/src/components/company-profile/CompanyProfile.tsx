import React, { useEffect, useState } from "react";
import { CompanyKeyMetrics } from "../../types/company";
import { useOutletContext } from "react-router-dom";
import { getKeyMetrics } from "../../api/companies";
import RatioList from "../ratio-list/RatioList";
import Spinner from "../spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../../helper/NumberFormatting";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the company's ability to pay short-term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnEquityTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effectively a company is using its assets",
  },
  {
    label: "Free Cash Flow Yield",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowYieldTTM),
    subTitle:
      "Free cash flow divided by market cap — how much cash the business returns",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(company.grahamNumberTTM),
    subTitle:
      "This is the upper bound of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "Capex to Revenue",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.capexToRevenueTTM),
    subTitle: "Percentage of revenue spent on capital expenditures",
  },
  {
    label: "Research & Development to Revenue",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.researchAndDevelopementToRevenueTTM),
    subTitle:
      "Portion of revenue reinvested in innovation and product development",
  },
  {
    label: "Stock-Based Compensation to Revenue",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.stockBasedCompensationToRevenueTTM),
    subTitle: "How much of the revenue is paid to employees via stock",
  },
  {
    label: "Cash Conversion Cycle",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.cashConversionCycleTTM),
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
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;
