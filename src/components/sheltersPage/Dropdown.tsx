import { useEffect, useRef, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useAppDispatch } from "@/redux/hooks";
import { setRegionFilter, setSearchQuery } from "@/redux/slices/searchSlice";
import "@/styles/components/sheltersPage/Dropdown.css";
import { Button } from "../Button";
import { SearchBar } from "../SearchBar";
import { Region } from "./Region";

export const Dropdown = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tempRegions, setTempRegions] = useState<string[]>([]);

  const handler = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropdownRef]);

  const handleFindClick = () => {
    setIsOpen(false);
    dispatch(setRegionFilter(tempRegions));
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return (
    <div className="filter-menu" ref={dropdownRef}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <div className="btn-filter-div">
          <IoFilterSharp className="filter-icon" />
          Фільтри
        </div>
      </Button>
      {isOpen && (
        <div className={`dropdown-filter-open DropdownFadeIn animated`}>
          <SearchBar placeholder="Search" onSearchChange={handleSearchChange} />
          <Region onRegionChange={setTempRegions} />
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
