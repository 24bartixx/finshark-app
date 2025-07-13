import React, { SyntheticEvent } from "react";

type Props = {
  onPortfolioDelete: (e: SyntheticEvent) => void;
  porfolioValue: string;
};

const DeletePortfolio = ({ onPortfolioDelete, porfolioValue }: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input readOnly={true} hidden={true} value={porfolioValue} />
        <button>X</button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
