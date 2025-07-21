import React, { useEffect, useState } from "react";
import { CompanyIncomeStatement } from "../../types/company";
import { useOutletContext } from "react-router";
import { getIncomeStatement } from "../../api/companies";
import Table from "../table/Table";
import Spinner from "../spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../helper/NumberFormatting";

type Props = {};

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: "Earnings Per Share (Diluted)",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.epsDiluted),
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.grossProfit / company.revenue),
  },
  {
    label: "Operating Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.operatingIncome / company.revenue),
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.incomeBeforeTax / company.revenue),
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.netIncome / company.revenue),
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [IncomeStatements, setIncomeStatements] = useState<
    CompanyIncomeStatement[]
  >([]);

  useEffect(() => {
    const fetchIncomeStatement = async () => {
      const data = await getIncomeStatement(ticker!);
      setIncomeStatements(data!.data);
    };
    fetchIncomeStatement();
  }, [ticker]);

  return (
    <>
      {IncomeStatements ? (
        <>
          <Table config={configs} data={IncomeStatements} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default IncomeStatement;
