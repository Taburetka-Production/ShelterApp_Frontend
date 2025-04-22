import { useEffect, useRef, useState, useMemo } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRegionFilter, setSearchQuery } from "@/redux/slices/searchSlice";
import "@/styles/components/sheltersPage/Dropdown.css";
import { Button } from "../button/Button";
import { SearchBar } from "../searchBar/SearchBar";
import { Region } from "./Region";

export const Dropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const reduxQuery = useAppSelector((s) => s.search.searchQuery);
  const reduxRegions = useAppSelector((s) => s.search.regions);
  const shelters = useAppSelector((s) => s.shelter.shelters);

  const [isOpen, setIsOpen] = useState(false);
  const [tempQuery, setTempQuery] = useState<string>(reduxQuery);
  const [tempRegions, setTempRegions] = useState<string[]>(reduxRegions);

  const allRegions = useMemo(() => {
    const cities = shelters
      .map((sh) => sh.address?.city ?? "")
      .filter((city) => city !== "");
    return Array.from(new Set(cities));
  }, [shelters]);

  useEffect(() => {
    setTempQuery(reduxQuery);
  }, [reduxQuery]);
  useEffect(() => {
    setTempRegions(reduxRegions);
  }, [reduxRegions]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleFindClick = () => {
    dispatch(setSearchQuery(tempQuery));
    dispatch(setRegionFilter(tempRegions));
    setIsOpen(false);
  };

  return (
    <div className="filter-menu" ref={dropdownRef}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <div className="btn-filter-div">
          <IoFilterSharp className="filter-icon" /> Фільтри
        </div>
      </Button>

      {isOpen && (
        <div className="dropdown-filter-open DropdownFadeIn animated">
          <SearchBar
            placeholder="Пошук"
            value={tempQuery}
            onSearchChange={setTempQuery}
          />

          <Region
            regions={allRegions}
            selectedRegions={tempRegions}
            onRegionChange={setTempRegions}
          />

          <div className="button-find-div">
            <Button onClick={handleFindClick} className="find-open">
              Знайти
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
