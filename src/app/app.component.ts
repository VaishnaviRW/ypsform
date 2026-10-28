
import { Component } from '@angular/core';
import { Student } from './add-student/add-student.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  students: Student[] = [];
  showForm = true;

  addStudent(student: Student): void {
    this.students = [...this.students, student];
    this.showForm = false;
  }

  openAddStudent(): void {
    this.showForm = true;
  }
}

