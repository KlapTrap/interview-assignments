import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IssueStatus } from '@jira-clone/interface/issue';
import { ProjectQuery } from '@jira-clone/project/state/project/project.query';
import { AuthQuery } from '@jira-clone/project/auth/auth.query';
import { BoardDndListComponent } from '../board-dnd-list/board-dnd-list.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
@UntilDestroy()
@Component({
    selector: 'board-dnd',
    templateUrl: './board-dnd.component.html',
    styleUrls: ['./board-dnd.component.scss'],
    standalone: true,
    imports: [CdkDropListGroup, NgFor, BoardDndListComponent, AsyncPipe]
})
export class BoardDndComponent {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  constructor(public projectQuery: ProjectQuery, public authQuery: AuthQuery) {}
}
