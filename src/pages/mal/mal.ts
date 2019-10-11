import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

/**
 * Generated class for the MalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mal',
  templateUrl: 'mal.html',
})
export class MalPage {

  public form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _FB: FormBuilder) {

    // Define the FormGroup object for the form
    // (with sub-FormGroup objects for handling
    // the dynamically generated form input fields)
    this.form = this._FB.group({
      name: ['', Validators.required],
      technologies: this._FB.array([
        this.initTechnologyFields()
      ])
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MalPage');
  }


  /**
   * Generates a FormGroup object with input field validation rules for
   * the technologies form object
   *
   * @public
   * @method initTechnologyFields
   * @return {FormGroup}
   */
  initTechnologyFields(): FormGroup {
    return this._FB.group({
      name: ['', Validators.required]
    });
  }

  addNewInputField(): void {
    const control = <FormArray>this.form.controls.technologies;
    control.push(this.initTechnologyFields());
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.technologies;
    control.removeAt(i);
  }

  manage(val: any): void {
    console.dir(val);
  }

}
