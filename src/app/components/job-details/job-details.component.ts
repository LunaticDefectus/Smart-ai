import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../job.model';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class JobDetailsComponent  {
  @Input() job: Job | null = null;

}
