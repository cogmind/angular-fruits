import { Injectable } from "@angular/core";
import { Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";
import { Fruit } from "./fruit";

@Injectable({
  providedIn: 'root',
})
export class FruitService {

  fruits: Fruit[] = [];
  fruits_old: Fruit[] = [
    new Fruit(1, 'Orange', false), new Fruit(2, 'Banana', false), new Fruit(3, 'Kiwi', false), new Fruit(4, 'Apple', false), new Fruit(5, 'Grapes', false), new Fruit(6, 'Coconut', false)];
  
    //fruits : Fruit[] = this.initFruits();
  fruitName: string = '';
  constructor(
  ) {
    this.initFruits().then((result: Fruit[]) => {
      this.fruits = result;
      return this.fruits;
    });
  }

  async initFruits() : Promise<Fruit[]> {
    let fruitNames = await (await fetch('http://localhost:4200/assets/fruits.json')).json();
    
    let fruits: Fruit[] = [];
    let id: number = 1;
    for (let fruitName of fruitNames[0].fruits) {
      console.log(fruitName);
      fruits.push(new Fruit(id++, fruitName, false));
    }
    return fruits;
  }
  
  addFruit(fruitName: string) {
    this.fruits.push(new Fruit(this.fruits.length + 1, fruitName, false));
  }

  getAllFruits(): Observable<Fruit[]> {
    return timer(1000).pipe(map(n => this.fruits));
  }
  
  getFruitById(fruitId: number): Observable<Fruit> {
    return timer(Math.random() * 3000).pipe(map((results) => {
      const fruit = this.fruits.find(fruit => fruit.id === fruitId)!;
      console.log(fruit.name);
      return fruit
    }));
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