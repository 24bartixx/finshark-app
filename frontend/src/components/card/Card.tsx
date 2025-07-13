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
    <div key={id} id={id} className="card">
      <img alt="company logo" />
      <div className="details">
        <h2>
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p>{searchResult.currency}</p>
      </div>
      <p className="info">
        {searchResult.exchangeFullName} - {searchResult.exchange}
      </p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;
