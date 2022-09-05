import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ToastsComponent } from 'app/main/components/toasts/toasts.component';

@NgModule({
  declarations: [ToastsComponent],
  imports: [CommonModule, CoreCommonModule, NgbModule, ContentHeaderModule, CardSnippetModule],
  exports: [ToastsComponent],
})
export class ToastsModule {}
