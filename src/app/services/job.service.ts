import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Job } from '../job.model';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:8090/api/jobs'; // REST API endpoint

  constructor(private http: HttpClient) {}

  // Apply to a job with a file (CV upload)
  applyToJob(jobId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('jobId', jobId.toString());
    formData.append('file', file);

    return this.http.post<any>('http://localhost:8090/api/jobs/apply', formData, {
      withCredentials: true ,
      reportProgress: true,
      observe: 'events'// Ensure credentials are sent
    }).pipe(
        catchError(this.handleError) // Catch errors if any
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


  // Fetch all jobs
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  // Fetch job details by job ID
  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }
}
