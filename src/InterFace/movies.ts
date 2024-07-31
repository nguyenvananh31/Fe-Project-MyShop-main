
interface ImovieLinks {
    episode: number;
    links: string;
  }
export interface Imovies {
    id?: number,
    name:string,
    content:string,
    thumb_url:string[],
    chieurap:boolean,
    episode_total:number,
    lang:string
    category_id: string[];
    year:string,
    view:number,
    actor:string[]
    links_movie: ImovieLinks[]
}