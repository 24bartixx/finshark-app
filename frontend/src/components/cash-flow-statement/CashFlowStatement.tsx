import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { CompanyCashFlow } from "../../types/company";
import { getCashflowStatements } from "../../api/companies";
import Table from "../table/Table";

type Props = {};

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashProvidedByInvestingActivities,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Issuance of Stock (Net)",
    render: (company: CompanyCashFlow) => company.netStockIssuance,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
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
        <>Loading...</>
      )}
    </>
  );
};

export default CashFlowStatement;
