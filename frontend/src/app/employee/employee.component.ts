import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { Employee } from '../models/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { map, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  isLoading = true;

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  employees: Employee[];
  selected = [];
  SelectionType = SelectionType;
  columns: any[] = [
    { prop: 'first_name', name: 'Imię' },
    { prop: 'last_name', name: 'Nazwisko' },
  ];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployeesList().subscribe((response) => {
      this.employees = response;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.ngxDatatable.columnMode = ColumnMode.force;
  }

  singleSelectCheck = (row: any) => {
    return this.selected.indexOf(row) === -1;
  };

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
    });

    dialogRef.componentInstance.confirmTitle = 'Usuwanie pracownika';
    dialogRef.componentInstance.confirmMessage =
      'Jesteś pewny? Zmiany nie mogą zostać cofnięte.';
    dialogRef.componentInstance.confirmAction = 'USUŃ';

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) {
            return empty();
          }

          return this.employeeService.deleteEmployee(this.selected[0].id);
        })
      )
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this.employeeService.getEmployeesList();
        }),
        map((data) => {
          this.isLoading = false;
          return data;
        })
      )
      .subscribe((response) => {
        this.employees = response;
        this.selected = [];
      });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: {},
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) {
            return empty();
          }
          return this.employeeService.addEmployee(result);
        })
      )
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this.employeeService.getEmployeesList();
        }),
        map((data) => {
          this.isLoading = false;
          return data;
        })
      )
      .subscribe((response) => {
        this.employees = response;
        this.selected = [];
      });
  }

  editEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: {},
      disableClose: true,
    });

    dialogRef.componentInstance.employee = this.selected[0];

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) {
            return empty();
          }
          return this.employeeService.editEmployee(result);
        })
      )
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this.employeeService.getEmployeesList();
        }),
        map((data) => {
          this.isLoading = false;
          return data;
        })
      )
      .subscribe((response) => {
        this.employees = response;
        this.selected = [];
      });
  }
}
