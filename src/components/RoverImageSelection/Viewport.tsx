import { useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useDebounce } from '@hooks';

export interface ViewportProps {
  images?: string[];
  loading?: boolean;
}

export default function Viewport(props: ViewportProps): ReactElement {
  const { images = [], loading = false } = props;
  const [spinner, setSpinner] = useDebounce(false, 150);

  useEffect(() => setSpinner(loading), [loading]);

  const hidden =
    loading || !images.length
      ? {
          opacity: 0,
        }
      : {};

  const LoadingMarkup =
    spinner && loading ? (
      <Box
        sx={{
          position: 'absolute',
          top: 'calc(50% - 2px)',
          left: '25%',
          right: '25%',
        }}
      >
        <LinearProgress />
      </Box>
    ) : null;

  const NoContentMarkup =
    !loading && !images.length ? (
      <Box
        sx={{
          color: (theme) => theme.palette.text.secondary,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CancelPresentationIcon aria-label="No Content" sx={{ fontSize: 70 }} />
        <Typography variant="h5">No Images Found</Typography>
      </Box>
    ) : null;

  return (
    <Card sx={{ width: 500 }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          paddingTop: '100%',
        }}
      />
      {NoContentMarkup}
      {LoadingMarkup}
      <CardMedia
        style={{ width: 500, aspectRatio: '1 / 1', ...hidden }}
        component="img"
        image={images[0]}
        alt="Example Image"
      />
    </Card>
  );
}
