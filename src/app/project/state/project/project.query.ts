import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Query } from '@datorama/akita';
import { IssueStatus, JIssue } from '@jira-clone/interface/issue';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ProjectState, ProjectStore } from './project.store';
@Injectable({
  providedIn: 'root'
})
export class ProjectQuery extends Query<ProjectState> {
  isLoading$ = this.selectLoading();
  all$ = this.select();
  issues$ = this.select('issues');
  issues = toSignal(this.select('issues'));
  users$ = this.select('users');

  constructor(protected store: ProjectStore) {
    super(store);
  }

  lastIssuePosition = (status: IssueStatus): number => {
    const raw = this.store.getValue();
    const issuesByStatus = raw.issues.filter((x) => x.status === status);
    return issuesByStatus.length;
  };

  issueByStatusSorted$ = (status: IssueStatus): Observable<JIssue[]> =>
    this.issues$.pipe(
      map((issues) =>
        issues.filter((x) => x.status === status).sort((a, b) => a.listPosition - b.listPosition)
      )
    );

  issueById$(issueId: string) {
    return this.issues$.pipe(
      delay(500),
      map((issues) => issues.find((x) => x.id === issueId))
    );
  }
}
