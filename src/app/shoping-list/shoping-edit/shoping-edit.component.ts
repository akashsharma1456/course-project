import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/intgredient.model';
import {ShopingListService} from '../shoping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private slService: ShopingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }
  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(): void {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
