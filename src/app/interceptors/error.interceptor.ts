import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest, HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, empty, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, last, switchMap, take, tap } from 'rxjs/operators';
import { HttpErrorMappingConfig } from './http-error-mapping-config';
import { ToastService } from '../toast/toast.service';
import { Inject, Injectable, InjectionToken, TemplateRef } from '@angular/core';
import { AccountService, UserToken } from 'mobile-money';
import { AutoLogoutService } from 'mobile-money';
import { TOAST_POSITION, TOAST_TYPE, ToastConfig } from '../toast/toast-config';

export interface ErrorDetailExtractor {
    getErrorCode(errorBody): string | number;

    getMessage(errorBody): string;

    getOtherInfo(errorBody): object;
}

interface MessageObject {
    code: string | number;
    message: string;
    isError: boolean;
}

export const ERROR_INTERCEPTOR_CONF = new InjectionToken<ErrorDetailExtractor>('ERROR_INTERCEPTOR_CONF');

export class DefaultErrorDetailExtractor implements ErrorDetailExtractor {
    getErrorCode(errObj: any): string | number {
        return errObj.status.code;
    }

    getMessage(errObj: any): string {
        return errObj.status.message;
    }

    getOtherInfo(errorBody): object {
        return null;
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastService: ToastService, private authService: AccountService,
                private autoLogout: AutoLogoutService,
                @Inject(ERROR_INTERCEPTOR_CONF) private errorDetailExtractor: ErrorDetailExtractor) {
    }
    private static DEFAULT_MSG = 'Co mot loi khong xac dinh xay ra!';
    private static DEFAULT_CODE = 'UNKNOWN';
    private static templateRef: TemplateRef<any>;
    private static toastConf: ToastConfig = { type: TOAST_TYPE.ERROR, position: TOAST_POSITION.TOP_CENTER };
    public isRefreshingToken = false;
    public refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    static injectTemplateRef(templateRef: TemplateRef<any>, toastConf?: ToastConfig): void {
        ErrorInterceptor.templateRef = templateRef;
        if (toastConf) {
            ErrorInterceptor.toastConf = toastConf;
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const msgObject: MessageObject = {
            code: ErrorInterceptor.DEFAULT_CODE,
            message: ErrorInterceptor.DEFAULT_MSG, isError: false
        };
        let errObj = null;
        return next
        .handle(req)
        .pipe(
            last(),
            tap((res) => {
                errObj = this.checkCustomHttpMsg(res, msgObject);
                if (errObj) {
                    return throwError(errObj);
                }
            }),
            catchError(error => {
                if (!(error instanceof HttpErrorResponse)) {
                    return throwError(error);
                }
                msgObject.isError = true;
                if (error.status === 401) {
                    return this.handle401Error(req, next);
                }
                errObj = this.checkCustomHttpMsg(error, msgObject);
                return throwError(errObj);
            }),
            finalize(() => {
                if (msgObject.isError) {
                    // show error DEFAULT_MSG
                    this.toastService.show({ text: null, type: 'error',
                            template: ErrorInterceptor.templateRef,
                            templateContext: { code: msgObject.code, message: msgObject.message}},
                        ErrorInterceptor.toastConf);
                }
            }));
    }

    private checkCustomHttpMsg(response: any, messageObject: MessageObject): object {
        // this function return the error object to be thrown, or null if response is not an error
        let bodyObj = null;
        if (response instanceof HttpResponse) {
            bodyObj = response.body;
        }
        if (response instanceof HttpErrorResponse) {
            bodyObj = response.error;
        }
        if (!bodyObj) { return bodyObj; }
        const isCustomizedResponse = this.parseJsonToMsgObject(bodyObj, messageObject);
        if (response.status === 200 && isCustomizedResponse) {
            const isError = (messageObject.code !== '200');
            messageObject.isError = isError;
            return isError ? bodyObj : null;
        }
        if (response.status !== 200) {
            messageObject.isError = true;
            if (isCustomizedResponse) {
                return bodyObj;
            }
            const msg = HttpErrorMappingConfig.STATUS_MAP.get(response.status);
            messageObject.code = response.status;
            messageObject.message = msg;
            return bodyObj;
        }
        return null;
    }

    private parseJsonToMsgObject(error: any, messageObject: MessageObject): boolean {
        try {
            const tempCode = this.errorDetailExtractor.getErrorCode(error);
            const tempMsg = this.errorDetailExtractor.getMessage(error);
            messageObject.code = tempCode;
            messageObject.message = tempMsg;
            return true;
        } catch (e) {
            return false;
        }
    }

    public handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.indexOf('oauth/token') < 0) {
            if (!this.isRefreshingToken) {
                this.isRefreshingToken = true;
                this.refreshTokenSubject.next(null);
                return this.authService.doRefreshToken().pipe(
                    switchMap((res: UserToken) => {
                        this.authService.refreshToken = res.refresh_token;
                        this.authService.accessToken = res.access_token;
                        this.autoLogout.reset();
                        this.refreshTokenSubject.next(res.refresh_token);
                        this.isRefreshingToken = false;
                        return next.handle(this.alterToken(req));
                    }),
                    catchError((error) => {
                        this.isRefreshingToken = false;
                        return this.logoutUser(error);
                    }))
                    ;
            } else {
                return this.refreshTokenSubject.pipe(
                    filter((result) => result !== null)
                    , take(1)
                    , switchMap(() => next.handle(this.alterToken(req)
                    )), catchError((err) => {
                        return this.logoutUser(err);
                    }));
            }
        } else {
            this.isRefreshingToken = false;
            this.authService.vsaLogout();
        }

        return next.handle(req);
    }

    public alterToken(req: HttpRequest<any>): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + this.authService.accessToken } });
    }

    public logoutUser(error) {
        this.authService.vsaLogout();
        return empty();
    }
}
