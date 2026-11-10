import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-demo-map',
  imports: [TranslatePipe],
  templateUrl: './map.html',
  host: {
    class: 'block w-full',
  },
})
export class ScheduleDemoMap {}
