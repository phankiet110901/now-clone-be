import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './development.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/',
    }),
    AdminModule,
    AuthModule,
    StoreModule,
    FoodModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
