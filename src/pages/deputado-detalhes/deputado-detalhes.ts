import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeputadosProvider } from '../../providers/deputados/deputados';

/**
 * Generated class for the DeputadoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deputado-detalhes',
  templateUrl: 'deputado-detalhes.html',
})
export class DeputadoDetalhesPage {
  public deputado;
  public deputadoId;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private deputadosProvider: DeputadosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeputadoDetalhesPage');
    this.deputadoId = this.navParams.get("id");

    this.deputadosProvider.getOneDeputado(this.deputadoId).subscribe(
    	data => {
    		console.log(data);
    		const response = (data as any);
    		this.deputado = response.dados;
    },
    	error => {
    		console.log(error);
    	}
    );
  }

}
