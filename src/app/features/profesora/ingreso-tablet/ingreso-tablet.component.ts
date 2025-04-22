import { ChangeDetectionStrategy, Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CrearIngresoDialogComponent } from './crear-ingreso-dialog/crear-ingreso-dialog.component';
import { EditarIngresoDialogComponent } from './editar-ingreso-dialog/editar-ingreso-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface HistorialAsignacion {
  n: number;
  tablet: string;
  usuario: string;
  fechaAsignacion: Date;
  fechaDevolucion: Date | null;
  observacion: string;
  estado: string;
}

@Component({
  selector: 'app-ingreso-tablet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CrearIngresoDialogComponent,
    EditarIngresoDialogComponent,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './ingreso-tablet.component.html',
  styleUrl: './ingreso-tablet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngresoTabletComponent implements OnInit {
  historial = signal<HistorialAsignacion[]>([]);
  displayedColumns: string[] = ['n', 'tablet', 'usuario', 'fechaAsignacion', 'fechaDevolucion', 'observacion', 'estado', 'acciones'];
  dataSource = computed(() => new MatTableDataSource(this.historial()));
  searchTerm = signal<string>('');
  dialog = inject(MatDialog);
  nextId = 1;

  ngOnInit(): void {
    const ds = this.dataSource();
    ds.filterPredicate = (data: HistorialAsignacion, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return data.tablet.toLowerCase().includes(lowerCaseFilter) ||
             data.usuario.toLowerCase().includes(lowerCaseFilter) ||
             data.observacion?.toLowerCase().includes(lowerCaseFilter) ||
             data.estado.toLowerCase().includes(lowerCaseFilter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }

  agregarIngreso(): void {
    const dialogRef = this.dialog.open(CrearIngresoDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.historial.update(currentHistorial => [...currentHistorial, { ...result, n: this.nextId++ }]);
      }
    });
  }

  editarIngreso(ingreso: HistorialAsignacion): void {
    const dialogRef = this.dialog.open(EditarIngresoDialogComponent, {
      width: '500px',
      data: ingreso,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.historial.update(currentHistorial =>
          currentHistorial.map(i => (i.n === result.n ? result : i))
        );
      }
    });
  }

  eliminarIngreso(ingreso: HistorialAsignacion): void {
    this.historial.update(currentHistorial => currentHistorial.filter(i => i.n !== ingreso.n));
  }
}