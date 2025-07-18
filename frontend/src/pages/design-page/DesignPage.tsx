import React from "react";
import Table from "../../components/table/Table";
import { testIncomeStatementData } from "../../components/table/TestData";

// const data = testIncomeStatementData;

type Props = {};

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark Design Page</h1>
      <h2>
        This is FinShark's design page. This is where we will house various
        design aspects of the app
      </h2>
      <Table />
    </>
  );
};

export default DesignPage;
