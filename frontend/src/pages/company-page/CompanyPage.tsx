import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyProfile } from "../../types/company";
import { getCompanyProfile } from "../../api/companies";
import CompanyDashboard from "../../components/company-dashboard/CompanyDashboard";
import Sidebar from "../../components/sidebar/Sidebar";
import Tile from "../../components/sidebar/tile/Tile";

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
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
        <Sidebar />

        <CompanyDashboard ticker={ticker!}>
          <Tile title="Company Name" subTitle={company?.companyName ?? "-"} />
          <Tile title="Price" subTitle={company?.price.toString() ?? "-"} />
          <Tile title="Sector" subTitle={company?.sector ?? "-"} />
          <Tile title="DCF" subTitle={company?.dcf.toString() ?? "-"} />
          <p className="text-medium font-medium text-justify text-gray-900 shadow-lg rounded m-4 mr-10 p-6">
            {company?.description ?? ""}
          </p>
        </CompanyDashboard>
      </div>
    </>
  );
};

export default CompanyPage;
