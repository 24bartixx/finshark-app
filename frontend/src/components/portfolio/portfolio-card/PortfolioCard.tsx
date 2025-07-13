import React, { SyntheticEvent } from "react";
import DeletePortfolio from "../delete-portfolio/DeletePortfolio";

type Props = {
  portfolioValue: string;
  onPortfolioDelete: (e: SyntheticEvent) => void;
};

const PortfolioCard = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <>
      <h4>{portfolioValue}</h4>
      <DeletePortfolio
        onPortfolioDelete={onPortfolioDelete}
        porfolioValue={portfolioValue}
      />
    </>
  );
};

export default PortfolioCard;
