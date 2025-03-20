import { Autocomplete,TextField , MenuItem} from "@mui/material";
import { globalstyle } from "../../styles/GlobalCss";

 const CustomAutocomplete = ({ options, label, value, onChange, customProps }) => {
  return (
    <Autocomplete
    sx={globalstyle.autoCompleteSelect}
      {...customProps}
      options={options}
      getOptionLabel={(option) => option.label}
      value={options.find((option) => option.value === value) || null}
      onChange={(event, newValue) => onChange(newValue ? newValue.value : "")}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      renderOption={(props, option) => (
        <MenuItem {...props} key={option.value}>
          {option.label}
        </MenuItem>
      )}
    />
  );
};

export default CustomAutocomplete;