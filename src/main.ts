import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component'; // Your root component
import { JobListComponent } from './app/components/job-list/job-list.component';
import {provideHttpClient, withFetch} from "@angular/common/http"; // Your job list component

const routes: Routes = [
  { path: 'jobs', component: JobListComponent }, // Define a route for 'jobs'
  { path: '', redirectTo: '/jobs', pathMatch: 'full' } // Redirect the root to '/jobs'
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch())]
}).catch(err => console.error(err));
