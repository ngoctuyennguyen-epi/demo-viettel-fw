import { Inject, Injectable, Injector } from '@angular/core';
import {Overlay, PositionStrategy} from '@angular/cdk/overlay';
import { TOAST_DATA, ToastData } from './toast-data';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { TOAST_REF, ToastRef } from './toast-ref';
import { ToastComponent } from './toast.component';
import { RUNTIME_TOAST_CONF, TOAST_CONF, ToastConfig } from './toast-config';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToast: ToastRef;

  constructor(private overlay: Overlay, private parentInjector: Injector,
              @Inject(TOAST_CONF) private toastConfig: ToastConfig) { }

  show(data: ToastData, runtimeConfig: ToastConfig = {}): ToastRef {
    const positionStrategy = this.getPositionStrategy(runtimeConfig);
    const overlayRef = this.overlay.create({ positionStrategy });

    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector = this.getInjector(data, toastRef, this.parentInjector, runtimeConfig);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector, runtimeConfig?: ToastConfig): PortalInjector {
    const tokens = new WeakMap();
    tokens.set(TOAST_DATA, data);
    tokens.set(TOAST_REF, toastRef);
    tokens.set(RUNTIME_TOAST_CONF, runtimeConfig);
    return new PortalInjector(parentInjector, tokens);
  }

  getPositionStrategy(runtimeConfig?: ToastConfig): PositionStrategy {
    let config = { ...this.toastConfig };
    if (runtimeConfig) {
      config = { ...runtimeConfig };
    }
    const positionStrategy = this.overlay.position().global();
    if (config.position.top) {
      positionStrategy.top(config.position.top);
    }
    if (config.position.right) {
      positionStrategy.right(config.position.right);
    }
    if (config.position.bottom) {
      positionStrategy.bottom(config.position.bottom);
    }
    if (config.position.left) {
      positionStrategy.left(config.position.left);
    }
    if (config.position.horizontalAlignment) {
      positionStrategy.centerHorizontally();
    }
    if (config.position.verticalAlignment) {
      positionStrategy.centerVertically();
    }
    return positionStrategy;
  }

  // getPositionStrategy(runtimeConfig?: ToastConfig) {
  //   return this.overlay.position()
  //   .global()
  //   .top(this.getPosition(runtimeConfig))
  //   .centerHorizontally();
  // }

  getPosition(runtimeConfig?: ToastConfig): string {
    const topPosition = runtimeConfig ? runtimeConfig : this.toastConfig.position.top;
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
    const position = lastToastIsVisible
        ? this.lastToast.getPosition().bottom + 20
        : topPosition;
    return position + 'px';
  }
}
