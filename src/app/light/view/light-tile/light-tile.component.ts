import { Component, Input } from '@angular/core';
import { Light } from '../../models/light';

@Component({
  selector: 'app-light-tile',
  templateUrl: './light-tile.component.html',
  styleUrls: ['./light-tile.component.scss'],
})
export class LightTileComponent {
  @Input()
  light!: Light;
}
