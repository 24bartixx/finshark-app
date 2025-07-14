import { createBrowserRouter } from "react-router";
import App from "../App";
import SearchPage from "../pages/search-page/SearchPage";
import HomePage from "../pages/home-page/HomePage";
import CompanyPage from "../pages/company-page/CompanyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "company/:ticker", element: <CompanyPage /> },
    ],
  },
]);
