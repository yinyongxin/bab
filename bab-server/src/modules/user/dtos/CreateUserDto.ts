import { ApiProperty } from "@nestjs/swagger";

export class CreateUserBodyDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
