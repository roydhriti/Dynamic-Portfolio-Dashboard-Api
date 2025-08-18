import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
        origin: 'http://localhost:3001', // your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Dynamic Portfolio Dashboard API')
        .setDescription('API documentation for real-time portfolio dashboard')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📄 Swagger docs at http://localhost:${PORT}/api-docs`);
}
bootstrap();
