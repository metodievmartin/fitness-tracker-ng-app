import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IExercise } from '../../interfaces';
import { ExerciseService } from '../../services/exercise.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<IExercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.dataSource.data = this.exerciseService.getPastExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort!;
    this.dataSource.paginator = this.paginator!;
  }

  doFilter(value: string) {
    console.log(value);
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
