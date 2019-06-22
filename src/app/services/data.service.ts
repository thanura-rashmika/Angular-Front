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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*Customer Controls*/

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAllCustomers(): Observable<any> {
        const headers = new HttpHeaders();
        return this.http.get(MAIN_URL + CUSTOMER_URL, {headers: {'Content-Type': 'application/json', 'operation': 'getAll'}});
    }

    addNewCustomer(customer): Observable<any> {
        return this.http.post(MAIN_URL + CUSTOMER_URL, customer, {headers: {'Content-Type': 'application/json', 'operation': 'add'}});
    }

    deleteCustomer(cid): Observable<any> {
        return this.http.delete(MAIN_URL + CUSTOMER_URL + `/${cid}`, {
            headers: {
                'Content-Type': 'application/json',
                'operation': 'delete'
            }
        });
    }

    updateCustomer(customer): Observable<any> {
        return this.http.put(MAIN_URL + CUSTOMER_URL, customer, {headers: {'Content-Type': 'application/json', 'operation': 'update'}});
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getAllItems(): Observable<any> {
        return this.http.get(MAIN_URL + ITEM_URL, {headers: {'Content-Type': 'application/json', 'operation': 'getAll'}});
    }

    addNewItem(item): Observable<any> {
        return this.http.post(MAIN_URL + ITEM_URL, item, {headers: {'Content-Type': 'application/json', 'operation': 'add'}});
    }

    deleteItem(code): Observable<any> {
        return this.http.delete(MAIN_URL + ITEM_URL + `/${code}`, {headers: {'Content-Type': 'application/json', 'operation': 'delete'}});
    }

    updateItem(item): Observable<any> {
        return this.http.put(MAIN_URL + ITEM_URL, item, {headers: {'Content-Type': 'application/json', 'operation': 'update'}});
    }

    getAllOrders(): Observable<any> {
        return this.http.get(MAIN_URL + ORDER_URL, {headers: {'Content-Type': 'application/json', 'operation': 'getAll'}});
    }

    addNewOrder(order): Observable<any> {
        return this.http.post(MAIN_URL + ORDER_URL, order, {headers: {'Content-Type': 'application/json', 'operation': 'update'}});
    }

    deleteOrder(oid): Observable<any> {
        return this.http.delete(MAIN_URL + ORDER_URL + `/${oid}`, {headers: {'Content-Type': 'application/json', 'operation': 'update'}});
    }

    updateOrder(order): Observable<any> {
        return this.http.put(MAIN_URL + ORDER_URL, order, {headers: {'Content-Type': 'application/json', 'operation': 'update'}});
    }
}