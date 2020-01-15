import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { GlobalConfig } from '../globalConfig';
import { AppServiceService } from '../app-service.service';

/**
 * @title Stepper label bottom position
 */


@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public nextStep: number = 1;



  public sqftOptions = {
    ZeroToThousandOption: '0-1000',
    ThousandOneOption: '1001-1500',
    ThousandFiveOneOption: '1501-2000',
    TwoThousandOneOption: '2001-2500',
    TwoThousandFiveOneOption: '2501-3000',
    ThreeThousandOption: '3000+'
  };

  public bedroomOptions = {
    BedroomsOne: '1',
    BedroomsTwo: '2',
    BedroomsThree: '3',
    BedroomsFour: '4',
    BedroomsFive: '5',
    BedroomsFivePlus: '5+'
  };


  public bathroomOptions = {
    BathroomsOne: '1',
    BathroomsTwo: '2',
    BathroomsThree: '3',
    BathroomsFour: '4',
    BathroomsFive: '5',
    BathroomsFivePlus: '5+'
  };

  public bathTubOptions = {
    BathtubsNil: 'Nil',

    BathtubsOne: '1',

    BathtubsTwo: '2',

    BathtubsThree: '3',

    BathtubsFour: '4',

    BathtubsFive: '5'
  }

  public propertyType: string;
  public cleaningType: string;
  public propertyAddress: string;
  public propertySize: string;
  public bedrooms: string;
  public bathrooms: string;
  public bathTubs: string;



  public NotRequiredKitchenItem: boolean = false;
  public RefrigeratorKitchenItem: boolean = false;
  public WashingMachineKitchenItem: boolean = false;
  public MicrowaveKitchenItem: boolean = false;
  public TumbleDryer: boolean = false;



  public stepFormObject: {

    formId?: string | number,
    propertyType: string,
    cleaningType: string,
    propertyAddress: string,
    propertySize: string,
    bedrooms: string,
    bathrooms: string,
    bathTubs: string,
    kitchenItems: {
      notrequired: boolean,
      refrigeratorKitchenItem: boolean,
      washingMachineKitchenItem: boolean,
      microwaveKitchenItem: boolean,
      tumbleDryer: boolean
    }
  }



  constructor(private _router: Router, private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,private appService:AppServiceService) { }

  getpropertyAddressMissingErrorMessage() {
    return this.firstFormGroup.controls.firstCtrl.hasError('required') ? true : false;
  }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]

    });

    this.secondFormGroup = this._formBuilder.group({

    });

    this.propertyAddress = this.firstFormGroup.controls.firstCtrl.value;



  }

  iterateTheStep() {

    return this.nextStep += 1;

  }

  decrementTheStep() {
    return this.nextStep -= 1;
  }

  toLoad() {
    return true;
  }

  dataFeedForConfirmation() {
    this.propertyAddress = this.firstFormGroup.controls.firstCtrl.value;


    //console.log((this.firstFormGroup));

    if (this.NotRequiredKitchenItem == false
      && this.RefrigeratorKitchenItem == false
      && this.WashingMachineKitchenItem == false
      && this.MicrowaveKitchenItem == false
      && this.TumbleDryer == false) {
      this.NotRequiredKitchenItem = true;
    }


    this.stepFormObject = {


      propertyType: this.propertyType,
      cleaningType: this.cleaningType,
      propertyAddress: this.propertyAddress,
      propertySize: this.propertySize,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      bathTubs: this.bathTubs,
      kitchenItems: {
        notrequired: this.NotRequiredKitchenItem,
        refrigeratorKitchenItem: this.RefrigeratorKitchenItem,
        washingMachineKitchenItem: this.WashingMachineKitchenItem,
        microwaveKitchenItem: this.MicrowaveKitchenItem,
        tumbleDryer: this.TumbleDryer

      }
    }


    //console.log(this.stepFormObject);

  }


  returnZero() {
    return 0
  }

  setPropertyType(propertyType: string) {
    this.propertyType = propertyType;
  }

  setcleaningType(cleaning: string) {
    this.cleaningType = cleaning;
  }

  setPropertySize(propertysize: any) {
    //console.log(propertysize);
    this.propertySize = propertysize.value;
  }

  setbedrooms(bedrooms: any) {
    this.bedrooms = bedrooms.value;
  }

  setBathrooms(bathrooms: any) {
    this.bathrooms = bathrooms.value;
  }

  setBathTubs(bathtubs: any) {
    this.bathTubs = bathtubs.value;
  }

  navigateToThankyouPage() {

      this._router.navigate([`${GlobalConfig.apiVersion}/thankyou`]);
    
  }

  createForm(){
    //console.log(this.stepFormObject);
    this.appService.createForm(this.stepFormObject).subscribe(

      data => {
        //console.log("Form Created");
        //console.log(data);
        alert('Form Created successfully');
        
      },
      error => {
        //console.log("some error occured");
        //console.log(error);
        alert('Some error occured');
       
      }
    )
  }


}

