import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CustomAutoComplete = ({ invalid, className, options, value, setter, placeholder }) => (
  <Autocomplete
    id="free-solo-demo"
    freeSolo
    clearIcon={false}
    options={options}
    className={`mt-2 ${className}`}
    getOptionLabel={(opt) => opt?.label}
    value={options?.find((item) => item.value === value) || { label: value, value }}
    onChange={(event, newVal) => newVal && setter(newVal.value)}
    sx={{
      '& > div > div': {
        height: '36px',
        background: 'white',
        padding: '0 !important',
        borderRadius: '0.375rem !important'
      },
      '& > div > div > input': {
        padding: '0 15px !important',
        fontFamily: 'Montserrat !important'
      },
      '& > div > div > fieldset': {
        top: '-10px !important',
        borderRadius: '0.375rem !important'
      }
    }}
    renderInput={(params) => {
      return (
        <TextField
          {...params}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgb(209 213 219 / 1)',
                ...(invalid && { borderColor: 'red', borderWidth: '2px' })
              },
              '&:hover fieldset': {
                borderColor: 'rgb(99 102 241 / 1)'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgb(79 70 229 / 1 )',
                borderWidth: '2px'
              }
            }
          }}
          value={value}
          onChange={(e) => setter(e.target.value)}
          placeholder={placeholder}
        />
      );
    }}
  />
);

export default CustomAutoComplete;
