export class Category{
  id:number;
  title:string;
  description:string;

  constructor(id:number = 0, title:string = '', description:string = ''){
    this.id = id;
    this.title = title;
    this.description = description;
  }

}
