import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient);
  baseURL = 'https://localhost:7114/api/Employees'

  constructor() { }

  get(){
    return this.http.get<Employee[]>(this.baseURL);
  }

  getById(id: number){
    return this.http.get<Employee>(`${this.baseURL}/${id}`);
  }

  add(employee: Employee){
    return this.http.post(this.baseURL, employee);
  }

  update(employee: Employee){
    return this.http.put(`${this.baseURL}/${employee.id}`, employee);
  }

  delete(id: number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
