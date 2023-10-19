import * as session from 'express-session';
import * as passport from 'passport';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3001',
      'https://shoplayout.onrender.com',
      'https://shop-layout-client.vercel.app',
      'https://shop-layout-client-production.up.railway.app',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  });

  const config = new DocumentBuilder()
    .setTitle('Goods Shop')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
