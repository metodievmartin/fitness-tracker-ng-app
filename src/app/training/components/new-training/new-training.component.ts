import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ExerciseService } from '../../services/exercise.service';
import { IExercise } from '../../interfaces';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: IExercise[] = [];
  exerciseSubscription: Subscription | undefined;

  constructor(
    private exerciseService: ExerciseService,
  ) { }

  ngOnInit(): void {
    this.exerciseService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });

    this.exerciseService.fetchAvailableExercises();
  }

  onStartExercise(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription?.unsubscribe();
  }
}
