import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceCount } from '../../models/device-count';

@Component({
  selector: 'app-device-tile',
  templateUrl: './device-tile.component.html',
  styleUrls: ['./device-tile.component.scss'],
})
export class DeviceTileComponent {
  @Input()
  deviceCount!: DeviceCount;

  constructor(private router: Router, private route: ActivatedRoute) {}

  get iconPath() {
    switch (this.deviceCount.mainCategory) {
      case 0:
        return `../../../../assets/light.png`;
      case 1:
        return `../../../../assets/curtain.png`;
      case 2:
        return `../../../../assets/ac.png`;
      default:
        return `../../../../assets/unknown.png`;
    }
  }

  get title() {
    switch (this.deviceCount.mainCategory) {
      case 0:
        return 'Light';
      case 1:
        return 'Shade';
      case 2:
        return 'AC';
      default:
        return 'Unknown';
    }
  }

  navigateToDeviceCategory() {
    switch (this.deviceCount.mainCategory) {
      case 0:
        this.router.navigate(['light'], { relativeTo: this.route });
        break;
      case 1:
        this.router.navigate(['shade'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['ac'], { relativeTo: this.route });
        break;
      default:
        break;
    }
  }
}
