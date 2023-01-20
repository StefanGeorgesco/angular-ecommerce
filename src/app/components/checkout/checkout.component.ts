import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  monthsSubscription: Subscription | undefined;
  yearsSubscription: Subscription | undefined;

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
  }

  copyShippingAddressToBillingAddress(event: Event): void {

    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  private getMonths(startMonth: number) {
    if (this.monthsSubscription) {
      this.monthsSubscription.unsubscribe();
    }
    this.monthsSubscription = this.formService.getCreditCardMonths(startMonth).subscribe(
      months => this.creditCardMonths = months
    );
  }

  private getYears() {
    if (this.yearsSubscription) {
      this.yearsSubscription.unsubscribe();
    }
    this.formService.getCreditCardYears().subscribe(
      years => this.creditCardYears = years
    );
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

  doCheckout(): void {
    // TO DO
  }
}
