import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;

  recipeForm: UntypedFormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    //watches changes in the parameters to update the id
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      //if the parametrs is not null then set to true
      this.editMode = params['id'] != null;
      //initalize recipe edit form 
      this.initForm();
    })
  }

  onAddIngredient(){
    //create a new formArray for ingredients and push a new formgroup with a name and amount
    
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push( new UntypedFormGroup({
      'name': new UntypedFormControl(null, Validators.required),
      'amount': new UntypedFormControl(null, [])
    }));
  }

  onSubmit(){
    //Create a new recipe putting getting all recipe details from the form
    // const newRecipe = new Recipe(this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    //if we are in editing mode then update the recipe passing in the id
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    //else create a new recipe
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  get controls() { // a getter!
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  //initalize form on parameter change
  private initForm(){
    //Define default recipe details
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new UntypedFormArray([]);

    //if we are editing
    if(this.editMode){
      //Get the current recipe that was given duing subscribe on params event
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      //if the recipe contains ingredients 
      if(recipe['ingredients']){
        //loop over each ingredient
        for(let ingredient of recipe.ingredients){
          //and push a new ingredient to the list
          recipeIngredients.push(
            //creating a new form control wil validators
            new UntypedFormGroup({
              'name': new UntypedFormControl(ingredient.name, Validators.required),
              'amount': new UntypedFormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    //create new form with either editing a recipe or creating a new one
    this.recipeForm = new UntypedFormGroup({
      'name': new UntypedFormControl(recipeName, Validators.required),
      'imagePath': new UntypedFormControl(recipeImagePath, Validators.required),
      'description': new UntypedFormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onDeleteIngredient(index: number){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
