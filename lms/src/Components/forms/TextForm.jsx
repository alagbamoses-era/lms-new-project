import TextField from "@mui/material/TextField";

const TextForm = ({ label, value, onChange, type = "text" }) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default TextForm;