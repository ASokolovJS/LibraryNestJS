import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Покупка абонемента и доступ к библиотеке')
  .setDescription(
  `Данный функционал имеет следующие ограничения:
   1. Пользователь не может взять более 5 книг
   2. Пользователь не может взять книгу без абонемента
   3. Пользователь может иметь только 1 абонемент
   4. Каждая книга может быть выдана только одному человеку. До того момента пока пользователь ее не вернет.
   5. Количество каждой книги не может быть больше 1 шт.<br>
   Допущения:
   1. В наличии имеем только один абонемент.
  `)
  .setVersion('1.0')
  .addTag('User')
  .addTag('Book')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap()