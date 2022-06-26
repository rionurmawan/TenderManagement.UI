import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderListRoutingModule } from './tender-list-routing.module';
import { ContentComponent } from 'src/app/content/content.component';


@NgModule({
  imports: [
    CommonModule,
    TenderListRoutingModule
  ],
  exports: [
    ContentComponent
  ],
  declarations: [
    ContentComponent
  ],
  providers: [
  ],
})
export class TenderListModule { }
