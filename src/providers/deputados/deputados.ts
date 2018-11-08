import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DeputadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeputadosProvider {

  private baseApiPath = "https://dadosabertos.camara.leg.br/api/v2";

  constructor(public http: HttpClient) {
    console.log('Hello DeputadosProvider Provider');
  }

  getDeputados(link=''){
  	if (link == ''){
  		return this.http.get(this.baseApiPath + '/deputados');
  	}else{
  		return this.http.get(link);
  	}
  }

  getOneDeputado(id){
  	return this.http.get(this.baseApiPath + '/deputados/'+id);
  }

}
