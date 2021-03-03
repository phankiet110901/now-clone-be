import { IsNotEmpty } from "class-validator";

export class LoginAdminDto {
    @IsNotEmpty()
    user_name: string;

    @IsNotEmpty()
    password: string;
}