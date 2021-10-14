import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFruitComponent } from './components/create-fruit/create-fruit.component';
import { HomeComponent } from './components/home/home.component';
import { EditFruitComponent } from './components/edit-fruit/edit-fruit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateFruitComponent },
  { path: 'fruit/edit/:id', component: EditFruitComponent },  
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
}) export class AppRoutingModule { }