import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth = new Date().getMonth() + 1; // current month, JavaScript is 0 based.

    this.getMonths(startMonth);

    this.getYears();

    this.getCountries();
  }

  private getMonths(startMonth: number) {
    this.formService.getCreditCardMonths(startMonth).subscribe(
      months => this.creditCardMonths = months
    );
  }

  private getYears() {
    this.formService.getCreditCardYears().subscribe(
      years => this.creditCardYears = years
    );
  }

  private getCountries() {
    this.formService.getCountries().subscribe(
      countries => this.countries = countries
    );
  }

  copyShippingAddressToBillingAddress(event: Event): void {

    if ((event.target as HTMLInputElement).checked) {
      this.billingAddressStates = this.shippingAddressStates;
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const currentYear = new Date().getFullYear();
    const selectedYear = Number(this.checkoutFormGroup.get('creditCard')!.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1; // current month, JavaScript is 0 based.
    } else {
      startMonth = 1; // January
    }

    this.getMonths(startMonth);
  }

  getStates(formGroupName: string): void {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.formService.getStates(countryCode).subscribe(
      states => {
        if (formGroupName === "shippingAddress") {
          this.shippingAddressStates = states;
        } else if (formGroupName === "billingAddress") {
          this.billingAddressStates = states;
        }
        formGroup?.get("state")?.setValue(states[0]);
      }
    )
  }

  doCheckout(): void {
    console.log(this.checkoutFormGroup.value);
  }
}
