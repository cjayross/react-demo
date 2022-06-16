import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export interface ViewportProps {}

export default function Viewport(_: ViewportProps): ReactElement {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        style={{ aspectRatio: '1 / 1' }}
        component="img"
        image="https://loremflickr.com/405/405"
        alt="Example Image"
      />
    </Card>
  );
}
