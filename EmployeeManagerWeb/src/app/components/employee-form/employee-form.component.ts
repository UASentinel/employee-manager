import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  fb = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    age: [0, [Validators.required]],
    phone: ['', []],
    salary: [0, [Validators.required]],
  });

  employeeId?: number;
  formActionLabel: string = 'Add';
  cancelRouterLink: string = '../';

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'] as number;
    if(this.employeeId){
      this.formActionLabel = 'Edit';
      this.cancelRouterLink = '../../';

      this.employeeService.getById(this.employeeId)
        .subscribe(result => {
          this.employeeForm.patchValue(result);
          this.employeeForm.controls.email.disable();
        });
    }
  }

  onSubmit(){
    if(!this.employeeForm.valid)
      return;

    console.log('valid');

    let employee = this.employeeForm.getRawValue() as Employee;

    if(this.employeeId){
      employee.id = this.employeeId;
      this.employeeService.update(employee)
        .subscribe(() => {this.navigateToMain()});
      return;
    }

    this.employeeService.add(employee)
      .subscribe(() => {this.navigateToMain()});
  }

  navigateToMain(){
    this.router.navigate(['employee']);
  }
}
