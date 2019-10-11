import { NgModule } from '@angular/core';
import { TimerProgressComponent } from './timer-progress/timer-progress';
import { TimerComponent } from './timer/timer';
import { StateComponent } from './state/state';
@NgModule({
	declarations: [TimerProgressComponent,
    TimerComponent,
    StateComponent],
	imports: [],
	exports: [TimerProgressComponent,
    TimerComponent,
    StateComponent]
})
export class ComponentsModule {}
