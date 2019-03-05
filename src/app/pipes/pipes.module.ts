import { NgModule } from '@angular/core';

import { UrlPipe } from './url.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [UrlPipe, FilterPipe],
  imports: [],
  exports: [UrlPipe, FilterPipe]
})
export class PipesModule { }
