import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing-location/housing.service';
import { Housinglocation } from '../housing-location/housinglocation';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, FormsModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Поиск по городу" #filter (keyup.enter)="filterResults(filter.value)" />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Поиск</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [HousingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);

  filteredLocationList: Housinglocation[] = [];

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: Housinglocation[]) => {
        this.housingLocationList = housingLocationList
        this.filteredLocationList = housingLocationList;
      })
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList
      .filter((housingLocation) => {
        console.log(housingLocation)
        return housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      }
    );
  }
}
