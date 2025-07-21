import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyProfile } from "../../types/company";
import { getCompanyProfile } from "../../api/companies";
import CompanyDashboard from "../../components/company-dashboard/CompanyDashboard";
import Sidebar from "../../components/sidebar/Sidebar";
import Tile from "../../components/sidebar/tile/Tile";
import Spinner from "../../components/spinner/Spinner";
import TenKFinder from "../../components/ten-k-finder/TenKFinder";
import { formatLargeMonetaryNumber } from "../../helper/NumberFormatting";

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

  company && <Spinner />;

  return (
    <>
      {" "}
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />

          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company?.companyName ?? "-"} />
            <Tile
              title="Price"
              subTitle={
                company?.price !== undefined
                  ? formatLargeMonetaryNumber(company.price).toString()
                  : "-"
              }
            />
            <Tile title="Sector" subTitle={company?.sector ?? "-"} />
            <Tile
              title="Market Cap"
              subTitle={company?.marketCap?.toLocaleString() ?? "-"}
            />
            <TenKFinder ticker={ticker ?? ""} />
            <p className="text-medium font-medium text-justify text-gray-900 shadow-lg rounded m-4 mr-10 p-6">
              {company?.description ?? ""}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;
