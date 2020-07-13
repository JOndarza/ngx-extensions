import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-extensions';

  public elements = [
    { name: '1', pos: 'left' },
    { name: '2', pos: 'right' },
  ];
}
