import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Api, Country } from './models'


@Injectable()
export class NewsDatabase extends Dexie { 

    private apikeydb: Dexie.Table<Api,string>;
    private countrydb: Dexie.Table<Country,string>;

    constructor() {
        //database name
        super('newsapp')

        //setup the schema for v1
        this.version(1).stores({
            api: '++i, apikey',
            countries: 'code'
            //articles: '++i';
        })

        // get a reference to the collection
    this.apikeydb = this.table('api')
    this.countrydb = this.table('countries')

    
    }

    async addApikey(t: Api): Promise<any>{
        return await this.apikeydb.add(t)
    }

    async delApiKey(): Promise<any>{
        return await this.apikeydb.clear()
    }

    async addCountry(t: Country): Promise<any>{
        return await this.countrydb.put(t)
    }

    async getAllCountries(): Promise<Country[]> {
        return (await this.countrydb.toArray())
        .map(d=> {
            return{
            code: d.code,
            name: d.name,
            flag: d.flag
            } as Country
        })
    }

    
 //  async getCountry(): Promise<any>{
   // return (await this.data.toArray())
    //.map(d=>{
    //    return{
     //       id: d.id,
      //      API_KEY: d.API_KEY,
       //     countryList:d.countryList,
        //    articles:d.articles
       // }
   // })
//}
}