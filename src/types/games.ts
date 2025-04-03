export interface gameSimple {
  title: string;
  img_src: string;
  background_src: string;
}

export interface gameDetail {
  name: string;
  img_src: string;
  screenshot_src: string[];
  movie_src: string[];
  short_desc: string;
  release_date: Date;
  developer: string;
  publisher: string;
  homePage_url: string;
  os: string[];
  detail_desc: string;
  about: string;
}
