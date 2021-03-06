import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { RouterModule } from '@angular/router';
import { HttpExceptionInterceptor } from './httpExceptionInterceptor';
import { TrustHtmlPipe, TrustScriptPipe, TrustStylePipe, TrustUrlPipe } from './trust-resource.pipe';
import { WebcamModule } from 'ngx-webcam';

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { HnUiModule } from 'components/hn-ui.module';
// import { HnUiModule } from 'publish';

import { AuthService } from '../auth.service';

import { ScrollDirective } from '../directive/scroll.directive';
import { LayoutComponent } from '../components/layout/layout.component';

import { MarkdownTabComponent } from '../components/markdown-tab/markdown-tab.component';
import { CatalogComponent } from '../components/catalog/catalog.component';

/**
 *公共组件
 * @type {any[]}
 */
const COMPONENT = [
  TrustUrlPipe,
  TrustHtmlPipe,
  TrustScriptPipe,
  TrustStylePipe,
  LayoutComponent,
  MarkdownTabComponent,
  CatalogComponent
];

/**
 * 第三方模块
 * @type {NgZorroAntdModule[]}
 */
const THIRD_MODULE = [NgZorroAntdModule, WebcamModule, HnUiModule];

/**
 * 公共指令
 * @type {any[]}
 */
const DIRECTIVES = [ScrollDirective];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MarkdownModule.forChild(),
    DragDropModule,
    ...THIRD_MODULE
  ],
  declarations: [...COMPONENT, ...DIRECTIVES],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpExceptionInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
    AuthService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MarkdownModule,
    DragDropModule,
    ...THIRD_MODULE,
    ...COMPONENT,
    ...DIRECTIVES
  ]
})
export class ShareModule {}
