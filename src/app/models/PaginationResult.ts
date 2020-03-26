import { Candidate } from './Candidate'

export class PaginationResult {
  total:number
  perPage:number
  page:number
  lastPage:number
  data:Candidate[]
}