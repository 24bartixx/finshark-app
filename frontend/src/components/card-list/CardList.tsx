import React, { SyntheticEvent } from "react";
import { CompanySearch } from "../../types/company";
import Card from "../card/Card";
import { v4 as uuid } from "uuid";

type Props = {
  searchResult: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
};

const CardList = ({ searchResult, onPortfolioCreate }: Props) => {
  return (
    <div>
      {searchResult.length > 0 ? (
        searchResult.map((result) => {
          return (
            <Card
              id={result.symbol}
              key={uuid()}
              searchResult={result}
              onPortfolioCreate={onPortfolioCreate}
            />
          );
        })
      ) : (
        <p className="text-xl font-semibold text-center my-3">No results</p>
      )}
    </div>
  );
};

export default CardList;
