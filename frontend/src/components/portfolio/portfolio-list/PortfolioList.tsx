import React, { SyntheticEvent } from "react";
import PortfolioCard from "../portfolio-card/PortfolioCard";

type Props = {
  portfolioValues: string[];
  onPortfolioDelete: (e: SyntheticEvent) => void;
};

const PortfolioList = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <section id="portfolio" className="my-10">
      <h3 className="text-3xl font-semibold text-center my-3 md:text-4xl">
        My portfolio
      </h3>
      <div className="flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 md:space-y-0 md:flex-row">
        {portfolioValues.length > 0 ? (
          portfolioValues.map((value) => {
            return (
              <PortfolioCard
                key={value}
                portfolioValue={value}
                onPortfolioDelete={onPortfolioDelete}
              />
            );
          })
        ) : (
          <h3>Your portolio is empty.</h3>
        )}
      </div>
    </section>
  );
};

export default PortfolioList;
