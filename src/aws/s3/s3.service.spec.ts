import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';

describe('S3Service', () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [S3Service],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Test upload function', async () => {
    const TestData: Buffer = Buffer.from('This is file content');
    const fileName = 'test-file.txt';
    const response = await service.upload(TestData, fileName);
    expect(typeof response).toBe('string');
    expect(response).toContain(fileName);
  });
});
