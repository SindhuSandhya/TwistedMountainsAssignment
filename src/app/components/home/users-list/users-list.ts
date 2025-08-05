import { Component } from '@angular/core';
import { Users } from '../../../services/users';
import { User } from '../../../models/user.type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersList {
  users: User[] = [];
  headers: string[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  editing: { row: number; col: number } | { row: number; all: true } | null = null;
  tempValues: { [key: string]: any } = {}; 

  isCellEditing(row: number, col: number): boolean {
    return !!(this.editing && this.editing.row === row && 'col' in this.editing && this.editing.col === col);
  }

  isRowEditing(row: number): boolean {
    return !!(this.editing && this.editing.row === row && 'all' in this.editing && this.editing.all);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  startEdit(row: number, col: number, event: MouseEvent) {
    event.stopPropagation();
    this.editing = { row, col };
    const header = this.headers[col].toLowerCase();
    this.tempValues[`${row}-${col}`] = this.paginatedUsers[row][header];
  }

  startEditRow(row: number, event: MouseEvent) {
    event.stopPropagation();
    this.editing = { row, all: true };
    this.headers.forEach((header, colIdx) => {
      const headerKey = header.toLowerCase();
      this.tempValues[`${row}-${colIdx}`] = this.paginatedUsers[row][headerKey];
    });
  }

  onCellInput(row: number, col: number, event: any) {
    this.tempValues[`${row}-${col}`] = event.target.value;
  }

  saveCellEdit(row: number, col: number, event: Event) {
    event.stopPropagation();
    this.updateCell(row, col, this.tempValues[`${row}-${col}`]);
    this.stopEdit();
  }

  saveRow(row: number, event: MouseEvent) {
    event.stopPropagation();
    this.headers.forEach((header, colIdx) => {
      const tempKey = `${row}-${colIdx}`;
      if (this.tempValues.hasOwnProperty(tempKey)) {
        this.updateCell(row, colIdx, this.tempValues[tempKey]);
      }
    });
    this.stopEdit();
  }

  cancelEdit(event: Event) {
    event.stopPropagation();
    this.stopEdit();
  }

  onRowClick(user: User, event: MouseEvent) {
    if (!this.editing) {
      this.selectedUser(user);
    }
  }


  stopEdit() {
    this.editing = null;
    this.tempValues = {};
  }

  updateCell(row: number, col: number, newValue: any) {
    const header = this.headers[col].toLowerCase();

    this.paginatedUsers[row][header] = newValue;

    const userId = this.paginatedUsers[row].id;
    const actualUserIndex = this.users.findIndex(user => user.id === userId);
    if (actualUserIndex !== -1) {
      this.users[actualUserIndex][header] = newValue;
    }
  }

  constructor(private usersService: Users, private router: Router) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.headers = Object.keys(data[0] || {}).map(key => key.charAt(0).toUpperCase() + key.slice(1));
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  trackByUserId(index: number, user: User): string {
    return user.id;
  }

  selectedUser(user: User, event?: Event) {
    this.router.navigate(['/home/user-details', user.id], { state: { user } });
    if (event) {
      event.stopPropagation();
    }
  }
}