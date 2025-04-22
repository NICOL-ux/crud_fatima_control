import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface EstadoTablet {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crear-tablet-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, // Import MatNativeDateModule
  ],
  templateUrl: './crear-tablet-dialog.component.html',
  styleUrl: './crear-tablet-dialog.component.scss',
})
export class CrearTabletDialogComponent {
  tablet = {
    codigo: '',
    marca: '',
    modelo: '',
    grado: '',
    observacion: '',
    estado: '',
    fecha: new Date(),
  };

  estados: EstadoTablet[] = [
    { value: 'disponible', viewValue: 'Disponible' },
    { value: 'en_uso', viewValue: 'En Uso' },
    { value: 'averiada', viewValue: 'Averiada' },
    { value: 'baja', viewValue: 'De Baja' },
  ];

  constructor(
    public dialogRef: MatDialogRef<CrearTabletDialogComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  crear(): void {
    this.dialogRef.close(this.tablet);
  }
}