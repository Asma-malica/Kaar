import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }
  private carNamesSubject = new BehaviorSubject<string[]>([]);
  carNames1 = this.carNamesSubject.asObservable()

    addCarName(name :string){
      const currName = this.carNamesSubject.getValue()
      const UpdateName = [...currName , name]
      this.carNamesSubject.next(UpdateName)
    }




}
