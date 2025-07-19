import React from "react";
import { TestDataCompany } from "../table/TestData";

type Props = {
  data: any;
  config: any;
};

// const data = TestDataCompany[0];

// type Company = typeof data;

// const configs = [
//   {
//     label: "Company Name",
//     render: (company: Company) => company.companyName,
//     subTitle: "This is the company name",
//   },
//   {
//     label: "Company Name",
//     render: (company: Company) => company.companyName,
//     subTitle: "This is the company name",
//   },
// ];

const RatioList = ({ data, config }: Props) => {
  const renderedRows = config.map((row: any) => {
    return (
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-16">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {row.label}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {row.subTitle && row.subTitle}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900">
            {row.render(data)}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="bg-white shadow rounded-lg min-w-180 my-4 ml-4 p-4 sm:p-6">
      <ul className="divide-y divide-gray-200">{renderedRows}</ul>
    </div>
  );
};

export default RatioList;
