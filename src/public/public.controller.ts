import { Controller, Get, UseGuards } from "@nestjs/common";
import { PublicService } from "./public.service";
import { Public } from "../common/decorator/public.decorator";

@Controller('public')
export class PublicController {

  constructor(
    private readonly publicService: PublicService,
  ) {}


  @Public()
  @Get()
  async getPublic() {
     return 'public'
  }


}
