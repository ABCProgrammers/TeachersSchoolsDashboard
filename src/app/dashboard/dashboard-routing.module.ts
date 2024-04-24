import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestComponent } from "./test/test.component";
import { NotFoundComponent } from "../shared/components/not-found/not-found.component";

const routes: Routes = [
  { path: "test", component: TestComponent },
  {
    path: "",
    children: [
      {
        path: "jobs", loadChildren: () => import("./jobs/jobs.module").then((m) => m.JobsModule),
      },
      {
        path: "applications", loadChildren: () => import("./applications/applications.module").then((m) => m.ApplicationsModule),
      },
      {
        path: "profile", loadChildren: () => import("./profile/profile.module").then((m) => m.ProfileModule),
      },
    ],
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
