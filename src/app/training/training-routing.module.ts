import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentTrainingComponent } from './components/current-training/current-training.component';

const routes: Routes = [
  { path: '', component: CurrentTrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
