import { FaSearch } from "react-icons/fa";
import { ChangeEvent } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  placeholder: string;
  onSearchChange: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearchChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  return (
    <div className="search-bar">
      <FaSearch className="fa-search" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};
