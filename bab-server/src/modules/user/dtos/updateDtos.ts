import { OmitType, PartialType } from "@nestjs/swagger";
import { User } from "src/schemas/user/index.";

export class UpdateUserDto extends PartialType(
  OmitType(User, ['password', 'deletedTime', 'createdTime', 'deletedTime']),
) {}