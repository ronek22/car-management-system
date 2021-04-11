import { Component, Inject, OnInit } from '@angular/core';
import { Employee } from '../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
})
export class EmployeeDialogComponent implements OnInit {
  employee: Employee;
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    if (this.employee) {
      this.fillForm();
    }
  }

  fillForm(): void {
    this.employeeForm.setValue({
      firstName: this.employee.first_name,
      lastName: this.employee.last_name,
    });
  }

  getData(): void {
    this.data = {
      first_name: this.employeeForm.value['firstName'],
      last_name: this.employeeForm.value['lastName'],
    } as Employee;

    if (this.employee) {
      this.data = {
        ...this.data,
        id: this.employee.id,
      };
    }
    this.dialogRef.close(this.data);
  }
}
