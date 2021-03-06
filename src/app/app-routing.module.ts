import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicViewComponent } from './views/basic-view/basic-view.component';
import { ScanViewComponent } from './views/scan-view/scan-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { IndexViewComponent } from './views/index-view/index-view.component';
import { ReceiptsViewComponent } from './views/receipts-view/receipts-view.component';

const routes: Routes = [
  {
    path: '',
    component: BasicViewComponent,
    children: [
      {
        path: '',
        component: IndexViewComponent,
      }
    ]
  },
  {
    path: 'scan',
    component: ScanViewComponent,
  },
  {
    path: 'login',
    component: BasicViewComponent,
    children: [
      {
        path: '',
        component: LoginViewComponent,
      }
    ]
  },
  {
    path: 'receipts',
    component: BasicViewComponent,
    data: {
      title: 'Мои чеки',
      backArrow: true,
    },
    children: [
      {
        path: '',
        component: ReceiptsViewComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
