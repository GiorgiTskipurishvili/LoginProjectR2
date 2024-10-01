// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl = 'https://localhost:7020/api/Employees';  // Update API URL for employees

//   constructor(private http: HttpClient) {}

//   // // // Get all employees
//   getEmployees(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   // // Save new employee
//   saveEmployee(employee: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, employee);
//   }

//   // Update an existing employee
//   updateEmployee(employee: any): Observable<any> {
//     return this.http.put<any>(this.apiUrl, employee);
//   }

//   // Delete an employee by ID
//   deleteEmployee(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`);
//   }

//   // Get employee by ID
//   getEmployeeById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }



// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7020/api/Employees';  // Update API URL for employees

  constructor(private http: HttpClient) {}

  // Get all employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Save new employee
  saveEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  // Update an existing employee
  updateEmployee(employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${employee.id}`, employee); // Include ID in the URL
  }

  // Delete an employee by ID
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Get employee by ID
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
