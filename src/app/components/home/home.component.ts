import { Component, OnInit} from '@angular/core';
import { Fruit } from 'src/app/data/fruit';
import { Router } from '@angular/router';
import { FruitService } from 'src/app/data/fruit.service';
import { forkJoin, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
  
export class HomeComponent implements OnInit {

  title: string = 'my-app';
  fruit: Fruit = new Fruit(-1, '', false);
  randomFruit: Fruit = new Fruit(-1, '', false);
  fruits: Fruit[] = [];
  button_text: string = "Click me";
  loading: boolean = true;

  constructor(private router : Router, private fruitService : FruitService) { //Dependency injection (globalt tillgänglig service)
  }

  ngOnInit(): void {
    // setTimeout(() =>{this.fruitService.getAllFruits().subscribe((result) => (this.fruits = result))}, 3000)
        this.fruitService.getAllFruits().subscribe((results) => {
      this.loading = false; this.fruits = results
    });
  }

  runForkJoin() {
    this.fruits = [];
    const backendCalls : Observable<Fruit>[] = [];
    
    for (let i = 1; i < 109; i++) {
      backendCalls.push(this.fruitService.getFruitById(i));
    }

    console.log('forkjoin');
    forkJoin(backendCalls).subscribe((result) => this.fruits = result);
  }


  private getFirstHalfOfFruits() : void {
    for (let i = 1; i < 50 + 1; i++) {
      this.fruitService.getFruitById(i).subscribe((currentFruit) => {this.fruits.push(currentFruit)});
    }
  }
  
  private getSecondHalfOfFruits() : void {
    for (let i = 51; i < 109 + 1; i++) {
      this.fruitService.getFruitById(i).subscribe((currentFruit) => {this.fruits.push(currentFruit)});
    }
  }

  switchPage() {
    this.router.navigate(['create']);
  }

  getFruits() {
    return this.fruits;
  }

  changeButton() {
    if (this.button_text === "Click me") {
      this.button_text = "Someone clicked me";
    } else {
      this.button_text = "Click me";
    }
    this.fruitService.getRandomFruit().subscribe((result) => this.randomFruit = result);
  }

  onFruitClickedEvent(highlightedFruit: Fruit) {
    highlightedFruit.isHighlighted = !highlightedFruit.isHighlighted;
  }

  getSelectedFruits() {
    return this.fruits.filter(fruit => fruit.isHighlighted).sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
}

