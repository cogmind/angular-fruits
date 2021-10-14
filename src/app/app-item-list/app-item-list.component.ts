import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Fruit } from '../data/fruit';
import { FruitService } from '../data/fruit.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './app-item-list.component.html',
  styleUrls: ['./app-item-list.component.sass']
})
export class AppItemListComponent implements OnInit {

  @Input('title') title: string = '';
  @Input('fruits') fruits: Fruit[] = [];

  @Output() fruitClickedEvent = new EventEmitter<Fruit>();

  constructor(private fruitService: FruitService, private router: Router) { }

  ngOnInit() {
  }

  onClickFruit(fruit: Fruit) {
    this.fruitClickedEvent.emit(fruit);
  }

  editFruit(fruitId: number) {
    console.log("EDIT" + fruitId);
    this.router.navigate(['/fruit/edit/', fruitId]);
  }

  deleteFruit(fruitId: number) {
    console.log("DELETE" + fruitId);
    this.fruitService.deleteFruit(fruitId);
  }
}
