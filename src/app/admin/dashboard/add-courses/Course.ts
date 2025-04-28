import {Category} from './Category'

export class Course{
    id:any
    title:any
    description:any
    duration:any
    difficulty:any
    files:any=[]
    category:Category= new Category();
}
