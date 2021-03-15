import { singleton } from 'tsyringe';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

@singleton()
export class HttpCacheService {
    reallyTerribleCache: {[key: string]: string;} = {};

    public get = async (url: string): Promise<any> => {
      const hashDigest = Base64.stringify(sha256(url));

      if (this.reallyTerribleCache[hashDigest]) {
        console.log(`Response retrieved from cache: ${hashDigest}`);
        return JSON.parse(this.reallyTerribleCache[hashDigest]);
      }

      console.log('Failed to find response in cache. Making HTTP request...');
      const response = await axios.get(url);
      const responseDataBody = response.data.results;
      console.log(`Storing HTTP response in cache: ${hashDigest}`);
      this.reallyTerribleCache[hashDigest] = JSON.stringify(responseDataBody);

      return responseDataBody;
    };
}
