import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface Alumno {
  n: number;
  nombre: string;
  apellido: string;
  grado: string;
  dni: string;
  seccion: string;
  anioEscolar: number;
  telefonoApoderado: string;
}

@Component({
  selector: 'app-editar-alumno-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './editar-alumno-dialog.component.html',
  styleUrls: ['./editar-alumno-dialog.component.scss'],
})
export class EditarAlumnoDialogComponent {
  alumno: Alumno;

  constructor(
    public dialogRef: MatDialogRef<EditarAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno
  ) {
    this.alumno = { ...data }; // Create a copy to avoid modifying the original directly
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.alumno);
  }
}