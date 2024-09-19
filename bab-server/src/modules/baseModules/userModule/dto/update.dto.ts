import { OmitType, PartialType } from "@nestjs/swagger";
import { User } from "../../../../schemas/user";

export class UpdateUserDto extends PartialType(
  OmitType(User, ['password', 'deletedTime', 'createdTime', 'deletedTime']),
) {}