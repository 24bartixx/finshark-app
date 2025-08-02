import { createBrowserRouter } from "react-router";
import App from "../App";
import SearchPage from "../pages/search-page/SearchPage";
import HomePage from "../pages/home-page/HomePage";
import CompanyPage from "../pages/company-page/CompanyPage";
import CompanyProfile from "../components/company-profile/CompanyProfile";
import IncomeStatement from "../components/income-statement/IncomeStatement";
import DesignPage from "../pages/design-page/DesignPage";
import BalanceSheet from "../components/balance-sheet/BalanceSheet";
import CashFlowStatement from "../components/cash-flow-statement/CashFlowStatement";
import LoginPage from "../pages/login-page/LoginPage";
import RegisterPage from "../pages/register-page/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      { path: "design-guide", element: <DesignPage /> },
      {
        path: "company/:ticker",
        element: (
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        ),
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashFlowStatement /> },
        ],
      },
    ],
  },
]);
