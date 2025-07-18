import { createBrowserRouter } from "react-router";
import App from "../App";
import SearchPage from "../pages/search-page/SearchPage";
import HomePage from "../pages/home-page/HomePage";
import CompanyPage from "../pages/company-page/CompanyPage";
import CompanyProfile from "../components/company-profile/CompanyProfile";
import IncomeStatement from "../components/income-statement/IncomeStatement";
import DesignPage from "../pages/design-page/DesignPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "design-guide", element: <DesignPage /> },
      {
        path: "company/:ticker",
        element: <CompanyPage />,
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
        ],
      },
    ],
  },
]);
