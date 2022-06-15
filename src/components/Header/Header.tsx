import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export interface HeaderProps {}

export default function Header(_: HeaderProps): ReactElement {
  return (
    <Toolbar>
      <Typography variant="h5" noWrap component="div">
        Demo App
      </Typography>
    </Toolbar>
  );
}
