import { Injectable } from "@angular/core";
import { Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";
import { Fruit } from "./fruit";

@Injectable({
  providedIn: 'root',
})
export class FruitService {

  fruits: Fruit[] = [
    new Fruit(1, 'Orange', false), new Fruit(2, 'Banana', false), new Fruit(3, 'Kiwi', false), new Fruit(3, 'Apple', false), new Fruit(4, 'Grapes', false), new Fruit(5, 'Coconut', false)];

  fruitName: string = '';
  constructor() { }

  // DONE Lägg till observables
  // DONE Lägg till en delay
  // Styla bakgrunden och alignment, använd rem units, display: flex list-item
  // Samma storlek på alla namn

  
  addFruit(fruitName: string) {
    this.fruits.push(new Fruit(this.fruits.length + 1, fruitName, false));
  }

  getAllFruits(): Observable<Fruit[]> {
    return timer(1000).pipe(map(n => this.fruits));
  }
  
  getFruitById(fruitId: number): Observable<Fruit> {
    return of(this.fruits.find(fruit => fruit.id === fruitId)!);
  }
  
  getFruitName(): Observable<string> {
    return of(this.fruitName);
  }
  
  getRandomFruit(): Observable<Fruit> {
    return of(this.fruits[Math.floor(Math.random() * this.fruits.length)]);
  }
  
  deleteFruit(fruitId: number) {
    let index = this.fruits.findIndex(fruit => fruit.id === fruitId)
    this.fruits.splice(index, 1);
  }
  
  setName(newName : string, fruitId : number) {
    let currentFruit = this.fruits.find(fruit => fruit.id === fruitId);

    currentFruit!.name = newName;
    console.log(currentFruit!.name);

    let index = this.fruits.indexOf(currentFruit!);
    this.fruits[index] = currentFruit!;
  }
}