import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setRegionFilter,
  setSearchQuery,
  setSortOrder,
} from "@/redux/slices/searchSlice";
import { ROUTES } from "@/routes/routes";
import "@/styles/components/sheltersPage/MainContent.css";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { AllSheltersList } from "./AllSheltersList";
import { Dropdown } from "./Dropdown";

export const MainContent: React.FC = () => {
  const { regions } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClearFilters = () => {
    dispatch(setRegionFilter([]));
    dispatch(setSearchQuery(""));
  };

  const handleChooseOnMapButton = () => {
    navigate(ROUTES.SHELTERS_MAP);
  };

  return (
    <div className="main-content">
      <div className="choose-shelter-text">
        <h1>Оберіть приутлок</h1>
      </div>
      <div className="filter-container">
        <div className="filter-container-filters">
          <Dropdown />
          <Button
            className="choose-on-map-btn"
            onClick={handleChooseOnMapButton}
          >
            Обрати на карті
          </Button>
        </div>
        <div className="filter-container-sorting">
          <div className="active-filters">
            <h3>Активні фільтри:</h3>
            <ul>
              {regions.length > 0 && <li>Регіони: {regions.join(", ")}</li>}
            </ul>
          </div>
          <Button onClick={handleClearFilters}>Очистити фільтри</Button>
          <div className="sort-order-buttons">
            <button onClick={() => dispatch(setSortOrder("desc"))}>
              <HiSortDescending className="hiSort" /> За спаданням
            </button>
            <button onClick={() => dispatch(setSortOrder("asc"))}>
              <HiSortAscending className="hiSort" /> За зростанням
            </button>
          </div>
        </div>
      </div>
      <AllSheltersList />
    </div>
  );
};
