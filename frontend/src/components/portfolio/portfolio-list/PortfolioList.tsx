import React, { SyntheticEvent } from "react";
import PortfolioCard from "../portfolio-card/PortfolioCard";

type Props = {
  portfolioValues: string[];
  onPortfolioDelete: (e: SyntheticEvent) => void;
};

const PortfolioList = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <>
      <h3>My portfolio</h3>
      {portfolioValues.map((value) => {
        return (
          <PortfolioCard
            key={value}
            portfolioValue={value}
            onPortfolioDelete={onPortfolioDelete}
          />
        );
      })}
    </>
  );
};

export default PortfolioList;
