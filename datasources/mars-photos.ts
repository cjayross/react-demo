import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import format from 'date-fns/format';

type RoverCamera =
  | 'FHAZ'
  | 'RHAZ'
  | 'MAST'
  | 'CHEMCAM'
  | 'MAHLI'
  | 'MARDI'
  | 'NAVCAM'
  | 'PANCAM'
  | 'MINITES';

type CuriosityPhotosParams = {
  earth_date?: string;
  camera?: RoverCamera;
  page?: number;
  api_key: string;
};

export default class MarsPhotosAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.MARS_PHOTOS_API;

    if (!this.baseURL) {
      throw new Error('$MARS_PHOTOS_API has not been provided');
    }
  }

  willSendRequest(req: RequestOptions) {
    req.params.append('api_key', this.context.nasaApiKey);
  }

  async getCuriosityPhotos(params: CuriosityPhotosParams) {
    const { earth_date, ...rest } = params;

    const data = await this.get('/rovers/curiosity/photos', {
      earth_date: earth_date
        ? format(new Date(earth_date), 'yyyy-M-d')
        : undefined,
      ...rest,
    });

    return data.photos;
  }
}
