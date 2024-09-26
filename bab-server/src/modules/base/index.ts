import { AdmintorsModule } from './admintors';
import { AuthModule } from './auth';
import { RolesModule } from './roles';
import { MenusModule } from './menus';

export * from './admintors';
export * from './roles';
export * from './auth';
export * from './menus';

export default [AuthModule, AdmintorsModule, RolesModule, MenusModule];
