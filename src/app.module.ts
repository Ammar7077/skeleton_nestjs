import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InfoModule } from './modules/info/info.module';
import { AdminJSModule } from './shared/modules/adminjs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //! Add all the Modules here
    UsersModule,
    InfoModule,
    AdminJSModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // const { DataSource } = await import('typeorm');
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgre',
          password: 'admin',
          database: 'postgre',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }