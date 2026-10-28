
import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  photo: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
onCancel() {
throw new Error('Method not implemented.');
}

  @Output() studentAdded = new EventEmitter<Student>();

  selectedPhoto: string = '';

  studentForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),
    gender: new FormControl('', Validators.required)
  });

  get f() {
    return this.studentForm.controls;
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      input.value = '';
      return;
    }

  
    if (file.size > 2 * 1024 * 1024) {
      alert('Please select an image smaller than 2 MB.');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.selectedPhoto = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const student: Student = {
      firstName: this.f['firstName'].value || '',
      lastName: this.f['lastName'].value || '',
      email: this.f['email'].value || '',
      contact: this.f['contact'].value || '',
      gender: this.f['gender'].value || '',
      photo: this.selectedPhoto
    };

    this.studentAdded.emit(student);

    this.studentForm.reset();
    this.selectedPhoto = '';
  }
}
