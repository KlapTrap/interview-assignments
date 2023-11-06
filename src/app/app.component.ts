import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProjectQuery } from './project/state/project/project.query';
import { ProjectService } from './project/state/project/project.service';
import { AsyncPipe } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NzSpinModule, RouterOutlet, AsyncPipe]
})
export class AppComponent {
  constructor(
    public router: Router,
    public projectQuery: ProjectQuery,
    private _projectService: ProjectService
  ) {
    this._projectService.setLoading(true);
  }
}
