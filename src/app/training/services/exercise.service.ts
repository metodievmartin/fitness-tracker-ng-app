import { Injectable } from '@angular/core';
import { IExercise } from '../interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exerciseChanged = new Subject<IExercise | null>()
  private availableExercises: IExercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private currentExercise: IExercise | null = null;
  private exercises: IExercise[] = [];

  constructor() { }

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
    if (selectedExercise) {
      this.currentExercise = selectedExercise;
      this.exerciseChanged.next({ ...this.currentExercise });
    }
  }

  completeExercise() {
    if (this.currentExercise) {
      this.exercises.push({
        ...this.currentExercise,
        date: new Date(),
        state: 'completed'
      });
    }
    this.currentExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    if (this.currentExercise) {
      this.exercises.push({
        ...this.currentExercise,
        duration: this.currentExercise.duration * (progress / 100),
        calories: this.currentExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
    }
    this.currentExercise = null;
    this.exerciseChanged.next(null);
  }

  getCurrentExercise() {
    return { ...this.currentExercise };
  }

  getPastExercises() {
    return this.exercises.slice();
  }
}
