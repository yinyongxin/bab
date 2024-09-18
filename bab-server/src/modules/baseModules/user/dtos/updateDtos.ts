import { OmitType, PartialType } from "@nestjs/swagger";
import { UserDocument } from "../../../../schemas/user/index.";

export class UpdateUserDto extends PartialType(
  OmitType(UserDocument, ['password', 'deletedTime', 'createdTime', 'deletedTime']),
) {}