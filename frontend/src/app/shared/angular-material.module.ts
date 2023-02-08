import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AngularMaterialModule {}
