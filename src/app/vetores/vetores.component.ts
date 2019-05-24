import { Component, OnInit } from '@angular/core';
import { Estado } from '../entidades/estado';
import { ServicoEstado } from '../servicos/servico.estado';
import { Observable } from 'rxjs';

@Component({
  selector: 'vetor-component'
  ,templateUrl: 'vetores.component.html'
  ,styleUrls: ['vetores.component.html']
})
export class VetoresComponent implements OnInit{

  estados$ : Observable<Estado[]>;
  estado : Estado = new Estado();

  constructor(private servico: ServicoEstado){}

  ngOnInit(){
    this.update();
  }

  adicionar() : void {
    if(this.estado.id == null){
      this.servico.adicionar(this.estado).subscribe(
        () => {
          this.update();
        }
      );
    }else{
      this.servico.alterar(this.estado).subscribe(
        () => {
          this.update();
        }
      );
    }
    this.estado = new Estado();
  }

  update() : void {
    this.estados$ = this.servico.buscar();
  }

  excluir(id: number) : void {
    this.servico.excluir(id).subscribe(
      () => {
        this.update();
      }
    );
  }

  alterar(estado: Estado) : void{
    this.estado = new Estado();
    this.estado.id = estado.id;
    this.estado.nome = estado.nome;
    this.estado.sigla = estado.sigla;
  }

}
