import { OverlayRef } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { ToastData } from './toast-data';

export const TOAST_REF = new InjectionToken<ToastData>('TOAST_REF');

export class ToastRef {
    constructor(readonly overlay: OverlayRef) { }

    close() {
        this.overlay.dispose();
    }

    isVisible() {
        return this.overlay && this.overlay.overlayElement;
    }

    getPosition() {
        return this.overlay.overlayElement.getBoundingClientRect();
    }
}
