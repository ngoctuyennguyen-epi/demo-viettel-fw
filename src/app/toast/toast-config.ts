import { InjectionToken } from '@angular/core';
import { ToastData } from './toast-data';

export const TOAST_CONF = new InjectionToken<ToastData>('TOAST_CONF');
export const RUNTIME_TOAST_CONF = new InjectionToken<ToastData>('RUNTIME_TOAST_CONF');

export const TOAST_TYPE = {
    SUCCESS: { bgColor: '#98FB98', textColor: 'black'},
    ERROR: { bgColor: '#FF6347', textColor: 'white'},
    WARNING: { bgColor: '#F0E68C', textColor: 'black'},
    INFO: { bgColor: '#87CEEB', textColor: 'white' },
    NORMAL: { bgColor: '#F8F8FF', textColor: 'black' },
    CUSTOM: null
};

export const TOAST_POSITION = {
    TOP_LEFT: { top: '2rem', left: '2rem'},
    TOP_CENTER: { top: '2rem', horizontalAlignment: true },
    TOP_RIGHT: { top: '2rem', right: '2rem' },
    BOTTOM_LEFT: { bottom: '2rem', left: '2rem'},
    BOTTOM_CENTER: { bottom: '2rem', horizontalAlignment: true },
    BOTTOM_RIGHT: { bottom: '2rem', right: '2rem' },
    CENTER: { horizontalAlignment: true, verticalAlignment: true }
};

export const TOAST_SIZE = {
    SMALL_DIALOG: { width: '30vw', height: 'auto' },
    MEDIUM_DIALOG: { width: '60vw', height: 'auto'},
    LARGE_DIALOG: { width: '90vw', height: 'auto'}
};

export interface ToastConfig {
    position?: any;
    size?: any;
    animation?: {
        fadeOut: number;
        fadeIn: number;
    };
    duration?: number;
    type?: { bgColor: string; textColor: string };
}

export const defaultToastConfig: ToastConfig = {
    position: TOAST_POSITION.CENTER,
    size: TOAST_SIZE.SMALL_DIALOG,
    animation: {
        fadeOut: 2500,
        fadeIn: 300,
    },
    duration: 2000,
    type: TOAST_TYPE.NORMAL
};
