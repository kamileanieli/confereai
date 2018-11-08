import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeputadoDetalhesPage } from './deputado-detalhes';

@NgModule({
  declarations: [
    DeputadoDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(DeputadoDetalhesPage),
  ],
})
export class DeputadoDetalhesPageModule {}
