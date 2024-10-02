// src/app/job.model.ts
export interface Job {
  id: number;
  title: string;
  companyName: string;
  location: string;
  jobType: string; // 'Full-time' or 'Part-time'
  jobDescription: string;
}
