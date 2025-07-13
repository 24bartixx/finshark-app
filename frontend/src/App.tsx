import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./components/card-list/CardList";
import Search from "./components/search/Search";
import { CompanySearch } from "./types/company";
import { searchCompanies } from "./api/companies";
import PortfolioList from "./components/portfolio/portfolio-list/PortfolioList";
import { log } from "console";

function App() {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
      setServerError("");
    }
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    if (portfolioValues.includes(e.target[0].value)) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const updatedPortfolio = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(updatedPortfolio);
  };

  return (
    <div className="App">
      <Search
        search={search}
        onSearchSubmit={onSearchSubmit}
        handleSearchChange={handleSearchChange}
      />
      {serverError && <h1>{serverError}</h1>}
      <PortfolioList
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResult={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  );
}

export default App;
