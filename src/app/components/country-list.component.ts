import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Country, Countries } from '../models';
import { stringify } from 'querystring';
import { NewsDatabase } from '../news.database';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

@Injectable()

export class CountryListComponent implements OnInit {

  possibleCountries = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']
  //countryInfo : Country
  countries: Country[] = []

  constructor(private http: HttpClient, private newsDB: NewsDatabase) { }

  async ngOnInit() {

   //retrieve countries from db
    this.newsDB.getAllCountries()
    .then(result => {
      this.countries = result;

    })

    if(this.countries.length == 0) { //country db is empty
    
      //get country info online
      const url = "https://restcountries.eu/rest/v2/alpha"
      for (let i=0; i<this.possibleCountries.length; i++) {
      
        let params = (new HttpParams()).set('codes', this.possibleCountries[i])

        const result = await this.http.get<any>(url, {params:params})
        .toPromise()
        
        
        let countryInfo: Country = {code:"", name:"", flag:""}
        countryInfo.code = result[0]['alpha2Code']
        countryInfo.name = result[0]['name']
        countryInfo.flag = result[0]['flag']

        await this.newsDB.addCountry(countryInfo)

        this.newsDB.getAllCountries()
        .then(result => {
          this.countries = result;
        })
    
      }
    }
  }


  async getCountyInfo(code: string): Promise<any> {
  const url = "https://restcountries.eu/rest/v2/alpha"
  let flagurl = 'flagurl'
  let name = '' 

  let params = (new HttpParams()).set('codes', 'sg')
  
  this.http.get<any>(url, { params : params })
  .toPromise()
  .then(resp => {
    flagurl = resp[0].flag
    name = resp[0].name
    //console.info(resp)
    //console.info(resp[0].flag)
    //this.price = results[0].price;
  })
  console.info('flag: ', flagurl)
  return {code: code, name: name, flag: flagurl } as Country
  }
}
