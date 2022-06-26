import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderViewRoutingModule } from './tender-view-routing.module';
import { ViewTenderComponent } from 'src/app/tender/view-tender/view-tender.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    TenderViewRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    ViewTenderComponent,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    ViewTenderComponent
  ],
  providers: [
  ],
})
export class TenderViewModule { }
