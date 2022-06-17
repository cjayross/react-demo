import { NextApiRequest, NextApiResponse } from 'next';
import { gql, ApolloServer } from 'apollo-server-micro';
import MarsPhotosAPI from '@/datasources/mars-photos';

const typeDefs = gql`
  type Camera {
    id: ID!
    name: String!
    full_name: String!
  }

  type Rover {
    id: ID!
    name: String!
    landing_date: String!
    launch_date: String!
    status: String!
  }

  type Photo {
    id: ID!
    sol: Int!
    earth_date: String!
    img_src: String!
    camera: Camera!
    rover: Rover!
  }

  type Query {
    photos(page: Int, camera: String, earth_date: String): [Photo]!
  }
`;

const resolvers = {
  Query: {
    photos: async (_source: any, args: any, { dataSources }: any) => {
      return dataSources.marsPhotosAPI.getCuriosityPhotos(args);
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,

  dataSources: () => ({
    marsPhotosAPI: new MarsPhotosAPI(),
  }),

  context: () => ({
    nasaApiKey: process.env.NASA_API_KEY,
  }),

  cache: 'bounded',
});

const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.NASA_API_KEY) {
    throw new Error('$NASA_API_KEY is not provided');
  }

  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
