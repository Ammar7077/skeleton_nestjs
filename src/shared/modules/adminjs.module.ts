import { Module } from '@nestjs/common'

@Module({
  imports: [
    import('@adminjs/nestjs').then(async ({ AdminModule }) => AdminModule.createAdminAsync({
      useFactory: async () => {
        // const { Database, Resource } = await import('@adminjs/typeorm');
        // const AdminJS = (await import('adminjs')).default;
        
        // AdminJS.registerAdapter({ Database, Resource });
        
        return ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [],
          },
        });
      },
    })),
    
  ],
})
export class AdminJSModule {  }