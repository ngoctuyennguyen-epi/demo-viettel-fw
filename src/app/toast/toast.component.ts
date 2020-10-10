import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TOAST_DATA, ToastData } from './toast-data';
import { TOAST_REF, ToastRef } from './toast-ref';
import { RUNTIME_TOAST_CONF, TOAST_CONF, ToastConfig } from './toast-config';
import { TOAST_ANIMATION, ToastAnimationState } from './toast-animation';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'vt-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [TOAST_ANIMATION.fadeToast],
})
export class ToastComponent implements OnInit, OnDestroy {

  animationState: ToastAnimationState = 'default';
  iconType: string;
  private intervalId: number;
  progress: number;

  constructor(@Inject(TOAST_DATA) readonly data: ToastData,
              @Inject(TOAST_REF) readonly ref: ToastRef,
              @Inject(TOAST_CONF) readonly conf: ToastConfig,
              @Inject(RUNTIME_TOAST_CONF) readonly runtimeConf: ToastConfig) {
    this.iconType = data.type === 'success' ? 'done' : data.type;
    this.conf = { ...this.conf, ...this.runtimeConf };
  }

  ngOnInit() {
    if (this.conf.duration) {
      this.progress = 0;
      this.intervalId = setInterval(() => {
        if (this.progress >= this.conf.duration) {
          clearInterval(this.intervalId);
          this.progress = 0;
          this.animationState = 'closing';
        } else {
          this.progress += 10;
        }
      }, 10);
    }
  }

  close() {
    if (!this.conf.duration) {
      this.ref.close();
    }
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.ref.close();
    }
  }

  ngOnDestroy() {
    // clearTimeout(this.intervalId);
  }

}
