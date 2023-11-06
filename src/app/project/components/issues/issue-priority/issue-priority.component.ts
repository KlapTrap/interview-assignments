import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { JIssue, IssuePriority } from '@jira-clone/interface/issue';
import { IssuePriorityIcon } from '@jira-clone/interface/issue-priority-icon';
import { IssueUtil } from '@jira-clone/project/utils/issue';
import { ProjectService } from '@jira-clone/project/state/project/project.service';
import { ProjectConst } from '@jira-clone/project/config/const';
import { NgFor, NgIf } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ButtonComponent } from '../../../../jira-control/button/button.component';

@Component({
    selector: 'issue-priority',
    templateUrl: './issue-priority.component.html',
    styleUrls: ['./issue-priority.component.scss'],
    standalone: true,
    imports: [ButtonComponent, NzDropDownModule, SvgIconComponent, NzMenuModule, NgFor, NgIf]
})
export class IssuePriorityComponent implements OnInit, OnChanges {
  @Input() issue: JIssue;

  selectedPriority: IssuePriority;
  get selectedPriorityIcon() {
    return IssueUtil.getIssuePriorityIcon(this.selectedPriority);
  }

  priorities: IssuePriorityIcon[];

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  ngOnChanges(): void {
    this.selectedPriority = this.issue?.priority;
  }

  isPrioritySelected(priority: IssuePriority) {
    return priority === this.selectedPriority;
  }

  updateIssue(priority: IssuePriority) {
    this.selectedPriority = priority;
    this._projectService.updateIssue({
      ...this.issue,
      priority: this.selectedPriority
    });
  }
}
