import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../Usuario';
import { UsuarioService } from '../usuario.service';
import { Edit } from './Edit';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnDestroy, OnChanges {

  altPage!: number;
  @Input() exibe!: boolean;
  @Input() tltFormEdit!: String;
  @Input() edit!: Edit;

  @Output() acaoRealizada = new EventEmitter

  formEditUsuario!: FormGroup;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.altPage = document.getElementsByTagName('html')[0].scrollHeight + 60
  }

  ngOnDestroy(){

  }

  ngOnChanges(){
    if(this.exibe){
      if (this.edit.classe == "usuario") {
        this.createEditUsuarioForm(this.edit.data);
      }    
    }
  }

  createEditUsuarioForm(usuarioForm: Usuario){
    this.formEditUsuario = new FormGroup({
      apelido: new FormControl(usuarioForm.apelido),
      email: new FormControl(usuarioForm.email)
    })
  }

  onEdit(){
    this.edit.data.apelido = this.formEditUsuario.value.apelido;
    this.edit.data.email = this.formEditUsuario.value.email;
    this.usuarioService.editarUsuario(this.edit.data).subscribe(result=>{
      console.log(result);
    },err=>{
      console.log(err);
    })
  }

  fechaBox(){
    this.exibe = false;
    this.acaoRealizada.emit(true);
    this.ngOnDestroy();
    
  }

}
