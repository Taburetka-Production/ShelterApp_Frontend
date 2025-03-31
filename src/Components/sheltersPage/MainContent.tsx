import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import {
  setRegionFilter,
  setSearchQuery,
  setSortOrder,
} from "../../redux/slices/searchSlice";
import "../../styles/components/sheltersPage/MainContent.css";
import { Button } from "../Button";
import { AllSheltersList } from "./AllSheltersList";
import { Dropdown } from "./Dropdown";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const MainContent: React.FC = () => {
  const { searchQuery, regions } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const handleClearFilters = () => {
    dispatch(setRegionFilter([]));
    dispatch(setSearchQuery(""));
  };

  return (
    <div className="main-content">
      <div className="choose-shelter-text">
        <h1>Choose your shelter</h1>
      </div>
      <div className="filter-container">
        <div className="filter-container-filters">
          <Dropdown />
          <Button className="choose-on-map-btn">Choose on map</Button>
        </div>
        <div className="filter-container-sorting">
          <div className="active-filters">
            <h3>Active Filters:</h3>
            <ul>
              {searchQuery && <li>Search: {searchQuery}</li>}
              {regions.length > 0 && <li>Regions: {regions.join(", ")}</li>}
            </ul>
          </div>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
          <div className="sort-order-buttons">
            <button onClick={() => dispatch(setSortOrder("desc"))}>
              <HiSortAscending className="hiSort" /> Sort ascending
            </button>
            <button onClick={() => dispatch(setSortOrder("asc"))}>
              <HiSortDescending className="hiSort" /> Sort descending
            </button>
          </div>
        </div>
      </div>
      <AllSheltersList />
    </div>
  );
};
