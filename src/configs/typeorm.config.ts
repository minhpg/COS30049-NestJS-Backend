import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TypeORMConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('PG_HOST'),
      port: this.configService.get<number>('PG_PORT'),
      password: this.configService.get<string>('PG_PASSWORD'),
      username: this.configService.get<string>('PG_USER'),
      database: this.configService.get<string>('PG_DB'),
      entities: [User],
      synchronize: true,
      logging: true,
    };
  }
}
