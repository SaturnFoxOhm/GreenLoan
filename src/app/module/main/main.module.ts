import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./main-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { UiInputComponent } from "../../../shared/ui-input/ui-input.component";
import { UiSelectComponent } from "../../../shared/ui-select/ui-select.component";
import { DashBoardComponent } from "./dashboard/dashBoard.component";

@NgModule({
  declarations: [HomeComponent, DashBoardComponent],
  imports: [
   CommonModule,
   HomeRoutingModule,
   ReactiveFormsModule,
   UiInputComponent,
   UiSelectComponent
  ],
  exports: [HomeComponent, DashBoardComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}
