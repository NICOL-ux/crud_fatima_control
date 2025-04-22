import { ChangeDetectionStrategy, Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
// Import your dialog components if you create them
// import { CrearAsignacionDialogComponent } from './crear-asignacion-dialog/crear-asignacion-dialog.component';
// import { EditarAsignacionDialogComponent } from './editar-asignacion-dialog/editar-asignacion-dialog.component';

interface HistorialAsignacion {
  codigo: string;
  alumno: string;
  grado: string;
  tabletAsignada: string;
  marca: string;
  fechaAsignacion: Date | null;
  fechaDevolucion: Date | null;
  estadoAsignacion: string;
  estadoDevolucion: string;
  observaciones: string;
  // Add 'n' if you need a sequential number
  n?: number;
}

@Component({
  selector: 'app-historial-asignacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    // Import dialog modules if you create dialogs
    // MatDialogModule,
    // CrearAsignacionDialogComponent,
    // EditarAsignacionDialogComponent,
  ],
  templateUrl: './historial-asignacion.component.html',
  styleUrl: './historial-asignacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistorialAsignacionComponent implements OnInit {
  historial = signal<HistorialAsignacion[]>([]);
  displayedColumns: string[] = [
    'codigo',
    'alumno',
    'grado',
    'tabletAsignada',
    'marca',
    'fechaAsignacion',
    'fechaDevolucion',
    'estadoAsignacion',
    'estadoDevolucion',
    'observaciones',
    // Add 'acciones' column if you implement edit/delete
    // 'acciones'
  ];
  dataSource = computed(() => new MatTableDataSource(this.historial()));
  searchTerm = signal<string>('');
  dialog = inject(MatDialog);
  // nextId = 1; // If you need a sequential ID

  ngOnInit(): void {
    // Access the underlying MatTableDataSource to set the filterPredicate
    const ds = this.dataSource();
    ds.filterPredicate = (data: HistorialAsignacion, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return data.codigo.toLowerCase().includes(lowerCaseFilter) ||
             data.alumno.toLowerCase().includes(lowerCaseFilter) ||
             data.grado.toLowerCase().includes(lowerCaseFilter) ||
             data.tabletAsignada.toLowerCase().includes(lowerCaseFilter) ||
             data.marca.toLowerCase().includes(lowerCaseFilter) ||
             (data.fechaAsignacion?.toLocaleDateString()?.includes(lowerCaseFilter) ?? '') ||
             (data.fechaDevolucion?.toLocaleDateString()?.includes(lowerCaseFilter) ?? '') ||
             data.estadoAsignacion.toLowerCase().includes(lowerCaseFilter) ||
             data.estadoDevolucion.toLowerCase().includes(lowerCaseFilter) ||
             data.observaciones.toLowerCase().includes(lowerCaseFilter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }

  // Implement your dialog opening functions if needed
  // agregarAsignacion(): void {
  //   const dialogRef = this.dialog.open(CrearAsignacionDialogComponent, {
  //     width: '500px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.historial.update(currentHistorial => [...currentHistorial, { ...result, n: this.nextId++ }]);
  //     }
  //   });
  // }

  // editarAsignacion(asignacion: HistorialAsignacion): void {
  //   const dialogRef = this.dialog.open(EditarAsignacionDialogComponent, {
  //     width: '500px',
  //     data: asignacion,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.historial.update(currentHistorial =>
  //         currentHistorial.map(a => (a.n === result.n ? result : a))
  //       );
  //     }
  //   });
  // }

  // eliminarAsignacion(asignacion: HistorialAsignacion): void {
  //   this.historial.update(currentHistorial => currentHistorial.filter(a => a.n !== asignacion.n));
  // }
}