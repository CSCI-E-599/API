/* eslint-disable max-len */
/* eslint-disable camelcase */
import { singleton } from 'tsyringe';

/** Setup the connection to Memcached */
const Memcached = require('memcached');

@singleton()
export class MemcachedMiddleware {
    memcached: any;

    initialize(address: string, options: any) {
      this.memcached = new Memcached(address, options);
    }

    useCacheWithDurationOf(duration: number) {
        return  (req,res,next) => {
            // if memcahced has not been initilized
            // if the memcached connected has exhausted all its retires due to connection failuress...
            if ((this.memcached) === undefined || (this.memcached.failures === this.memcached.retries)) {
                // then exit out of the middleware and let Express continue processing the request
                console.log(`Filed to connect to Memcached. Skipping attempt to get response body from cache.`);
                return next();
            }

            // let key = "__express__" + req.originalUrl || req.url;
            // this.memcached.get(key, function(err,data){
            //     if(data){
            //         res.send(data);
            //         return;
            //     }else{
            //         res.sendResponse = res.send;
            //         res.send = (body) => {
            //             this.memcached.set(key, body, (duration*60), function(err){
            //                 // 
            //             });
            //             res.sendResponse(body);
            //         }
            //         next();
            //     }
            // });
    }
}
