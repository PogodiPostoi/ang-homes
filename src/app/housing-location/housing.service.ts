import { Injectable } from '@angular/core';
import { Housinglocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})

export class HousingService {

  constructor() { }

  readonly url = "https://65a4f58b52f07a8b4a3e0595.mockapi.io/locations"

  async getAllHousingLocations(): Promise<Housinglocation[]> {
    const data = await fetch(this.url)
    return await data.json() ?? []
  }

  async getHousingLocationById(id: number): Promise<Housinglocation> {
    const data = await fetch(`${this.url}/${id}`)
    return await data.json() ?? {}
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    alert(`Бронь успешно зарегистрирована на: ${lastName} ${firstName} ${email}`)
  }
}
