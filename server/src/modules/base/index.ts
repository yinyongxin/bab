import { AdmintorsModule } from './admintors';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';
import { FilesModule } from './files/files.module';
import { DepartmentsModule } from './departments/departments.module';

export * from './admintors/admintors.module';
export * from './roles/roles.module';
export * from './auth/auth.module';
export * from './menus/menus.module';

export default [
  AuthModule,
  AdmintorsModule,
  RolesModule,
  MenusModule,
  FilesModule,
  DepartmentsModule,
];
