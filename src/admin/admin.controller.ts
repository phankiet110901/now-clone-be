import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    @Get()
    getAllUser() {
        console.log(process.env.DOMAIN);
        return 1;
    }   
}
