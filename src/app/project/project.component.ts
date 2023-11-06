import { Component, OnInit } from '@angular/core';
import { ProjectService } from './state/project/project.service';
import { AuthService } from './auth/auth.service';
import { LoginPayload } from '@jira-clone/project/auth/loginPayload';
import { SvgDefinitionsComponent } from '../jira-control/svg-definitions/svg-definitions.component';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_JIRA_ICONS } from './config/icons';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  providers: [NzDrawerService, NzModalService, NzIconModule.forChild(NZ_JIRA_ICONS).providers],
  imports: [NavigationComponent, RouterOutlet, SvgDefinitionsComponent]
})
export class ProjectComponent implements OnInit {
  expanded: boolean;
  constructor(private _projectService: ProjectService, private _authService: AuthService) {
    this.expanded = true;
  }

  ngOnInit(): void {
    this._authService.login(new LoginPayload());
    this._projectService.getProject();
    this.handleResize();
  }

  handleResize() {
    const match = window.matchMedia('(min-width: 1024px)');
    match.addEventListener('change', (e) => {
      console.log(e);
      this.expanded = e.matches;
    });
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }
}
