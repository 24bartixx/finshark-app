import React, { useEffect, useState } from "react";
import { CompanyBalanceSheet } from "../../types/company";
import { useOutletContext } from "react-router";
import { getBalanceSheet } from "../../api/companies";
import RatioList from "../ratio-list/RatioList";
import Spinner from "../spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../helper/NumberFormatting";

type Props = {};

const config = [
  {
    label: "Total Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalAssets),
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentAssets),
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.cashAndCashEquivalents),
  },
  {
    label: "Property & Equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.intangibleAssets),
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherCurrentLiabilities),
  },
  {
    label: "Total Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalLiabilities),
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentLiabilities),
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherLiabilities),
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalStockholdersEquity),
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.retainedEarnings),
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
        <Spinner />
      )}
    </>
  );
};

export default BalanceSheet;
