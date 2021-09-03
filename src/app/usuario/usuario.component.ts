import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Edit } from './edit-modal/Edit';
import { Usuario } from './Usuario';
import { UsuarioModule } from './usuario.module';
import { UsuarioService } from './usuario.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnChanges {

  formUsuario!: FormGroup;

  usuarios: Usuario[] = []; 

  exibeEditForm: boolean = false;
  tltFormEdit: String = "Editar Usuário";
  edit: Edit = new Edit;

  isDisabled: boolean = true;
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.createForm();
    this.buscarTodos();
  }

  ngOnChanges(){
    
  }

  createForm(){
    this.formUsuario = new FormGroup({
      email: new FormControl(""),
      id: new FormControl("")
    })
  }

  acaoEditModal(event: any){
    if(event){
      this.exibeEditForm = false;
    }
    this.ngOnInit();
  }

  async buscarTodos(){
    this.usuarioService.getUsuarios().subscribe(result=>{
      console.log(result);
      this.usuarios = result;
    },err=>{
      console.log(err)
    })
  }

  buscar(){
    if(this.formUsuario.value.email != ""){
      this.usuarioService.findByEmail(this.formUsuario.value).subscribe(result=>{
        console.log(result)
      },err=>{
        console.log(err);
      })
    }
  }

  criar(){
    let usuario = new Usuario();
    usuario.apelido = this.formUsuario.value.apelido;
    usuario.email = this.formUsuario.value.email;
    usuario.senha = Md5.hashStr(this.formUsuario.value.senha);
    usuario.avatar = '';
    usuario.idExterno = 0;
    usuario.flgAceiteTermo = true;
    usuario.flgAceiteLGPD = true;
    usuario.flgAtivo = true;
    usuario.dtHrRegistro = '2021-08-02';
    this.usuarioService.criarUsuario(usuario).subscribe(result=>{
      console.log(result);
      this.ngOnInit();
    },err=>{
      console.log(err);
      this.ngOnInit();
    })
  }

  detalhar(usuario: Usuario){
    console.log(usuario);
  }

  async desabilitar(usuario: Usuario){
    usuario.flgAtivo = false;
    await this.usuarioService.desabilitarUsuario(usuario).subscribe(result=>{
      console.log(result);
      this.ngOnInit();
    }, err=>{
      console.log(err);
      this.ngOnInit();
    })
  }

  editar(usuario: Usuario){
    console.log(usuario);
    this.edit.data = usuario;
    this.edit.isPresent = true;
    this.edit.classe = "usuario";
    this.exibeEditForm =true;
  }
}
