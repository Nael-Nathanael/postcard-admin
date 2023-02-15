'use client';

import PostcardMain from "@/components/main/postcardMain";
import {useEffect, useState} from "react";
import axios from "axios";

export interface Medium {
  url: string;
  credit: string;
}

export interface RowData {
  externalAttribution: string;
  externalPublishedAt: Date;
  url: string;
  url_title: string;
  media: Medium[];
  score: number;
  lat: number;
  long: number;
  gmap: string;
}

export interface Place {
  url: string;
  name: string;
  media: Medium[];
  placeId: string;
  mediaIds: string[];
  urlTitle: string;
  description: string;
  externalAttribution: string;
  externalPublishedAt: Date;
  row_data: RowData;
}

export interface RowData {
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

export interface ExtendedFlowData {
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
  data: RowData[]
}

export default function Home() {
  const [isFetched, setIsFetched] = useState(false)
  const [data, setData] = useState<FlowData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fullyLoaded, setFullyLoaded] = useState(false)
  const limit_per_page = 6

  const [focusedDatum, setFocusedDatum] = useState<ExtendedFlowData | null>(null);

  useEffect(() => {
    if (!isFetched) {
      refetch().then(_ => setIsFetched(true));
    }
  })

  async function fetchFlowDetail({focusedId}: { focusedId: number }) {
    await axios.get(`${process.env["NEXT_PUBLIC_API_URL"]}/dashboard/flows/${focusedId}`)
      .then(e => e.data)
      .then(e => {
        const selectedRow = data.filter(e => e.id === focusedId)[0]

        setFocusedDatum({
          ...selectedRow,
          data: e
        })
      })
  }

  async function refetch(current_page?: number | undefined) {
    await axios.get(`${process.env["NEXT_PUBLIC_API_URL"]}/dashboard/flows?page=${current_page ? current_page : currentPage}&limit=${limit_per_page}`)
      .then(e => e.data)
      .then(e => {
        setFullyLoaded(e.data.length === 0)
        const newData = [...data, ...e.data]
        setData(newData)
        if (current_page) {
          setCurrentPage(current_page)
        }
      })
  }

  return <PostcardMain title={"Content Dashboard"}>
    <div className="card card-body">
      <div className="row mb-5">
        <div className="col-4">
          <div className="card-body bg-light">
            <p className="h2">
              12.345
            </p>
            <small>
              Stats
            </small>
          </div>
        </div>
        <div className="col-4">
          <div className="card-body bg-light">
            <p className="h2">
              12.345
            </p>
            <small>
              Stats
            </small>
          </div>
        </div>
        <div className="col-4">
          <div className="card-body bg-light">
            <p className="h2">
              12.345
            </p>
            <small>
              Stats
            </small>
          </div>
        </div>
      </div>

      <h3 className="h5 mb-1">Recent Scrapings</h3>
      <p className="text-secondary small">Most recent automatic location scraping sessions</p>

      <table className="table small align-middle">
        <thead>
        <tr>
          <th>ID</th>
          <th>Started At</th>
          <th>Source</th>
          <th>URL Crawled</th>
          <th>Suitable URL</th>
          <th>Confidence</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {!isFetched &&
            <tr>
                <td colSpan={7}>Loading...</td>
            </tr>
        }
        {isFetched &&
          data.map((datum) => {
            const total_crawl = datum.crawl_result ? parseInt(datum.crawl_result.crawled) : 0;
            const total_matched = datum.match_result ? parseInt(datum.match_result.matched) : 0;
            const relevance_score = total_crawl ? Math.round(total_matched / total_crawl * 100) : 0;
            return <tr key={datum.id}>
              <td>#{String(datum.id).padStart(4, '0')}</td>
              <td>{new Date(datum.flow_started_at).toLocaleString()}</td>
              <td>{datum.source.replace(/__/g, " - ").replace(/_/g, " ")}</td>
              <td className={"text-center"}>{total_crawl}</td>
              <td className={"text-center"}>{total_matched}</td>
              <td className={`fw-bold text-center text-${relevance_score < 70 ? 'danger' : 'success'}`}>
                {relevance_score}%
              </td>
              <td>
                <button
                  type={"button"}
                  onClick={() => fetchFlowDetail({focusedId: datum.id})}
                  className="btn btn-primary btn-sm rounded-pill px-3">
                  Details
                </button>
              </td>
            </tr>
          })
        }
        </tbody>
      </table>

      {!fullyLoaded && isFetched &&
          <p onClick={() => refetch(currentPage + 1)} className="fw-bold text-primary text-center btn">
              View More
          </p>
      }

      {focusedDatum &&
          <>
              <div className={"position-fixed top-0 start-0 w-100 h-100"} style={{
                zIndex: 1001,
                background: "rgba(0, 0, 0, .6)",
                cursor: "pointer",
              }} onClick={() => setFocusedDatum(null)}/>
              <div className="position-fixed top-50 start-50 translate-middle bg-white overflow-auto" style={{
                width: "max(80vw, 800px)",
                height: "max(80vh, 400px)",
                zIndex: 1002,
              }}>
                  <div className="container p-4">
                      <div className="d-flex justify-content-between">
                          <h5>Scraping Details</h5>
                          <i className="bi bi-x-lg" style={{
                            cursor: "pointer",
                          }} onClick={() => setFocusedDatum(null)}/>
                      </div>
                      <small className="text-secondary">ID: #{focusedDatum.id}</small>
                      <h4 className={"mb-0"}>{focusedDatum.source.replace(/__/g, " - ").replace(/_/g, " ")}</h4>
                      <small className="text-secondary">{focusedDatum.flow_started_at}</small>
                      <br/>
                      <hr/>
                      <h5>Postcards</h5>
                      <table className="table small align-middle">
                          <thead>
                          <tr>
                              <th>Place Name</th>
                              <th className={"text-center"}>Confidence</th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody>
                          {focusedDatum.data.map(pchistory => {
                            return <>
                              <tr>
                                <td colSpan={3}
                                    className={`table-${pchistory.places.length > 0 ? 'success' : 'danger'}`}>
                                  {pchistory.places.length == 0 && "[IGNORED]"} {pchistory.anchor}
                                </td>
                              </tr>
                              {pchistory.places.map(place => {
                                return <tr key={place.placeId}>
                                  <td>{place.name}</td>
                                  <td className={"text-center"}>{place.row_data.score * 100}%</td>
                                  <td>
                                    <button type={"button"}
                                            className="btn btn-primary btn-sm rounded-pill px-3">
                                      Details
                                    </button>
                                  </td>
                                </tr>
                              })}
                            </>
                          })}
                          </tbody>
                      </table>
                  </div>
              </div>
          </>
      }
    </div>
  </PostcardMain>
}
