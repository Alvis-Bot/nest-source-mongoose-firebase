import { IsNotEmpty, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Min(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullName: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}