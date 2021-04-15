import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/intgredient.model';
import {ShopingListService} from './shoping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  private subscription !: Subscription;

  constructor(private slService: ShopingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  onEditItem(index: number): void {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
