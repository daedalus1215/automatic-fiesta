import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { newRelicConfig } from './newrelic.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  newRelicConfig();
  await app.listen(3000);
}
bootstrap();
