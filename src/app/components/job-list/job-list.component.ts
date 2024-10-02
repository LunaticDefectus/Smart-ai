import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common'; // Import NgFor for *ngFor directive
import { Job } from '../../job.model';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [NgFor], // Include NgFor in imports array
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent {
  @Input() jobs: Job[] = [];
  @Input() selectedJob: Job | null = null;
  @Output() selectJob = new EventEmitter<Job>();

  onJobSelected(job: Job) {
    this.selectJob.emit(job);
  }
}
