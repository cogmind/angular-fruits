import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruit } from 'src/app/data/fruit';
import { FruitService } from 'src/app/data/fruit.service';


@Component({
  selector: 'app-edit-fruit',
  templateUrl: './edit-fruit.component.html',
  styleUrls: ['./edit-fruit.component.sass']
})
export class EditFruitComponent implements OnInit {

  fruit: Fruit = new Fruit(-1, '', false);
  private sub: any;
  id: number = -1;
  newName: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private fruitService: FruitService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
      }
    )
    this.fruitService.getFruitById(this.id)!.subscribe((results) => this.fruit = results);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  changeName() {
    this.fruitService.setName(this.newName, this.id);
    this.router.navigate(['home']);
  }
}
