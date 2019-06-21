import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import Swal from 'sweetalert2';

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
            price: this.itemForm.controls['txtPrice'].value,
            qty: this.itemForm.controls['txtQty'].value
        };
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

    clearForm() {
        this.itemForm.controls['txtName'].setValue('');
        this.itemForm.controls['txtPrice'].setValue('');
        this.itemForm.controls['txtQty'].setValue('');
    }

}
