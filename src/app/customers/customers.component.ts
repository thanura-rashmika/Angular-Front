import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    customerForm: FormGroup;
    customers: Array<any>;

    cid: any;
    name: any;
    address: any;
    mobile: any;

    update: boolean = false;
    state: string = 'Save';

    constructor(private formBuilder: FormBuilder, private dataService: DataService) {
        this.customerForm = this.formBuilder.group({
            txtName: [
                '', Validators.required,
            ],
            txtMobile: [
                '', Validators.required,
            ],
            txtAddress: [
                '', Validators.required,
            ]
        });
    }

    addCustomer() {
        const customer = {
            cid: 0,
            name: this.customerForm.controls['txtName'].value,
            address: this.customerForm.controls['txtAddress'].value,
            mobile: this.customerForm.controls['txtMobile'].value
        };
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to add a New Customer!',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, Discard it'
        }).then((result) => {
            if (result.value) {
                this.dataService.addNewCustomer(customer).subscribe(
                    (response) => {
                        if (response.code === 201) {
                            Swal.fire(
                                'Added!',
                                'New Customer has been Saved Successfully.',
                                'success'
                            );
                            this.getAllCustomers();
                            this.clearForm();
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Customer Not Added',
                    'error'
                );
            }
        });
    }

    proceedUpdate(customer) {
        this.state = 'Update'
        this.cid = customer.cid;
        this.customerForm.controls['txtName'].setValue(customer.name);
        this.customerForm.controls['txtAddress'].setValue(customer.address);
        this.customerForm.controls['txtMobile'].setValue(customer.mobile);
        this.name = customer.name;
        this.address = customer.address;
        this.mobile = customer.mobile;
        this.update = true;
    }

    updateCustomer() {
        const customer = {
            cid: this.cid,
            name: this.customerForm.controls['txtName'].value,
            address: this.customerForm.controls['txtAddress'].value,
            mobile: this.customerForm.controls['txtMobile'].value
        };
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to Update a Customer!',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update it!',
            cancelButtonText: 'No, Keep it'
        }).then((result) => {
            if (result.value) {
                this.dataService.updateCustomer(customer).subscribe(
                    (response) => {
                        if (response.code === 200) {
                            Swal.fire(
                                'Updated!',
                                'Customer has been Updated Successfully.',
                                'success'
                            );
                            this.getAllCustomers();
                            this.clearForm();
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Customer Not Updated',
                    'error'
                );
            }
        });
    }

    deleteCustomer(cid) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to Delete a Customer!',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, Keep it'
        }).then((result) => {
            if (result.value) {
                this.dataService.deleteCustomer(cid).subscribe(
                    (response) => {
                        if (response.code === 201) {
                            Swal.fire(
                                'Deleted!',
                                'Customer has been Removed Successfully.',
                                'success'
                            );
                            this.getAllCustomers();
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Customer Not Deleted',
                    'error'
                );
            }
        });
    }

    clearForm() {
        this.cid = 0;
        this.customerForm.controls['txtName'].setValue('');
        this.customerForm.controls['txtAddress'].setValue('');
        this.customerForm.controls['txtMobile'].setValue('');
        this.state = 'Save';
        this.update = false
    }

    getAllCustomers() {
        this.dataService.getAllCustomers().subscribe(
            (response: any[]) => {
                console.log(response);
                this.customers = response;
            }
        );
    }

    ngOnInit() {
        this.getAllCustomers();
    }

}
