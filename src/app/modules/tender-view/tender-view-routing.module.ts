import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTenderComponent } from 'src/app/tender/view-tender/view-tender.component';

const routes: Routes = [
  {
    path: ':action',
    component: ViewTenderComponent,
  },
  {
    path: ':action/:id',
    component: ViewTenderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenderViewRoutingModule {}
