import { Component, Input } from '@angular/core';

@Component({
  selector: 'system-spinner',
  templateUrl: './system-spinner.component.html',
  styleUrls: ['./system-spinner.component.scss'],
})
export class SystemSpinnerComponent {
  @Input() grdspin: boolean;
}
