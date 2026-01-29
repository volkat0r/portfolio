import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { About } from '../about/about';
import { Tech } from '../tech/tech';
import { Work } from '../work/work';
import { Testimonial } from '../testimonial/testimonial';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, About, Tech, Work, Testimonial, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
