import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { HomeConfigurationAction } from '../../store/home-configuration.action';

@Component({
  selector: 'app-home-configuration',
  templateUrl: './home-configuration.component.html',
  styleUrls: ['./home-configuration.component.scss'],
})
export class HomeConfigurationComponent implements OnInit {
  homeId: string | null = null;
  mouseDown = false;
  floorListWidth: number | string = 'auto';

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.homeId = params.get('id');
      if (!this.homeId) return;
      this.store.dispatch(
        HomeConfigurationAction.setCurrentHome({ homeId: this.homeId })
      );
    });
  }

  @HostListener('window:mousemove', ['$event'])
  resize(event: MouseEvent) {
    if (!this.mouseDown) {
      return;
    }
    this.floorListWidth = `${event.x}px`;
  }

  @HostListener('window:mouseup')
  stopResizing() {
    this.mouseDown = false;
  }

  resizerMouseDown(): void {
    this.mouseDown = true;
  }
}
