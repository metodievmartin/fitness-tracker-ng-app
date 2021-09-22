import { Injectable } from '@angular/core';
import { FirebaseExerciseDoc, IExercise } from '../interfaces';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exerciseChanged = new Subject<IExercise | null>();
  exercisesChanged = new Subject<IExercise[]>();
  pastExercisesChanged = new Subject<IExercise[]>();
  private availableExercises: IExercise[] = [];
  private currentExercise: IExercise | null = null;
  private fbSubscriptions: Subscription[] = [];

  constructor(private firestore: AngularFirestore) { }

  fetchAvailableExercises() {
    this.fbSubscriptions.push(this.firestore
      .collection('available-exercises')
      .snapshotChanges()
      .pipe(
        map(docArray =>
          docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data()) as FirebaseExerciseDoc
            }
          })
        )
      )
      .subscribe((exercises: IExercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next(exercises);
      }));
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
      this.addDataToDatabase({
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
      this.addDataToDatabase({
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

  fetchPastExercises() {
    this.fbSubscriptions.push(this.firestore
      .collection('finishedExercises')
      .valueChanges()
      .subscribe(exercises => {
        this.pastExercisesChanged.next(exercises as IExercise[]);
      }));
  }

  cancelSubscriptions() {
    this.fbSubscriptions
      .forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: IExercise) {
    this.firestore.collection('finishedExercises').add(exercise);
  }
}
