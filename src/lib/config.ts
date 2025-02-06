type SidebarAppearance = 'only-app' | 'app-and-landing';

type AppConfig = {
  sidebarAppearance: SidebarAppearance;
  withAuth: boolean;
};

export const APP_CONFIG: AppConfig = {
  sidebarAppearance: 'only-app',
  withAuth: true,
};

if (!APP_CONFIG) {
  throw new Error(
    'APP_CONFIG must be defined and must satisfy the AppConfig type',
  );
}

const requiredKeys: (keyof AppConfig)[] = ['sidebarAppearance', 'withAuth'];

for (const key of requiredKeys) {
  if (!(key in APP_CONFIG)) {
    throw new Error(
      `APP_CONFIG must have a key named "${key}" and must satisfy the AppConfig type`,
    );
  }
}
