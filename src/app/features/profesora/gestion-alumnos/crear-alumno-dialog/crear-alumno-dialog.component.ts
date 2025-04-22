import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-alumno-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './crear-alumno-dialog.component.html',
  styleUrls: ['./crear-alumno-dialog.component.scss'],
})
export class CrearAlumnoDialogComponent {
  alumno = {
    nombre: '',
    apellido: '',
    grado: '',
    dni: '',
    seccion: '',
    anioEscolar: new Date().getFullYear(),
    telefonoApoderado: '',
  };

  constructor(
    public dialogRef: MatDialogRef<CrearAlumnoDialogComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  crear(): void {
    this.dialogRef.close(this.alumno);
  }
}