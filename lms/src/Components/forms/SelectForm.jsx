import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectForm({
  label,
  options = [],
  value,
  onChange,
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-select-label`}>
        {label}
      </InputLabel>

      <Select
        labelId={`${label}-select-label`}
        value={value || ""}
        label={label}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
          >
            {option.role || option.gender || option.programme || option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}