import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    itemForm: FormGroup;

    items: Array<any>;

    constructor(private formBuilder: FormBuilder, private dataService: DataService) {
        this.itemForm = this.formBuilder.group({
            txtName: [
                '', Validators.required,
            ],
            txtPrice: [
                '', Validators.required,
            ],
            txtQty: [
                '', Validators.required
            ]
        })
    }

    ngOnInit() {
        this.getAllItems();
    }

    getAllItems() {
        this.dataService.getAllItems().subscribe(
            (response: any[]) => {
                this.items = response;
            }
        )
    }

    addItem() {
        const item = {
            code: 0,
            name: this.itemForm.controls['txtName'].value,
            price: this.itemForm.controls['txtPrice'].value,
            qty: this.itemForm.controls['txtQty'].value
        };

        this.dataService.addNewItem(item).subscribe(
            (response) => {

            }
        )
    }

}
