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

        <CompanyDashboard>
          <Tile title="Company Name" subTitle="Tesla" />
          <Tile title="Company Name" subTitle="Tesla" />
          <Tile title="Company Name" subTitle="Tesla" />
          <Tile title="Company Name" subTitle="Tesla" />
          <Tile title="Company Name" subTitle="Tesla" />
          <Tile title="Company Name" subTitle="Tesla" />
        </CompanyDashboard>
      </div>
      ;
      {/* {company ? (
        <div>
          <nav>
            <button className="w-10 h-10">
              <i className="fas fa-ellipsis-v"></i>
            </button>
            <div className="flex flex-col h-full overflow-y-auto px-4 pt-6">
              <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4">
                Home
              </h6>
            </div>
          </nav>
          <div></div>
        </div>
      ) : (
        <div>Company not found!</div>
      )} */}
    </>
  );
};

export default CompanyPage;
