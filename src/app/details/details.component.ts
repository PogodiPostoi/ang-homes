import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import { HousingService } from '../housing-location/housing.service';
import { Housinglocation } from '../housing-location/housinglocation'; 
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <article>
      <img 
        class="listing-photo"
        [src]="housingLocation?.photo" 
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      >
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">Основные удобства:</h2>
        <ul>
          <li>Количество гостей: {{ housingLocation?.availableUnits }}</li>
          <li>Wi-Fi: {{ housingLocation?.wifi ? "Да" : "Нет" }}</li>
          <li>Стиральная машина: {{ housingLocation?.laundry ? "Да" : "Нет" }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Бронируй сейчас</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="last-name">Фамилия</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="first-name">Имя</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="first-name">Email</label>
          <input id="email" type="text" formControlName="email">

          <button type="submit" class="primary">Забронировать</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  housingService = inject(HousingService)
  housingLocation: Housinglocation | undefined 
  private route: ActivatedRoute = inject(ActivatedRoute)
  
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params["id"], 10)
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then(housingLocation => {
        this.housingLocation = housingLocation
      })
  }

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl("")
  })
  
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    )
  }
  
}
