import { Component, ViewEncapsulation } from '@angular/core';
import * as animes from './fakes/ghibliapi.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'ngx-extensions';

  public elements = (animes as any).default;

  constructor() {
    console.log(this.elements[0]);
  }
}
