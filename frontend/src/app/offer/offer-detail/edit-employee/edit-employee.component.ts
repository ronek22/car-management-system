import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee, Offer } from '../../../models/models';
import { EmployeeService } from '../../../services/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  offerForm: FormGroup;
  availableEmployees$: Observable<Employee[]>;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public offer: Offer,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.availableEmployees$ = this.employeeService.getEmployeesList();

    this.offerForm = this.fb.group({
      id: [this.offer.id],
      employee: [this.offer.employee],
    });
  }

  compareEmployee(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  getData(): void {
    const result = {
      id: this.offer.id,
      employee: this.offerForm.value['employee'],
    };

    console.log(result);

    this.dialogRef.close(result);
  }
}
