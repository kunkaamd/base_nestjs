import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (config: ConfigService) :TypeOrmModuleOptions  => {
    return {
        type: "mysql",
        host: config.get<string>("DATABASE_HOST"),
        port: 3306,
        username: config.get<string>("DATABASE_USER"),
        password: config.get<string>("DATABASE_PASS"),
        database: config.get<string>("DATABASE_NAME"),
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: ["migration/*.js"],
        synchronize: true,
        cli: {
            "migrationsDir": "migration"
        }
    };      
};
