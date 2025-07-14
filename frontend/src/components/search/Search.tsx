import React, { ChangeEvent, SyntheticEvent } from "react";

type Props = {
  search: string | undefined;
  onSearchSubmit: (e: SyntheticEvent) => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ search, onSearchSubmit, handleSearchChange }: Props) => {
  return (
    <section className="relative bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <form
          onSubmit={onSearchSubmit}
          className="flex flex-col md:flex-row w-full py-4 px-10"
        >
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Serach companies"
            className="flex-1 placeholder-black border-2 rounded-lg p-3"
          />
        </form>
      </div>
    </section>
  );
};

export default Search;
