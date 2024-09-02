import { Module } from '@nestjs/common';

@Module({
  imports: [
    (async () => {
      const { AdminModule } = await import('@adminjs/nestjs');
      const { AdminJS } = await import('adminjs');
      const { Adapter, Database, Resource } = await import('@adminjs/sql');
      AdminJS.registerAdapter({ Database, Resource });

      const options = {
        connectionString:
          `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        database: process.env.DB_NAME,
      };
      const db = await new Adapter('postgresql', options).init();

      return AdminModule.createAdminAsync({
        useFactory: async () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              // { resource: db.table('test') },
              // { resource: db.table('user') },
              //! add tables here
            ],
          },
        }),
      });
    })(),
  ],
})
export class AdminJSModule {  }
