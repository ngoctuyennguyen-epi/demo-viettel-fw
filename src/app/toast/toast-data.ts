import { InjectionToken, TemplateRef } from '@angular/core';
import { ToastType } from './toast.module';

export const TOAST_DATA = new InjectionToken<ToastData>('TOAST_DATA');

export class ToastData {
    text?: string;
    type: ToastType;
    template?: TemplateRef<any>;
    templateContext?: {};
}
