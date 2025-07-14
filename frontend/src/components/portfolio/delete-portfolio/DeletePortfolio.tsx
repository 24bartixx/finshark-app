import React, { SyntheticEvent } from "react";

type Props = {
  onPortfolioDelete: (e: SyntheticEvent) => void;
  porfolioValue: string;
};

const DeletePortfolio = ({ onPortfolioDelete, porfolioValue }: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input readOnly={true} hidden={true} value={porfolioValue} />
      <button className="text-white bg-red-500 w-full py-3 border-2 border-red-500 rounded-lg hover:text-red-500 hover:bg-white">
        X
      </button>
    </form>
  );
};

export default DeletePortfolio;
