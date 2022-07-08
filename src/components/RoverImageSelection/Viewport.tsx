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

  const hidden = loading || !images.length ? { opacity: 0 } : {};

  const LoadingMarkup =
    spinner && loading ? (
      <Box className="absolute top-[calc(50%-2px)] inset-x-1/4">
        <LinearProgress />
      </Box>
    ) : null;

  const NoContentMarkup =
    !loading && !images.length ? (
      <Box className="absolute inset-0 flex flex-col justify-center items-center opacity-disabled">
        <CancelPresentationIcon aria-label="No Content" className="text-7xl" />
        <Typography variant="h5">No Images Found</Typography>
      </Box>
    ) : null;

  return (
    <Card className="w-[32rem]">
      <Box className="absolute inset-0 pt-[100%]" />
      {NoContentMarkup}
      {LoadingMarkup}
      <CardMedia
        style={{ backfaceVisibility: 'hidden', ...hidden }}
        className="aspect-square w-[32rem]"
        component="img"
        image={images[0]}
        alt="Example Image"
      />
    </Card>
  );
}
