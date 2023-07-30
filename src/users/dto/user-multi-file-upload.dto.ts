import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { UserMultiUploadDto } from "./user-multi-upload.dto";


export class UserMultiFileUploadDto {


    @ApiProperty({ type: 'string', format: 'binary' , required: true , isArray: true })
    files: Express.Multer.File[];
}