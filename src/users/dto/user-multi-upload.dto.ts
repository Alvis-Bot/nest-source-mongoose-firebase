import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class UserMultiUploadDto{

    @ApiProperty({ type: 'string', format: 'binary' })
    avatar: Express.Multer.File;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    cover?: Express.Multer.File;
}