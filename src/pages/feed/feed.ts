import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeputadosProvider } from '../../providers/deputados/deputados';
import { DeputadoDetalhesPage } from '../deputado-detalhes/deputado-detalhes';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
  	DeputadosProvider,
  ]
})
export class FeedPage {
  public deputados = [
	  {
	  	nome: 'Fulano da Silva',
	  	partido: 'PR',
	  	imagem: 'assets/img/perfil.png',
	  },
	  {
	  	nome: 'Ciclano da Silva',
	  	partido: 'PMDB',
	  	imagem: 'assets/img/perfil.png',
	  }
  ];

  public lista_deputados: any[];
  public pagina: any;
  public infiniteScroll;
  public loader;

  public nomeUsuario:string = 'Kamile A. Wahlbrinck';

  constructor(public navCtrl: NavController, public navParams: NavParams, private deputadosProvider: DeputadosProvider, public loadingCtrl: LoadingController) {
  }

  public somaDoisNumeros(num1:number, num2:number): void {
    alert('Total de '+num1+' + '+num2+' = '+(num1+num2));
  }

  ionViewDidLoad() {
    //this.somaDoisNumeros(3,4);
    this.carregaDeputados();
  }

  carregaDeputados(newpage: boolean = false){
  	this.presentLoadingDefault();
    this.deputadosProvider.getDeputados(this.pagina).subscribe(
    	data => {
    		console.log(data);
    		const response = (data as any);

    		if(newpage){
    			this.lista_deputados = this.lista_deputados.concat(response.dados);
    			this.infiniteScroll.complete();
    		}else{
    			this.lista_deputados = response.dados;    			
    		}
    		
    		let that = this;
    		response.links.forEach (
                function (val, idx, arr) {
                    if (val.rel === "next") {
                        that.pagina = val.href;
                        return;
                    }
                }
            );

            this.loader.dismiss();
    	},
    	error => {
    		console.log(error);
    		this.loader.dismiss();	
    	}
    );
  }

  doinfiniteScroll(infiniteScroll){
  	this.infiniteScroll = infiniteScroll;
  	this.carregaDeputados(true);
  }

  // public proximaPagina(infiniteScroll): void{
  // 	 	this.deputadosProvider.proximaPagina(this.pagina).subscribe(
	 //    	data => {
	 //    		console.log(data);
	 //    		const response = (data as any);
	 //    		this.lista_deputados = this.lista_deputados.concat(response.dados);
	 //    		let that = this;
	 //    		response.links.forEach (
  //                   function (val, idx, arr) {
  //                       if (val.rel === "next") {
  //                           that.pagina = val.href;
  //                           return;
  //                       }
  //                   }
  //               );
	 //    	},
	 //    	error => {
	 //    		console.log(error);
	 //    	}
	 //    );
	 //    infiniteScroll.complete();
  // }

  presentLoadingDefault() {
	  this.loader = this.loadingCtrl.create({
	    content: 'Carregando...'
	  });

	  this.loader.present();	  
	}


  public abrirDetalhes(deputado): void{
  	this.navCtrl.push(DeputadoDetalhesPage, {id: deputado.id});
  }


}
