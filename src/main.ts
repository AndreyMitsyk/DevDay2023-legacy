import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

export async function bootstrap(express) {
  const adapter = new ExpressAdapter(express);
  const app = await NestFactory.create(AppModule, adapter);

  await app.init();

  return app;
}
