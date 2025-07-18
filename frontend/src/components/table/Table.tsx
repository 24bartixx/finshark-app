import React from "react";
import { testIncomeStatementData } from "./TestData";
import { validate } from "uuid";

const data = testIncomeStatementData;

type Props = {};

type Company = (typeof data)[0];

const configs = [
  {
    label: "Year",
    render: (company: Company) => company.acceptedDate,
  },
  {
    label: "Cost of revenue",
    render: (company: Company) => company.costOfRevenue,
  },
];

const Table = (props: Props) => {
  const tableHeaders = configs.map((configVal) => {
    return (
      <th
        key={configVal.label}
        className="text-sm text-left uppercase text-gray-500 font-medium tracking-wider p-4"
      >
        {configVal.label}
      </th>
    );
  });

  const tableRows = data.map((company) => {
    return (
      <tr key={company.cik}>
        {configs.map((configVal) => {
          return (
            <td className="text-sm font-normal text-gray-900 p-4 whitespace-nowrap">
              {configVal.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>{tableHeaders}</thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
