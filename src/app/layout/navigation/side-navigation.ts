import { Component, HostBinding } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.scss',
})
export class SideNavigation {
  @HostBinding('class') activeTheme = 'theme-dark';
}

export class AppComponent {
  currentTheme: string = 'theme-dark';

  // Diese Funktion wird vom Header aufgerufen, wenn das Theme gewechselt wird
  onThemeChange(newTheme: string) {
    this.currentTheme = newTheme;
  }
}
