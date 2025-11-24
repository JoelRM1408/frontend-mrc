import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AlumnoService } from '../../services/alumno.service';
import { ApoderadoService } from '../../services/apoderado.service';
import { MatriculaService } from '../../services/matricula.service';
import { Matricula } from '../../../../core/models/matricula.model';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,

  ],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css'
})
export class MatriculaComponent {
  matriculaForm: FormGroup = new FormGroup({});

  gradosFiltrados: any[] = [];
  seccionesFiltradas: any[] = []
  fb = inject(FormBuilder);
  alumnoService = inject(AlumnoService);
  apoderadoService = inject(ApoderadoService);
  matriculaService = inject(MatriculaService);

  grados = [
    { nombre: '1ro', nivel: 1 },
    { nombre: '2do', nivel: 1 },
    { nombre: '3ro', nivel: 1 },
    { nombre: '4to', nivel: 1 },
    { nombre: '5to', nivel: 1 },
    { nombre: '6to', nivel: 1 },
    { nombre: '1ro', nivel: 2 },
    { nombre: '2do', nivel: 2 },
    { nombre: '3ro', nivel: 2 },
    { nombre: '4to', nivel: 2 },
    { nombre: '5to', nivel: 2 },
  ];
  secciones = [
    { nombre: 'A', turno: 1 },
    { nombre: 'B', turno: 1 },
    { nombre: 'C', turno: 1 },
    { nombre: 'D', turno: 2 },
    { nombre: 'E', turno: 2 },
    { nombre: 'F', turno: 2 }
  ];

  onNivelChange(event: any) {
    const nivelSeleccionado = Number(event.value); // 1 o 2
    this.gradosFiltrados = this.grados.filter(g => g.nivel === nivelSeleccionado);
    this.matriculaForm.get('matricula.seccion')?.reset();

  }
  onTurnoChange(event: any) {

    const turnoSeleccionado = Number(event.value);
    this.seccionesFiltradas = this.secciones.filter(s => s.turno === turnoSeleccionado);
    this.matriculaForm.get('matricula.seccion')?.reset();
  }


  ngOnInit() {
    this.matriculaForm = this.fb.group({
      estudiante: this.fb.group({
        nombres: [''],
        apellido_paterno: [''],
        apellido_materno: [''],
        dni: [''],
        fecha_nacimiento: ['']
      }),

      apoderado: this.fb.group({
        nombres: [''],
        apellido_paterno: [''],
        apellido_materno: [''],
        dni: [''],
        fecha_nacimiento: [''],
        direccion: [''],
        telefono: ['']
      }),

      matricula: this.fb.group({
        fecha_matricula: [''],
        nivel_academico: [''],
        grado_estudio: [''],
        seccion: [''],
        turno: ['']
      })
    });

  }

  registrarMatricula() {

    const data = this.matriculaForm.value;
    console.log("📌 DATA ENVIADA A BACKEND:");
    console.log(JSON.stringify(data, null, 2));
    const alumnoData = data.estudiante;
    console.log("📌 alumnoData:", alumnoData);
    const apoderadoData = data.apoderado;
    console.log("📌 apoderadoData:", apoderadoData);
    const matriculaData = data.matricula;
    console.log("📌 matriculaData:", matriculaData);

    this.alumnoService.crearAlumno(alumnoData).subscribe({
      next: alumnoResp => {

        const idAlumno = alumnoResp.id;
        console.log("id recibido:", idAlumno);

        this.apoderadoService.crearApoderado(apoderadoData).subscribe({
          next: apoderadoResp => {

            const idApoderado = apoderadoResp.id;
            console.log("id recibido:", idApoderado)
            const nuevaMatricula: Matricula = {
              ...matriculaData,
              alumno_id: idAlumno,
              apoderado_id: idApoderado
            };
            console.log("matricula final", nuevaMatricula);
            this.matriculaService.crearMatricula(nuevaMatricula).subscribe({
              next: resp => {
                console.log("Matrícula creada correctamente 🟢", resp);
              },
              error: err => console.error("Error en matrícula", err)
            });

          },
          error: err => console.error("Error en apoderado", err)
        });

      },
      error: err => console.error("Error en alumno", err)
    });
  }
  prueba() {
    console.log("soy prueba");
  }
}

