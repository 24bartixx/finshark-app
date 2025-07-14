import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyProfile } from "../../types/company";
import { getCompanyProfile } from "../../api/companies";

type Props = {};

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfile = async () => {
      const result = await getCompanyProfile(
        ticker === undefined ? "" : ticker
      );
      setCompany(result?.data[0]);
    };
    getProfile();
  }, [ticker]);

  return (
    <>
      {company ? (
        <div>{company.companyName}</div>
      ) : (
        <div>Company not found!</div>
      )}
    </>
  );
};

export default CompanyPage;
