import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AngularComponent, ButtonComponent } from '@ridge/angular';

@Component({
  imports: [
    NxWelcomeComponent,
    RouterModule,
    AngularComponent,
    ButtonComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-example';
}
