import axios from 'axios';

export class HTTPCacheService {
    public get = async (url: string): Promise<any> => {
      let responseDataBody: any;

      // check cache for result
      // if it exists then returned the cached body
      responseDataBody = 'sdfds';
      // if not then make the req
      const response = await axios.get(url);
      responseDataBody = response.data.results;
      // store in cache for next time
      return responseDataBody;
    };
}
