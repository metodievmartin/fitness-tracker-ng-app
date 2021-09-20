import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingsComponent } from './components/past-trainings/past-trainings.component';
import { TrainingMainPageComponent } from './components/training-main-page/training-main-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { StopTrainingComponent } from './components/stop-training/stop-training.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    TrainingMainPageComponent,
    StopTrainingComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
