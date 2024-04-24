import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { AddNewJobComponent } from './add-new-job/add-new-job.component';

const routes: Routes = [
  { path: '', component: JobsComponent },
  { path: 'add-new-job', component: AddNewJobComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
