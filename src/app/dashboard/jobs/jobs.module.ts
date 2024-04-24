import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { SharedModule } from '../../shared/shared.module';
import { AddNewJobComponent } from './add-new-job/add-new-job.component';


@NgModule({
  declarations: [
    JobsComponent,
    AddNewJobComponent,
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule
  ]
})
export class JobsModule { }
