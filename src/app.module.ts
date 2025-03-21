// import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [
//     GraphQLModule.forRoot({
//       autoSchemaFile: true
//     }),
//     UsersModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,  // Tambahkan driver Apollo
      autoSchemaFile: true
    }),
    UsersModule,
  ],
})
export class AppModule { }
