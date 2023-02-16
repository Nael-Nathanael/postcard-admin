export interface Media {
  url: string;
  credit: string;
}

export interface RowData {
  url: string;
  url_title: string;
  score: number;
  lat: number;
  long: number;
  gmap: string;
}

export interface Place {
  url: string;
  name: string;
  media: Media[];
  placeId: string;
  mediaIds: string[];
  urlTitle: string;
  description: string;
  externalAttribution: string;
  externalPublishedAt: Date;
  row_data: RowData;
}

export interface PcHistory {
  source: string;
  anchor: string;
  createdAt: Date;
  scrapedAt: Date;
  parsedAt: Date;
  matchedAt: Date;
  uploadedAt: Date;
  ignoredAt?: any;
  description: string;
  isUploadPaused: boolean;
  places: Place[];
}

export interface FlowData {
  id: number,
  source: string,
  flow_started_at: string,
  crawl_ended_at: string,
  crawl_result: null | {
    crawled: string
  },
  scrap_ended_at: string,
  scrap_result: string,
  parse_ended_at: string,
  parse_result: string,
  match_ended_at: string,
  match_result: null | {
    matched: string
  },
}

export interface ExtendedFlowData extends FlowData {
  data: PcHistory[]
}