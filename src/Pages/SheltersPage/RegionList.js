import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleRegion } from "../../redux/actions/regionActions";
import "./RegionList.css"

export const RegionList = ({ regions }) => {
  const selectedRegions = useSelector((state) => state.region.selectedRegions);
  const dispatch = useDispatch();

  const handleToggle = (region) => {
    dispatch(toggleRegion(region));
  };

  return (
      <ul className="region-list">
        {regions.map((region) => (
          <li key={region.name}>
            <label>
              <input
                type="checkbox"
                checked={selectedRegions.includes(region.name)}
                onChange={() => handleToggle(region.name)}
              />
              {region.name}
            </label>
          </li>
        ))}
      </ul>
  );
}