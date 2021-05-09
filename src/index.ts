/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import { container } from 'tsyringe';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './utilities/logger.utility';
import mongoose from 'mongoose';
import mongo from 'mongodb';

/** import routers */
import { drugsRouter } from './routes/drugs.router';

/** import utilities */
import { MemcachedMiddleware } from './utilities/memcached.utility';

/** load environment variables */
dotenv.config();

// if there is no port env var, then exit the server
if (!process.env.PORT || !process.env.ENABLECACHE || !process.env.CACHEADDRESS) {
  console.log('Missing required environment variables');
  process.exit(1);
}



// mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`)
//   .then(() => { console.log('Successfully connected to mongoDB'); })
//   .catch((err) => console.error(err));

/** initialize memcached in the memcached utility */
if (process.env.ENABLECACHE === 'true') {
  console.log('Attempteing to connect to Memcached...');
  const memcachedMiddleware = container.resolve(MemcachedMiddleware);
  memcachedMiddleware.initialize('127.0.0.1:11211', 'memcached options');
}

const PORT: number = parseInt(process.env.PORT as string, 10);

/** load express app and middleware libs */
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

/** load routers */
app.use('/drugs', drugsRouter);

/** start HTTP server */
const server = app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});

/** activate Webpack HMR reload for live reload during dev */
type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
