import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    //listen for the startedEditing to emitt an event
    this.subscription = this.slService.startedEditing.subscribe(
      // When the subject is emitted it will get the emitted index
      (index: number)=>{
        //set the ingredient we want to edit and turn edit mode to true
        this.editedItemIndex = index;
        this.editMode = true;
        //Get the ingredient we want to edit from the shoppingList service
        this.editedItem = this.slService.getIngredient(index);
        //Change set the values of the item we want to edit to the form
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  //Add a new items using form from shopping edit
  onSubmit(form: NgForm) {
    console.log("new");
    // get the current form values
    const value = form.value;
    //Save into a new ingredient object
    const newIngredient = new Ingredient(value.name, value.amount);
    //If we are editing a current ingredient
    if(this.editMode){
      //Update the ingredient giving the index that was set in the onInit and pass the ingredient we want to edit
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      //otherwise add a new ingredient
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

   
  }

  onDelete(){
    this.slService.removeIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
