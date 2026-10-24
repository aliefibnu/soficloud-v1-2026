import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-subfooter',
  imports: [TranslatePipe],
  templateUrl: './subfooter.html',
})
export class Subfooter {}
