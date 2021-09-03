import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './usuario.component';
import { UsuarioService } from './usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    EditModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UsuarioComponent,
    EditModalComponent
  ],
  providers:[
    UsuarioService
  ]
})
export class UsuarioModule { }
