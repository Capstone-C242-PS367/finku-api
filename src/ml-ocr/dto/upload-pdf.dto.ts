import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Upload an image file (e.g., JPG, PNG).',
    example: 'example-image.jpg',
  })
  file: any;
}
