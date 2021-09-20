import { Component, OnInit } from '@angular/core';

import { ExerciseService } from '../../services/exercise.service';
import { IExercise } from '../../interfaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: IExercise[] = [];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exercises = this.exerciseService.getAvailableExercises();
  }

  onStartExercise(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }
}
