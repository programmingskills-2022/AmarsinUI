import { Autocomplete, TextField } from "@mui/material";

type Props<T> = {
  options: T[];
  label?: string;
  value: T | null ;
  handleChange: (event: any, newValue: T | null) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  mobilefontsize?: string;
  desktopfontsize?: string;
  showLabel?: boolean;
  showBorder?: boolean;
  showClearIcon?: boolean;
  showPopupIcon?: boolean;
  outlinedInputPadding?: string;
  inputPadding?: string;
  showBold?: boolean; // <-- add this
};

const AutoComplete = <T extends { id: string | number; title: string }>({
  options,
  label,
  value,
  handleChange,
  setSearch,
  mobilefontsize = "0.875rem",
  desktopfontsize = "1rem",
  showLabel = true,
  showBorder = true,
  showClearIcon = true,
  showPopupIcon = true,
  outlinedInputPadding,
  inputPadding,
  showBold = false, // <-- default to false
}: Props<T>) => {
  return (
    <Autocomplete
      options={options}
      clearIcon={showClearIcon ? undefined : <span />}
      popupIcon={showPopupIcon ? undefined : <span />}
      renderOption={(props, option) => (
        <li {...props} className="text-sm p-2" key={option.id}>
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={showLabel ? label : undefined}
          onChange={(event) => setSearch(event.target.value)}
          sx={{
            fontSize: { xs: mobilefontsize, sm: desktopfontsize },
            fontWeight: showBold ? 700 : 400, // <-- root font weight
            "& .MuiInputBase-input": {
              fontSize: { xs: mobilefontsize, sm: desktopfontsize },
              fontWeight: showBold ? 700 : 400, // <-- input font weight
              ...(inputPadding && { padding: inputPadding }),
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: mobilefontsize, sm: desktopfontsize },
              fontWeight: showBold ? 700 : 400, // <-- label font weight
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: showBorder ? undefined : "none",
            },
            ...(outlinedInputPadding && {
              "& .MuiOutlinedInput-root": {
                padding: outlinedInputPadding,
              },
            }),
          }}
        />
      )}
      value={value}
      onChange={handleChange}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText="پیدا نشد"
      className="w-full"
    />
  );
};

export default AutoComplete;