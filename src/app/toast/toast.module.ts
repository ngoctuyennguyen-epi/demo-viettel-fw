import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { defaultToastConfig, TOAST_CONF } from './toast-config';

export type ToastType = 'warning' | 'info' | 'success' | 'error';
@NgModule({
    declarations: [ToastComponent],
    imports: [
        CommonModule
    ],
    exports: [ToastComponent]
})
export class ToastModule {
    public static forRoot(config = defaultToastConfig): ModuleWithProviders<any> {
        return {
            ngModule: ToastModule,
            providers: [
                {
                    provide: TOAST_CONF,
                    useValue: { ...defaultToastConfig, ...config },
                },
            ],
        };
    }
}

