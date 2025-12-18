import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchSiteList, getSiteId } from "../../../utils/Handlerfunctions/getdata";
import { SelectChangeEvent } from "@mui/material";

interface SiteFilterProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  label?: string;
}

const SiteFilter = ({
  value,
  onChange,
  label = "Filter by Site",
}: SiteFilterProps) => {
  const [siteOptions, setSiteOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
  const loadSites = async () => {
    const siteId = getSiteId(); // may be null or ""

    // 🚫 DO NOT return early
    // If siteId is empty, API will be called WITHOUT site_id
    const sites = await fetchSiteList(
      siteId && siteId !== "" ? siteId : undefined
    );

    setSiteOptions(sites);
  };

  loadSites();
}, []);

  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        <MenuItem value="">All Sites</MenuItem>

        {siteOptions.map((site) => (
          <MenuItem key={site.value} value={site.value}>
            {site.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SiteFilter;
