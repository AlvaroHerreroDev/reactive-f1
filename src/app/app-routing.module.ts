import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'f1',
    loadComponent: () => import('../f1/f1.component').then(r => r.F1Component),
  },
  {
    path: '**',
    redirectTo: 'f1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
