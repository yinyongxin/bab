import { AdmintorsModule } from './admintors';
import { AuthModule } from './auth';
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';
import { FilesModule } from './files';

export * from './admintors';
export * from './roles';
export * from './auth';
export * from './menus/menus.module';

export default [
  AuthModule,
  AdmintorsModule,
  RolesModule,
  MenusModule,
  FilesModule,
];
