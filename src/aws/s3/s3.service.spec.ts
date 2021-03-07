import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { NestApplication } from '@nestjs/core';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';

describe('S3Service', () => {
  let app: NestApplication;
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [S3Service],
    }).compile();

    service = module.get<S3Service>(S3Service);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('POST Test upload file', async () => {
    const filePath = `${__dirname}/testFiles/avata.png`;

    await request(app.getHttpServer())
      .post('/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', filePath)
      .expect(200)
      .catch((err) => console.log(err));
  });

  afterAll(async () => await app.close());
});
