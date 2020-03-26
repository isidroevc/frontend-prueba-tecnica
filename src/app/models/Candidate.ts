import { Attachment }  from './Attachment'
import { Country } from './Country'
export class Candidate {
  id:number
  country_id:number = 1
  name:string
  last_name:string
  age:number
  current_job?:string
  email:string
  phone:string
  company?:string
  province:string
  city?:string
  attachments: Attachment[]
  country: Country
  created_at?:Date
  updated_at?:Date
}

Candidate;

/*
      'country_id'--,
      'name',--
      'last_name' --,
      'age' --,
      'current_job' --,
      'email' --,
      'phone' -- ,
      'company' -- ,
      'province' --,
      'city'--
*/