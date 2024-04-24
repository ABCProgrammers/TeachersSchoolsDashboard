import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { TestComponent } from "./test/test.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
