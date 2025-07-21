import React, { useEffect, useState } from "react";
import { CompanyTenK } from "../../types/company";
import { getTenK } from "../../api/companies";
import Spinner from "../spinner/Spinner";
import TenKFinderItem from "./TenKFinderItem";

type Props = { ticker: string };

const TenKFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[]>([]);

  useEffect(() => {
    const fetchCompanyTenK = async () => {
      const restult = await getTenK(ticker, 5);
      setCompanyData(restult!.data);
    };
    fetchCompanyTenK();
  }, [ticker]);

  console.log(companyData);

  return (
    <div className="inline-flex shadow-sm rounded-md m-4">
      {companyData ? (
        <>
          {companyData.map((tenK) => {
            return <TenKFinderItem tenK={tenK} />;
          })}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;
