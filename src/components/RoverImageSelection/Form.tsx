import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export interface FormProps {
  value: Date | null;
  onChange: Dispatch<SetStateAction<Date | null>>;
}

export default function Form(props: FormProps): ReactElement {
  const { value, onChange } = props;

  return (
    <Box className="flex justify-center">
      <StaticDatePicker
        openTo="day"
        disableFuture={true}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
}
