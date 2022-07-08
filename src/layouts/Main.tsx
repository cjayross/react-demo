import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Header from '@components/Header';

export default function Main(page: ReactElement): ReactNode {
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => void (container.current = window?.document.body), []);

  return (
    <Box className="flex pt-14">
      <AppBar position="fixed" className="sm:shrink-0">
        <Header />
      </AppBar>

      <Box component="main" className="grow p-6">
        {page}
      </Box>
    </Box>
  );
}
