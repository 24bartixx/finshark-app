import Table from "../../components/table/Table";
import RatioList from "../../components/ratio-list/RatioList";
import { testIncomeStatementData } from "../../components/table/TestData";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCap,
    subTitle: "Total value of all a company's shares of stock",
  },
];

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark Design Page</h1>
      <h2>
        This is FinShark's design page. This is where we will house various
        design aspects of the app
      </h2>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <Table data={testIncomeStatementData} config={tableConfig} />
    </>
  );
};

export default DesignPage;
