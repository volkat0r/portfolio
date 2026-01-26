import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { SideNavigation } from './navigation/side-navigation';

@Component({
  selector: 'app-layout',
  //standalone: true,
  imports: [RouterOutlet, Header, Footer, SideNavigation],
  templateUrl: './layout.html',
  styles: ``,
})
export class Layout {}
