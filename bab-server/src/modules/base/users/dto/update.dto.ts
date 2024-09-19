import { OmitType, PartialType } from "@nestjs/swagger";
import { Users } from '../../../../db/schemas';

export class UpdateUserDto extends PartialType(
  OmitType(Users, ['password', 'deletedTime', 'createdTime', 'deletedTime']),
) {}