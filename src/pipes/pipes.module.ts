import { NgModule } from '@angular/core';
import { TwoDigitPipe } from './two-digit/two-digit';
@NgModule({
	declarations: [TwoDigitPipe],
	imports: [],
	exports: [TwoDigitPipe]
})
export class PipesModule {}
