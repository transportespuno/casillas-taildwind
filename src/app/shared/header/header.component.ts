import { Component } from '@angular/core';
import { Up2Component } from '../../components/up2/up2.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Up2Component
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
