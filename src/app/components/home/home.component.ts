import { Component, OnInit} from '@angular/core';
import { Fruit } from 'src/app/data/fruit';
import { Router } from '@angular/router';
import { FruitService } from 'src/app/data/fruit.service';

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

