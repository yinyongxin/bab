import { AdmintorsModule } from './admintors';
import { AuthModule } from './auth';
import { RolesModule } from './roles';
import { MenusModule } from './menus/menus.module';
import { FilesModule } from './files';

export default [
  AuthModule,
  AdmintorsModule,
  RolesModule,
  MenusModule,
  FilesModule,
];
