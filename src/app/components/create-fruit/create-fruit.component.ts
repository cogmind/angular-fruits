import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FruitService } from 'src/app/data/fruit.service';

@Component({
  selector: 'app-create-fruit',
  templateUrl: './create-fruit.component.html',
  styleUrls: ['./create-fruit.component.sass']
})
export class CreateFruitComponent implements OnInit {

  fruitName: string = '';

  constructor(private router : Router, private fruitService : FruitService) { }

  ngOnInit(): void {
  }

  createFruit() {
    console.log("Creating fruit...")
    this.fruitService.addFruit(this.fruitName);
    this.goBack();
  }

  goBack() {
    this.router.navigate(['home']);
  }
}
