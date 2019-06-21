import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const MAIN_URL = 'http://localhost:8080/pos';
const CUSTOMER_URL = '/customer';
const ITEM_URL = '/item';
const ORDER_URL = '/orders';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {
    }

    getAllCustomers(): Observable<any> {
        const headers = new HttpHeaders();
        return this.http.get(MAIN_URL + CUSTOMER_URL, {headers: {'Content-Type': 'application/json', 'operation': 'getAll'}});
    }

    addNewCustomer(customer): Observable<any> {
        return this.http.post(MAIN_URL + CUSTOMER_URL, customer, {headers: {'Content-Type': 'application/json', 'operation': 'add'}});
    }

    deleteCustomer(cid): Observable<any> {
        return this.http.delete(MAIN_URL + CUSTOMER_URL + `/${cid}`, {headers: {'Content-Type': 'application/json', 'operation': 'delete'}});
    }

    updateCustomer(customer): Observable<any> {
        return this.http.put(MAIN_URL + CUSTOMER_URL, customer, {headers: {'Content-Type': 'application/json', 'operation': 'update'}});
    }
}