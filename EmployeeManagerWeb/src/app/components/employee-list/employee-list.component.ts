import { Component, OnInit, inject } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  router = inject(Router);

  employeeList: Employee[] = [];
  employeeService = inject(EmployeeService);

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'age', 'salary', 'edit', 'delete'];

  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  onEmployeeEdit(id: number){
    this.router.navigate(['employee', 'edit', id]);
  }

  onEmployeeDelete(id: number){
    this.employeeService.delete(id)
      .subscribe(() => {
        this.refreshEmployeeList();
      });
  }

  refreshEmployeeList(){
    this.employeeService.get()
      .subscribe(result => {
        this.employeeList = result;
      });
  }
}
