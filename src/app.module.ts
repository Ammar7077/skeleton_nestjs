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
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
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