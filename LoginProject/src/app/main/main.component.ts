// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.css']
// })
// export class MainComponent implements OnInit {
//   username: string = '';
//   products: any[] = [];

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit() {
//     this.username = localStorage.getItem('username') || 'Guest';
//     this.route.queryParams.subscribe(params => {
//       if (params['products']) {
//         this.fetchProducts();
//       }
//     });
//   }

//   fetchProducts() {
//     this.productService.getProducts().subscribe(
//       (data) => {
//         this.products = data;
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }

//   logout() {
//     localStorage.removeItem('username');
//     localStorage.removeItem('password');
//     this.router.navigate(['']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  employees: any[] = [];
  employeeForm: FormGroup;
  employeeId: number | null = null;

  constructor(private fb:FormBuilder,private productService: ProductService) {
    this.employeeForm=this.fb.group({
      first_Name: [''],
      last_Name: [''],
      position: ['']
    })
  }

  ngOnInit() {
    this.getEmployees();
  }
 //getEmployee
  getEmployees() {
    this.productService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  //saveEmployee
  saveEmployee() {
    this.productService.saveEmployee(this.employeeForm.value).subscribe(() => {
      this.getEmployees(); // Refresh employee list
      this.employeeForm.reset(); // Reset the form
    });
  }

  //updateEmployee
  updateEmployee() {
    if (this.employeeId) {
      this.productService.updateEmployee({ id: this.employeeId, ...this.employeeForm.value }).subscribe(() => {
        this.getEmployees(); // Refresh employee list
        this.employeeForm.reset(); // Reset the form
        this.employeeId = null; // Clear employee ID
      });
    }
  }

  deleteEmployee(id: number) {
    this.productService.deleteEmployee(id).subscribe(() => {
      this.getEmployees(); // Refresh employee list
    });
  }

  setEmployeeForEdit(employee: any) {
    this.employeeId = employee.id;
    this.employeeForm.patchValue({
      first_Name: employee.first_Name,
      last_Name: employee.last_Name,
      position: employee.position
    });
  }

  searchEmployeeById() {
    if (this.employeeId) {
      this.productService.getEmployeeById(this.employeeId).subscribe((employee) => {
        if (employee) {
          this.employeeForm.patchValue({
            first_Name: employee.first_Name,
            last_Name: employee.last_Name,
            position: employee.position
          });
        } else {
          console.warn('Employee not found');
        }
      });
    }

  }
}
