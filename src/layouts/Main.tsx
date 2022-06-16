import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Header from '@components/Header';

export default function Main(page: ReactElement): ReactNode {
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => void (container.current = window?.document.body), []);

  return (
    <Box
      sx={{ display: 'flex', pt: (theme) => theme.mixins.toolbar.minHeight }}
    >
      <AppBar
        position="fixed"
        sx={{
          flexShrink: { sm: 0 },
          ml: { sm: '20rem' },
        }}
      >
        <Header />
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        {page}
      </Box>
    </Box>
  );
}
