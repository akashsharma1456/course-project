import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import { Ingredient } from '../shared/intgredient.model';
import {ShopingListService} from '../shoping-list/shoping-list.service';
import {Subject} from 'rxjs';
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Kheer',
      'Sweet Desert',
      'https://c.ndtvimg.com/2018-10/6n7i40g8_sharad-purnima-2018-kheer-recipe-and-benefits_625x300_23_October_18.jpg',
      [
        new Ingredient('Milk', 1),
        new Ingredient('Sugar', 1)
      ]),
    new Recipe(
      'French Fries',
      'Snacks',
      'https://www.thespruceeats.com/thmb/IHKuXcx3uUI1IWkM_cnnQdFH-zQ=/3485x2323/filters:fill(auto,1)/how-to-make-homemade-french-fries-2215971-hero-01-02f62a016f3e4aa4b41d0c27539885c3.jpg',
      [
        new Ingredient('Potato', 10),
        new Ingredient('Butter', 3)
      ])
  ];
  constructor(private  slService: ShopingListService) {}
  // tslint:disable-next-line:typedef
  getRecipes() {
    return this.recipes.slice();
  }
  // tslint:disable-next-line:typedef
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShopingList(ingredients: Ingredient[]): void{
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
