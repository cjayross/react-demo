import { useState } from 'react';
import Main from '@layouts/Main';
import RoverImageSelection from '@components/RoverImageSelection';
import Stack from '@mui/material/Stack';

interface IndexPageProps {}

export default function IndexPage(_: IndexPageProps): ReactElement {
  const [date, setDate] = useState<Date | null>(() => new Date())

  return (
    <Stack
      sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
      direction="row"
      spacing={5}
    >
      <RoverImageSelection.Form value={date} onChange={setDate} />
      <RoverImageSelection.Viewport />
    </Stack>
  );
}

IndexPage.getLayout = Main;
