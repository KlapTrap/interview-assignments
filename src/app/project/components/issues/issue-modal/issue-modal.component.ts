import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JIssue } from '@jira-clone/interface/issue';
import { ProjectService } from '@jira-clone/project/state/project/project.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { DeleteIssueModel } from '@jira-clone/interface/ui-model/delete-issue-model';
import { AsyncPipe } from '@angular/common';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';

@Component({
    selector: 'issue-modal',
    templateUrl: './issue-modal.component.html',
    styleUrls: ['./issue-modal.component.scss'],
    standalone: true,
    imports: [IssueDetailComponent, AsyncPipe]
})
export class IssueModalComponent {
  protected data = inject(NZ_MODAL_DATA)

  constructor(
    private _modal: NzModalRef,
    private _router: Router,
    private _projectService: ProjectService
  ) {}

  closeModal() {
    this._modal.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this._router.navigate(['project', 'issue', issueId]);
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
    this._projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.closeModal();
  }
}
