import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

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
    private formService: FormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpaces]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth = new Date().getMonth() + 1; // current month, JavaScript is 0 based.

    this.getMonths(startMonth);

    this.getYears();

    this.getCountries();

    this.reviewCartDetails();
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

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName')!; }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName')!; }
  get email() { return this.checkoutFormGroup.get('customer.email')!; }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street')!; }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city')!; }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state')!; }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country')!; }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode')!; }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street')!; }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city')!; }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state')!; }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country')!; }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode')!; }

  get cardType() { return this.checkoutFormGroup.get('creditCard.cardType')!; }
  get nameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard')!; }
  get cardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber')!; }
  get securityCode() { return this.checkoutFormGroup.get('creditCard.securityCode')!; }

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

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems = cartItems.map(cartItem => new OrderItem(cartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCoutry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCoutry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCoutry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCoutry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        this.resetCartAndLeave();
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  private resetCartAndLeave(): void {
    this.cartService.resetCart();
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/products");
  }
}
