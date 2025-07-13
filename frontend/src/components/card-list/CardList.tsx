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
    <>
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
        <h1>No results</h1>
      )}
    </>
  );
};

export default CardList;
