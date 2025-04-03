import "../../styles/components/sheltersPage/RegionList.css";

interface RegionListProps {
  regions: string[];
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
}

export const RegionList: React.FC<RegionListProps> = ({
  regions,
  selectedRegions,
  onRegionChange,
}) => {
  const handleCheckboxChange = (region: string) => {
    const updatedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];
    onRegionChange(updatedRegions);
  };

  return (
    <ul className="region-list">
      {regions.map((region, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={selectedRegions.includes(region)}
              onChange={() => handleCheckboxChange(region)}
            />
            {region}
          </label>
        </li>
      ))}
    </ul>
  );
};
