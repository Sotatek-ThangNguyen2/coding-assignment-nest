import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  initS3() {
    return new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
  }

  // TODO: To be implemented.
  // TODO: Unit test is needed in src/aws/s3/s3.service.spec.ts.
  async upload(file: Express.Multer.File): Promise<string> {
    const fileBuffer = file.buffer;
    const fileName = file.originalname;
    const s3 = this.initS3();
    const bucketName = this.configService.get<string>('AWS_BUCKET');
    const randomFileName = `${uuid()}-${fileName}`;
    const params = {
      Bucket: bucketName,
      Key: randomFileName,
      Body: fileBuffer,
    };
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Key;
  }

  // TODO: To be implemented.
  // NOTE: Unit test is NOT needed.
  // NOTE: This is actually a hint for you to code right with NestJS.
  //   If you're sure you have done so with the upload function,
  //   you don't need to implement this one.
  async download(s3FileKey: string): Promise<string> {
    const s3 = this.initS3();
    const bucketName = this.configService.get<string>('AWS_BUCKET');
    return await s3.getSignedUrlPromise('getObject', {
      Bucket: bucketName,
      Key: s3FileKey,
    });
  }
}
