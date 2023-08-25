import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.scss'],
})
export class ErrorViewComponent {
  @Input()
  message: string | undefined | null = 'Something is wrong.';
}
