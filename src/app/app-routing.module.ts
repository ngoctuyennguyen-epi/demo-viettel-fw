import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent, LayoutModule } from 'mobile-money-layout';
import { LoginComponent, P404Component, P500Component} from 'mobile-money';
import {TabOneComponent} from './tab-one/tab-one.component';



const routes: Routes = [

    {
        path: '', component: MainComponent,
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
            {
                path: 'in-batch',
                component: TabOneComponent
            },
        ]
    },
    {
        path: 'account/login',
        component: LoginComponent,
    },
    {
        path: '404',
        component: P404Component,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    imports: [LayoutModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
