import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { CompanyCashFlow } from "../../types/company";
import { getCashflowStatements } from "../../api/companies";
import Table from "../table/Table";
import Spinner from "../spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../helper/NumberFormatting";

type Props = {};

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByInvestingActivities),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByFinancingActivities),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance of Stock (Net)",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netStockIssuance),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashFlowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [cashflowStatements, setCashflowStatements] = useState<
    CompanyCashFlow[]
  >([]);

  useEffect(() => {
    const fetchCashflowStatements = async () => {
      const result = await getCashflowStatements(ticker);
      setCashflowStatements(result!.data);
    };
    fetchCashflowStatements();
  }, [ticker]);

  return (
    <>
      {cashflowStatements && cashflowStatements.length > 0 ? (
        <Table config={config} data={cashflowStatements} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CashFlowStatement;
