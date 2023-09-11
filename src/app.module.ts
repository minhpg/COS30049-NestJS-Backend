import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GraphModule } from './graph/graph.module';
import { TypeORMConfigService } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeORMConfigService,
      inject: [ConfigService],
    }),
    GraphModule,
    UserModule,
    AuthModule,
    MediaUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
