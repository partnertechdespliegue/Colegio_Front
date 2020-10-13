import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';
import { FilterPipe, FilterPerfilPipe } from './filter.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    TruncatePipe,
    FilterPipe,
    FilterPerfilPipe,

  ],
  exports: [
    TruncatePipe,
    FilterPipe,
    FilterPerfilPipe
  ]
})
export class PipesModule { }
