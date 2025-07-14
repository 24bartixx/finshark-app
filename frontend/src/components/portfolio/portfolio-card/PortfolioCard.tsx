import React, { SyntheticEvent } from "react";
import DeletePortfolio from "../delete-portfolio/DeletePortfolio";

type Props = {
  portfolioValue: string;
  onPortfolioDelete: (e: SyntheticEvent) => void;
};

const PortfolioCard = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <h4 className="text-xl font-bold pt-6">{portfolioValue}</h4>
      <DeletePortfolio
        onPortfolioDelete={onPortfolioDelete}
        porfolioValue={portfolioValue}
      />
    </div>
  );
};

export default PortfolioCard;
