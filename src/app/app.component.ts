import { Component } from '@angular/core';
import { Job } from './job.model';
import { JobListComponent } from "./components/job-list/job-list.component";
import { JobDetailsComponent } from "./components/job-details/job-details.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from './services/job.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    JobListComponent,
    JobDetailsComponent
  ],
  providers: [JobService]
})

export class AppComponent {
  title = 'SmartAI';
  uploadMessage: string | null = null;
  uploadProgress = 0;
  isModalOpen=false;
  selectedFile: File | null = null;
  jobs: Job[] = [];
  selectedJob: any// This ensures selectedJob is initialized

  onJobSelected(job: Job) {
    this.selectedJob = job;
  }

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadJobs();
  }
  openModal(job: any): void {
    this.selectedJob = job;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.uploadProgress = 0; // Reset progress when modal closes
    this.uploadMessage = null; // Reset message when modal closes
    this.selectedFile = null; // Clear selected file
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log("Selected file:", this.selectedFile);
      this.uploadMessage = ''; // Clear any previous upload message
      this.uploadProgress = 0; // Reset upload progress
    }
  }

  submitApplication(): void {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file before submitting.';
      return;
    }

    if (!this.selectedJob) {
      this.uploadMessage = 'No job selected.';
      return;
    }

    // Call the service to apply for the job
    this.jobService.applyToJob(this.selectedJob.id, this.selectedFile)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.uploadMessage = 'Application submitted successfully!';
          this.uploadProgress = 100;
          this.isModalOpen = false;
          this.loadJobs();
        },
        error: (err) => {
          console.error('Error:', err);
          this.uploadMessage = `Failed to submit application: ${err.error.message || 'Server error'}`;
        }
      });


  }


  loadJobs() {
    console.log('Fetching jobs...');
    this.jobService.getJobs().subscribe({
      next: (data) => {
        console.log('Job data received:', data);
        this.jobs = data;
        if (this.jobs.length > 0) {
          this.selectedJob = this.jobs[0];  // Set default selected job
        } else {
          console.log('No jobs found');
        }
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        console.error('Error details:', error.message);  // Log the error message
        console.error('Full error:', error);  // Full error details
      }
    });
  }


}
