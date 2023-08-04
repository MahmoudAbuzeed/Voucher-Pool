import { Module, Global, MiddlewareConsumer } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { join } from "path";

import { LoggerMiddleware } from "shared/logger/logger.middleware";
import { Logger } from "shared/logger/logger.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { entities } from "./entities";
import { modules } from "./modules";
import { IsEmailAlreadyExistConstraint } from "shared/custom-decorators/unique-email.decorator";

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploadedFiles"),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      // host: 'mysqldb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: entities,
      synchronize: true,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, Logger ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
