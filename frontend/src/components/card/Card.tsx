import React, { SyntheticEvent } from "react";
import "./Card.css";
import { CompanySearch } from "../../types/company";
import AddPortfolio from "../portfolio/add-portfolio/AddPortfolio";

type Props = {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
};

const Card = ({ id, searchResult, onPortfolioCreate }: Props) => {
  return (
    <div
      key={id}
      id={id}
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
    >
      <div className="flex space-x-6">
        <h2 className="font-bold text-center text-violet-950 md:text-left">
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p className="text-blue-900">{searchResult.currency}</p>
        <p className="font-bold text-blue-900">
          {searchResult.exchangeFullName} - {searchResult.exchange}
        </p>
      </div>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;
