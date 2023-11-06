import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BreadcrumbsComponent } from '../../../jira-control/breadcrumbs/breadcrumbs.component';
import { BoardDndComponent } from '../../components/board/board-dnd/board-dnd.component';
import { BoardFilterComponent } from '../../components/board/board-filter/board-filter.component';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  providers: [NzModalService],
  imports: [BreadcrumbsComponent, BoardFilterComponent, BoardDndComponent]
})
export class BoardComponent {
  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];
}
