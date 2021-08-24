import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingExit = new EventEmitter<void>();
  progress = 0;
  interval: number | undefined;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    // @ts-ignore
    this.interval = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.interval!)
      }
    }, 1000);
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
