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

  getCurrentExercise() {
    return { ...this.currentExercise };
  }
}
