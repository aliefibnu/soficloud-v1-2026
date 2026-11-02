import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-subfooter',
  templateUrl: './subfooter.html',
})
export class Subfooter {}
