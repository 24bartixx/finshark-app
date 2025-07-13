import axios from "axios";
import { CompanySearch } from "../types/company";

interface SerachResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<SerachResponse>(
      `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message: ", error.message);
      return error.message;
    } else {
      console.log("Unexpected error: ", error);
      return "An unexpected error has occured.";
    }
  }
};
