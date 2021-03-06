import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import Swal from 'sweetalert2';
import {ItemModel} from '../models/item.model';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    itemForm: FormGroup;
    items: Array<any>;

    code: any;
    name: any;
    price: any;
    qty: any;

    update: boolean = false;
    state: string = 'Add';

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
        });
    }

    ngOnInit() {
        this.getAllItems();
    }

    getAllItems() {
        this.dataService.getAllItems().subscribe(
            (response: any[]) => {
                this.items = response;
            }
        );
    }

    addItem() {
        const item = {
            code: 0,
            name: this.itemForm.controls['txtName'].value,
            price: Number(this.itemForm.controls['txtPrice'].value),
            qty: Number(this.itemForm.controls['txtQty'].value)
        };
        console.log(item);
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to add a New Item!',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, Discard it'
        }).then((result) => {
            if (result.value) {
                this.dataService.addNewItem(item).subscribe(
                    (response) => {
                        if (response.code === 201) {
                            Swal.fire(
                                'Added!',
                                'New Item has been Saved Successfully.',
                                'success'
                            );
                            this.getAllItems();
                            this.clearForm();
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Item Not Added',
                    'error'
                );
            }
        });
    }

    proceedUpdate(item) {
        this.update = true;
        this.state = 'Update';
        this.code = item.code;
        this.name = item.name;
        this.price = item.price;
        this.qty = item.qty;
        this.itemForm.controls['txtName'].setValue(item.name);
        this.itemForm.controls['txtPrice'].setValue(item.price);
        this.itemForm.controls['txtQty'].setValue(item.qty);
    }

    updateItem() {
        const item = {
            code: this.code,
            name: this.itemForm.controls['txtName'].value,
            price: Number(this.itemForm.controls['txtPrice'].value),
            qty: Number(this.itemForm.controls['txtQty'].value),
        };

        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to update an Item!',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update it!',
            cancelButtonText: 'No, Keep it'
        }).then((result) => {
            if (result.value) {
                this.dataService.updateItem(item).subscribe(
                    (response) => {
                        if (response.code === 201) {
                            Swal.fire(
                                'Updated!',
                                'Item has been Updated Successfully.',
                                'success'
                            );
                            this.getAllItems();
                            this.clearForm();
                            this.state = 'Add'
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Item Not Updated',
                    'error'
                );
            }
        });
    }

    deleteItem(code) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove an Item!',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Remove it!',
            cancelButtonText: 'No, Keep it'
        }).then((result) => {
            if (result.value) {
                this.dataService.deleteItem(code).subscribe(
                    (response) => {
                        if (response.code === 201) {
                            Swal.fire(
                                'Deleted!',
                                'Item has been Removed Successfully.',
                                'success'
                            );
                            this.getAllItems();
                            this.clearForm();
                            this.state = 'Add'
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Item Not Removed',
                    'error'
                );
            }
        });
    }

    clearForm() {
        this.code = 0;
        this.itemForm.controls['txtName'].setValue('');
        this.itemForm.controls['txtPrice'].setValue('');
        this.itemForm.controls['txtQty'].setValue('');
        this.state = 'Save';
        this.update = false
    }

}
