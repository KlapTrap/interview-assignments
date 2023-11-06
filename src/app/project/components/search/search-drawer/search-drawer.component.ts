import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UntypedFormControl } from '@angular/forms';
import { JIssue } from '@jira-clone/interface/issue';
import { ProjectQuery } from '@jira-clone/project/state/project/project.query';
import { IssueUtil } from '@jira-clone/project/utils/issue';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime, take } from 'rxjs/operators';
import { InputComponent } from '../../../../jira-control/input/input.component';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';
import { IssueModalComponent } from '../../issues/issue-modal/issue-modal.component';
import { IssueResultComponent } from '../issue-result/issue-result.component';

@Component({
  selector: 'search-drawer',
  templateUrl: './search-drawer.component.html',
  styleUrls: ['./search-drawer.component.scss'],
  standalone: true,
  providers: [NzModalService],
  imports: [InputComponent, NgIf, NgFor, IssueResultComponent, SvgIconComponent, AsyncPipe]
})
export class SearchDrawerComponent {
  protected searchControl: UntypedFormControl = new UntypedFormControl('');
  protected hasSearchTermInput = computed(() => !!this.search());
  protected results = computed(() => {
    return this.projectQuery.issues().filter((issue) => {
      const foundInTitle = IssueUtil.searchString(issue.title, this.search());
      const foundInDescription = IssueUtil.searchString(issue.description, this.search());
      return foundInTitle || foundInDescription;
    });
  });

  private projectQuery = inject(ProjectQuery);
  private drawer = inject(NzDrawerRef);
  private modalService = inject(NzModalService);

  private search = toSignal(this.searchControl.valueChanges.pipe(debounceTime(50)), {
    initialValue: this.searchControl.value
  });

  openIssueModal(issue: JIssue) {
    this.drawer.afterClose.pipe(take(1)).subscribe(() => {
      this.modalService.create({
        nzContent: IssueModalComponent,

        nzWidth: 1040,
        nzClosable: false,
        nzFooter: null,
        nzData: {
          issue$: this.projectQuery.issueById$(issue.id)
        }
      });
    });
    this.drawer.close();
  }
}
