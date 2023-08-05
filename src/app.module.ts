import { Module, Global, MiddlewareConsumer } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerModule } from "@nestjs/throttler";
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

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploadedFiles"),
    }),
    ThrottlerModule.forRoot({
      ttl: 60, // Time-to-live in seconds for the request counts.
      limit: 5, // Limit for the number of requests within the TTL.
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "voucherdb.local",
      port: 3306,
      username: "root",
      password: "voucher",
      database: "voucher",
      entities: entities,
      synchronize: true,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
