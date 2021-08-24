import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { TrainingMainPageComponent } from './components/training-main-page/training-main-page.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingsComponent } from './components/past-trainings/past-trainings.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingMainPageComponent,
    children: [
      { path: '', component: CurrentTrainingComponent },
      { path: 'new', component: NewTrainingComponent },
      { path: 'past', component: PastTrainingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {
}
