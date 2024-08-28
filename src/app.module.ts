import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InfoModule } from './modules/info/info.module';


// const DEFAULT_ADMIN = {
//   email: 'admin@example.com',
//   password: 'password',
// }

// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN)
//   }
//   return null
// }


async function getAdminModule() {
  try {
    // const { default: AdminJS } = await import('adminjs');
    const { default: Adapter, Database, Resource } = await import('@adminjs/sql');
    const { AdminModule } = await import('@adminjs/nestjs');

    const options = {
      connectionString: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      // connectionString: 'postgres://postgres:1@localhost:5432/postgres',
      // database: 'postgres',
    };

    const db = await new Adapter('postgresql', options).init();
    const adminJsInstance = 
    {
      resources: [
        { resource: db.table('test') },
        // { resource: db.table('table_name') },
        // { resource: db.table('table_name') },
      ],
      rootPath: '/admin',
    };

    console.log('AdminJS initialized:', adminJsInstance);

    // Create the AdminModule with dynamic options
    return AdminModule.createAdminAsync({
      useFactory: async () => ({
        adminJsOptions: adminJsInstance,
        auth: {
          authenticate: async (email, password) => {
            // Implement your authentication logic
            return { email };
          },
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    });
  } catch (error) {
    console.error('Error setting up AdminJS with NestJS:', error);
  }
}

// import('@adminjs/sql').then(({ default: Adapter, Database, Resource }) => {
//   import('adminjs').then(({ default: AdminJS }) => {
//     import('@adminjs/nestjs').then(({ AdminModule }) => {
//       const options = {
//         connectionString: process.env.DATABASE_URL,
//         database: process.env.DATABASE_NAME,
//       };
//       new Adapter('postgresql', options).init().then((db) => {
//         const adminJsInstance = new AdminJS({
//           resources: [
//             { resource: db.table('test') },
//             // { resource: db.table('table_name') },
//             // { resource: db.table('table_name') },
//           ],
//           rootPath: '/admin',
//         });

//         console.log('AdminJS initialized:', adminJsInstance);

//         // Register AdminJS with NestJS AdminModule
//         AdminModule.createAdminAsync({
//           useFactory: async () => {
//             return {
//               adminJsOptions: adminJsInstance,
//               auth: {
//                 authenticate: async (email, password) => {
//                   // Implement your authentication logic
//                   return { email };
//                 },
//                 cookieName: 'adminjs',
//                 cookiePassword: 'secret',
//               },
//               sessionOptions: {
//                 resave: true,
//                 saveUninitialized: true,
//                 secret: 'secret',
//               },
//             };
//           },
//         });
//       }).catch(error => {
//         console.error('Error initializing database:', error);
//       });
//     }).catch(error => {
//       console.error('Error importing AdminModule:', error);
//     });
//   }).catch(error => {
//     console.error('Error importing AdminJS:', error);
//   });
// }).catch(error => {
//   console.error('Error importing @adminjs/sql:', error);
// });

@Module({
  imports: [
    //! Add all the Modules here
    UsersModule,
    InfoModule,
    getAdminModule(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }