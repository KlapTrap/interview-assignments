import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JProject } from '@jira-clone/interface/project';
import { SideBarLink } from '@jira-clone/interface/ui-model/nav-link';
import { SideBarLinks } from '@jira-clone/project/config/sidebar';
import { ProjectQuery } from '@jira-clone/project/state/project/project.query';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AvatarComponent } from '../../../../jira-control/avatar/avatar.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [AvatarComponent, NgFor, NgIf, RouterLinkActive, RouterLink, SvgIconComponent]
})
@UntilDestroy()
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;

  get sidebarWidth(): number {
    return this.expanded ? 240 : 15;
  }

  project: JProject;
  sideBarLinks: SideBarLink[];

  constructor(private _projectQuery: ProjectQuery) {
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
    });
  }

  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
}
