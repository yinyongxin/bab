import { OmitType, PartialType } from "@nestjs/swagger";
import { Users } from '../../../../mongo/base';

export class UpdateUserDto extends PartialType(
  OmitType(Users, ['password', 'deletedTime', 'createdTime', 'deletedTime']),
) {}