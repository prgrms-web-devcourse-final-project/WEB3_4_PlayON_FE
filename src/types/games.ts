export interface gameSimple {
  title: string;
  genre: string[];
  img_src: string;
  background_src: string;
}

export interface gameDetail {
  title: string;
  genre: string[];
  img_src: string;
  screenshot_src: string[];
  movie_src: string[];
  short_desc: string;
  release_date: Date;
  developer: string;
  publisher: string;
  homepage_url: string;
  os: string[];
  detail_desc: string;
  about: string;
}
