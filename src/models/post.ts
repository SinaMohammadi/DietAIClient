import { v4 as uuidv4 } from 'uuid'
export class DIetPostModel {
  height?: number
  weight?: number
  description?: string
  name?: string
  sex?: string
  age?: number
  action?: string
  uniqId?: string = uuidv4()
}
export class FinalData {
  message!: string
  code!: string
}
