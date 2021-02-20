import { singleton } from 'tsyringe';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

@singleton()
export class HTTPCacheService {
    reallyTerribleCache: {[key: string]: string;} = {};

    public get = async (url: string): Promise<any> => {
      // let responseDataBody: any;
      // const hashDigest = Base64.stringify(sha256(url));

      // if (this.reallyTerribleCache[hashDigest]) {
      //   console.log('Response retrieved from cache');
      //   return JSON.parse(this.reallyTerribleCache[hashDigest]);
      // }

      // // check cache for result
      // // if it exists then returned the cached body
      // responseDataBody = 'sdfds';
      // if not then make the req
      const response = await axios.get(url);
      const responseDataBody = response.data.results;
      // store in cache for next time
      const hashDigest = Base64.stringify(sha256(url));
      const stringifiedBody = JSON.stringify(responseDataBody);

      // this.reallyTerribleCache[hashDigest] = { hashDigest: stringifiedBody };

      // console.log(hashDigest);
      // console.log(stringifiedBody);
      return responseDataBody;
    };
}
