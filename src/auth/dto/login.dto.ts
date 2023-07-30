import { IsOptional, IsString, Length } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class LoginDto {
  @IsString()
  @IsOptional()
  @Length(1, 1000)
  @ApiPropertyOptional({
    description: "FCM token"
  })
  fcmToken?: string;

}