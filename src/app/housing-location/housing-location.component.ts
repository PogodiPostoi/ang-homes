import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Housinglocation } from './housinglocation';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img 
        class="listing-photo"
        [src]="HousingLocation.photo"
        alt="Exterior photo of {{HousingLocation.name}}"
        crossorigin
      >
      <h2 class="listing-heading">
        {{HousingLocation.name}}
      </h2>
      <p class="listing-location">
        {{HousingLocation.city}}
      </p>
      <a [routerLink]="['/details', HousingLocation.id]">Подробнее</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css']
})

export class HousingLocationComponent {
  @Input() HousingLocation!: Housinglocation
}
