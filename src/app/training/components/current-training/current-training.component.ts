import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../../services/exercise.service';
import { IExercise } from '../../interfaces';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  currentExercise: IExercise | null = null;
  @Output() trainingExit = new EventEmitter<void>();
  progress = 0;
  interval: number | undefined;
  exerciseSubscription: Subscription | undefined;

  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.exerciseService.exerciseChanged.subscribe(exercise => {
      this.currentExercise = exercise;
      console.log('current exercise', this.currentExercise);
      this.startOrResumeTimer();
    });
  }

  startOrResumeTimer() {
    const step = this.exerciseService.getCurrentExercise().duration! / 100 * 1000;
    // @ts-ignore
    this.interval = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.interval!)
      }
    }, step);
  }

  onStop() {
    const matDialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    clearInterval(this.interval!);

    matDialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
