import React from "react";
import { CompanyTenK } from "../../types/company";
import { Link } from "react-router-dom";

type Props = { tenK: CompanyTenK };

const TenKFinderItem = ({ tenK }: Props) => {
  const fillingYear = new Date(tenK.fillingDate).getFullYear();

  return (
    <Link
      reloadDocument
      to={tenK.finalLink}
      type="button"
      className="inline-flex items-center text-md bg-lightGreen text-white rounded-md mx-1 p-3"
    >
      10K - {tenK.symbol} - {fillingYear}
    </Link>
  );
};

export default TenKFinderItem;
