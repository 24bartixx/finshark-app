import { ClipLoader } from "react-spinners";
import "./Spinner.css";

type Props = {
  isLoading?: boolean;
};

const Spinner = ({ isLoading = true }: Props) => {
  return (
    <div id="loading-spinner">
      <ClipLoader loading={isLoading} size={45} aria-label="Loading spinner" />
    </div>
  );
};

export default Spinner;
