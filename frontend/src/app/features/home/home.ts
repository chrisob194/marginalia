import { Component } from '@angular/core';
import { BrandHeader } from '../../shared/components/brand-header/brand-header';

@Component({
  selector: 'app-home',
  imports: [
    BrandHeader
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
