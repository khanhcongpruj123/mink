import { IsString, IsNotEmpty } from "class-validator";

export class LoginRequest {
  @IsString({ message: "Username must not be null" })
  @IsNotEmpty({ message: "Username must not be empty" })
  username: string;

  @IsString({ message: "Password must not be null" })
  @IsNotEmpty({ message: "Password must not be empty" })
  password: string;
}
