import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './shared/guard/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
    canActivate: [AuthenticationGuard],
  },
  { path: '**', redirectTo: '/authentication/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
