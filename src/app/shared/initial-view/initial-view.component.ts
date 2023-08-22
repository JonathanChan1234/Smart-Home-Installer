import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.scss'],
})
export class InitialViewComponent {
  @Input()
  message = 'Initializing';
}
