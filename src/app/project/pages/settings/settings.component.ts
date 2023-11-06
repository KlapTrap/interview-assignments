import { Component, OnInit } from '@angular/core';
import { ProjectConst } from '@jira-clone/project/config/const';
import { JProject, ProjectCategory } from '@jira-clone/interface/project';
import { ProjectQuery } from '@jira-clone/project/state/project/project.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UntypedFormGroup, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '@jira-clone/project/state/project/project.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NoWhitespaceValidator } from '@jira-clone/core/validators/no-whitespace.validator';
import { ButtonComponent } from '../../../jira-control/button/button.component';
import { NgFor } from '@angular/common';
import { AutofocusDirective } from '../../../core/directives/autofocus.directive';
import { BreadcrumbsComponent } from '../../../jira-control/breadcrumbs/breadcrumbs.component';

@Component({
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: true,
    imports: [BreadcrumbsComponent, ReactiveFormsModule, AutofocusDirective, NgFor, ButtonComponent]
})
@UntilDestroy()
export class SettingsComponent implements OnInit {
  project: JProject;
  projectForm: UntypedFormGroup;
  categories: ProjectCategory[];
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Settings'];
  }

  constructor(
    private _projectQuery: ProjectQuery,
    private _projectService: ProjectService,
    private _notification: NzNotificationService,
    private _fb: UntypedFormBuilder,
    private _router: Router
  ) {
    this.categories = [
      ProjectCategory.BUSINESS,
      ProjectCategory.MARKETING,
      ProjectCategory.SOFTWARE
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
      this.updateForm(project);
    });
  }

  initForm() {
    this.projectForm = this._fb.group({
      name: ['', NoWhitespaceValidator()],
      url: [''],
      description: [''],
      category: [ProjectCategory.SOFTWARE]
    });
  }

  updateForm(project: JProject) {
    this.projectForm.patchValue({
      name: project.name,
      url: project.url,
      description: project.description,
      category: project.category
    });
  }

  submitForm() {
    const formValue: Partial<JProject> = this.projectForm.getRawValue();
    this._projectService.updateProject(formValue);
    this._notification.create(
      'success',
      'Changes have been saved successfully.',
      ''
    );
  }

  cancel() {
    this._router.navigate(['/']);
  }
}
