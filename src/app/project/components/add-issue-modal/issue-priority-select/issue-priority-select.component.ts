import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { IssuePriorityIcon } from '@jira-clone/interface/issue-priority-icon';
import { IssueUtil } from '@jira-clone/project/utils/issue';
import { IssuePriority } from '@jira-clone/interface/issue';
import { ProjectConst } from '@jira-clone/project/config/const';

@Component({
  selector: 'issue-priority-select',
  templateUrl: './issue-priority-select.component.html',
  styleUrls: ['./issue-priority-select.component.scss']
})
export class IssuePrioritySelectComponent {
  @Input() control: UntypedFormControl;
  priorities: IssuePriorityIcon[];

  constructor() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  getPriorityIcon(priority: IssuePriority) {
    return IssueUtil.getIssuePriorityIcon(priority);
  }
}
