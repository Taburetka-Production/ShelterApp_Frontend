import "@/styles/components/sheltersPage/RegionList.css";

export interface RegionListProps {
  regions: string[];
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
}

export const RegionList: React.FC<RegionListProps> = ({
  regions,
  selectedRegions,
  onRegionChange,
}) => (
  <ul className="region-list">
    {regions.map((r) => (
      <li key={r}>
        <label>
          <input
            type="checkbox"
            checked={selectedRegions.includes(r)}
            onChange={() => {
              const next = selectedRegions.includes(r)
                ? selectedRegions.filter((x) => x !== r)
                : [...selectedRegions, r];
              onRegionChange(next);
            }}
          />
          {r}
        </label>
      </li>
    ))}
  </ul>
);
