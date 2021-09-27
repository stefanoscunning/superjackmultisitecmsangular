import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../../home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'sites',
    loadChildren: () =>
      import('../../sites/sites.module').then((mod) => mod.SitesModule),
  },
  {
    path: 'blocks',
    loadChildren: () =>
      import('../../blocks/blocks.module').then((mod) => mod.BlocksModule),
  },
  {
    path: 'pages/:siteid',
    loadChildren: () =>
      import('../../pages/pages.module').then((mod) => mod.PagesModule),
  },
  {
    path: 'templates',
    loadChildren: () =>
      import('../../templates/templates.module').then(
        (mod) => mod.TemplatesModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../users/users.module').then((mod) => mod.UsersModule),
  },
];
