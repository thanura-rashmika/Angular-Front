import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    items: Array<any>;
    customers: Array<any>;

    orderDetais: Array<any> = [];

    order: {
        oid: 0,
        date: 0,
        total: 0,
        cid: 0,
        orderDetailDTOS: [{}],
    };

    name: any;
    price: any;
    qty: any;
    total: any;

    orderForm: FormGroup;

    constructor(private dataService: DataService, private formBuilder: FormBuilder) {
        this.orderForm = this.formBuilder.group({
            cusSelect: [
                '', Validators.required,
            ],
            itemSelect: [
                '', Validators.required,
            ],
            txtQty: [
                '', Validators.required,
            ]
        });
    }

    ngOnInit() {
        this.getAllItems();
        this.getAllCustomers();
    }

    addItem() {
        const code = this.orderForm.controls['itemSelect'].value;
        let qty = 0;
        let price = 0;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].code === code) {
                qty = this.items[i].qty;
                price = this.items[i].price;
                this.total += (price * qty);
            }
        }

        const order = {
            oid: 0,
            date: Date.now(),
            total: this.total,
            cid: this.orderForm.controls['cusSelect'].value,
            orderDetailDTOS: []
        };

        this.orderDetais.push(
            {
                code: this.orderForm.controls['itemSelect'].value,
                oid: 0,
                unitPrice: price,
                qty: qty,
            }
        );

        console.log(order);
    }

    getAllCustomers() {
        this.dataService.getAllCustomers().subscribe(
            (response) => {
                this.customers = response;
            }
        );
    }

    getAllItems() {
        this.dataService.getAllItems().subscribe(
            (response) => {
                this.items = response;
            }
        );
    }

}
