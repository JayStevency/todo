import {ConnectionOptions} from 'typeorm';

// You can load you .env file here synchronously using dotenv package (not installed here),
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const environment = process.env.NODE_ENV || 'development';
const data: any = dotenv.parse(fs.readFileSync(`.${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...


// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'postgres',
  host: data.TYPEORM_HOST,
  port: parseInt(data.TYPEORM_PORT,10),
  username: data.TYPEORM_USERNAME,
  password: data.TYPEORM_PASSWORD,
  database: data.TYPEORM_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities'
  },
};

export = config;