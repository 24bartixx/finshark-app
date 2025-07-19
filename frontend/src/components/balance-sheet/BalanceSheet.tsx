import React, { useEffect, useState } from "react";
import { CompanyBalanceSheet } from "../../types/company";
import { useOutletContext } from "react-router";
import { getBalanceSheet } from "../../api/companies";
import RatioList from "../ratio-list/RatioList";

type Props = {};

const config = [
  {
    label: "Total Assets",
    render: (company: CompanyBalanceSheet) => company.totalAssets,
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) => company.totalCurrentAssets,
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) => company.propertyPlantEquipmentNet,
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) => company.intangibleAssets,
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) => company.otherCurrentLiabilities,
  },
  {
    label: "Total Liabilites",
    render: (company: CompanyBalanceSheet) => company.totalLiabilities,
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) => company.totalCurrentLiabilities,
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) => company.otherLiabilities,
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) => company.totalStockholdersEquity,
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) => company.retainedEarnings,
  },
];

const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [balanceSheets, setBalanceSheets] = useState<CompanyBalanceSheet[]>([]);

  useEffect(() => {
    const fetchBalanceSheets = async () => {
      const data = await getBalanceSheet(ticker);
      setBalanceSheets(data!.data);
    };
    fetchBalanceSheets();
  }, [ticker]);

  return (
    <>
      {balanceSheets && balanceSheets.length > 0 ? (
        <>
          <RatioList config={config} data={balanceSheets[0]} />
        </>
      ) : (
        <>Company not found!</>
      )}
    </>
  );
};

export default BalanceSheet;
