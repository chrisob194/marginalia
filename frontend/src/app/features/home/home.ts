import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
  public title = signal('This is the title');
  public content = signal('this is going to be the home page!');
}
