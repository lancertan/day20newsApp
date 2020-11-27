import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsDatabase } from '../news.database';
import { Api } from '../models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-api-setting',
  templateUrl: './api-setting.component.html',
  styleUrls: ['./api-setting.component.css']
})

export class ApiSettingComponent implements OnInit {

  apiKey = ''
  form:FormGroup
  keyFC = new FormControl('',[Validators.required])


  constructor(private fb: FormBuilder, private newsDB: NewsDatabase, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      key : this.keyFC
    })
  }

  async addKey(){

    console.info('adding key: ', this.form.get('key').value)
    const key: Api = {
      id: 1,
      key: this.form.get('key').value
    }
    await this.newsDB.addApikey(key)
    this.router.navigate([ '/countryList' ])

  }
  
  async deleteKey(){
    console.info('deleting key: ', this.form.get('key').value)
    await this.newsDB.delApiKey()

  }


}
