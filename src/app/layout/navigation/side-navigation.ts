import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.scss',
})
export class SideNavigation {}
