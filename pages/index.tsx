import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Main from '@layouts/Main';
import Stack from '@mui/material/Stack';
import RoverImageSelection from '@components/RoverImageSelection';
import { Photo } from '@types';

const PhotosQuery = gql`
  query Photos($date: String!) {
    photos(earth_date: $date, page: 1) {
      id
      img_src
    }
  }
`;

type PhotosResponse = {
  photos: Pick<Photo, 'id' | 'img_src'>[];
};

interface IndexPageProps {}

export default function IndexPage(_: IndexPageProps): ReactElement {
  const [date, setDate] = useState<Date | null>(() => new Date());

  const { data, loading, error } = useQuery<PhotosResponse>(PhotosQuery, {
    variables: { date },
  });

  const images = data?.photos?.map((photo) => photo.img_src);

  return (
    <Stack
      sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
      direction="row"
      spacing={5}
    >
      <RoverImageSelection.Form value={date} onChange={setDate} />
      <RoverImageSelection.Viewport images={images} loading={loading} />
    </Stack>
  );
}

IndexPage.getLayout = Main;
