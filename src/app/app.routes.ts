import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

export const routes: Routes = [
  { path: 'jobs', component: JobListComponent },
  { path: 'job-details/:id', component: JobDetailsComponent },
  // Add a fallback route if necessary:
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: '**', redirectTo: '/jobs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
