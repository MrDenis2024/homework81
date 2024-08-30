export interface Link {
  _id: string,
  shortUrl: string;
  originalUrl: string;
}

export interface NewLink {
  url: string;
}