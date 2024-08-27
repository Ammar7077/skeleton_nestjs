import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InfoModule } from './modules/info/info.module';

@Module({
  imports: [
    //! Add all the Modules here
    UsersModule,
    InfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

