import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-one',
  templateUrl: './tab-one.component.html',
  styleUrls: ['./tab-one.component.scss']
})
export class TabOneComponent implements OnInit, OnDestroy {

  @ViewChild('demoDiv', {static: true}) fuckingDiv: TemplateRef<any>;

  private count = 1;
  path = '/success';
  demoFormGroup: FormGroup;
  dataSource: any[] = [{id: '0', name: 'Nam'}, {id: '1', name: 'Nữ'}];
  subscription = new Subscription();

  constructor(private toastService: ToastService, private httpClient: HttpClient,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.demoFormGroup = this.fb.group({
      balance: '',
      gender: '1'
    });
  }

  showToast(): void {
    // this.toastService.show({ text: `Toast message ${this.count}`, type: 'warning' });
    this.toastService.show({template: this.fuckingDiv,  type: 'warning',
      templateContext: {name: 'Vu Tat Thanh'}});
    this.count += 1;
  }

  callApi(): void {
    const url = `https://8d4100ef-6b64-44a1-970d-e7165749c039.mock.pstmn.io/${this.path}`;
    const apiHeader = new HttpHeaders();
    apiHeader.set('x-api-key', 'PMAK-5f7d403813d0c2003453633e-ec5a2eeac5fba67b3e10476e1ddc975b19');
    this.subscription.add(this.httpClient.get(url, {headers: apiHeader}).subscribe(next => {
      console.log('response', next);
    }, error => {
      console.log('response', error);
    }));
  }

  submitForm(): void {
    const url = `http://localhost:8080/api/test`;
    console.log('Form value', this.demoFormGroup.value);
    this.subscription.add(this.httpClient.post(url, this.demoFormGroup.value)
    .subscribe(next => {
      console.log('response', next);
    }, error => {
      console.log('response', error);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
