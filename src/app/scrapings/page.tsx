'use client';

import data from "../demo.data.json"
import PostcardMain from "@/components/main/postcardMain";
import {useState} from "react";
import Image from "next/image";

export default function Scrapings() {
  const [focusedId, setFocusedId] = useState<number>();
  const [focusedPlace, setFocusedPlace] = useState<{
    id: number,
    name: string,
    url: string,
    confidence: number,
    excerpt: string,
    media: string
  } | null>();

  const focusedDatum = focusedId ? data.filter((e: { id: number; }) => e.id === focusedId)[0] : null;

  // @ts-ignore
  return <PostcardMain title={"Scrapings"}>
    <div className="card card-body">
      <table className="table small align-middle">
        <thead>
        <tr>
          <th>ID</th>
          <th>Date/Time</th>
          <th>Site</th>
          <th>URL</th>
          <th>Postcards</th>
          <th>Confidence</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data.map((datum) => {
          return <tr key={datum.id}>
            <td>{datum.id}</td>
            <td>{datum.createdAt}</td>
            <td>{datum.site}</td>
            <td>{datum.url}</td>
            <td>{datum.count}</td>
            <td className={"text-success"}>{datum.confidence * 100}%</td>
            <td>
              <button type={"button"} onClick={() => setFocusedId(datum.id)}
                      className="btn btn-primary btn-sm rounded-pill px-3">
                Details
              </button>
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </div>

    {focusedDatum &&
        <>
            <div className={"position-fixed top-0 start-0 w-100 h-100"} style={{
              zIndex: 1001,
              background: "rgba(0, 0, 0, .6)",
              cursor: "pointer",
            }} onClick={() => setFocusedId(0)}/>
            <div className="position-fixed top-50 start-50 translate-middle bg-white" style={{
              width: "max(80vw, 800px)",
              zIndex: 1002,
            }}>
                <div className="container p-4">
                    <div className="d-flex justify-content-between">
                        <h5>Scraping Details</h5>
                        <i className="bi bi-x-lg" style={{
                          cursor: "pointer",
                        }} onClick={() => setFocusedId(0)}/>
                    </div>
                    <small className="text-secondary">ID: #{focusedDatum.id}</small>
                    <h4 className={"mb-0"}>{focusedDatum.site}</h4>
                    <small className="text-secondary">{focusedDatum.createdAt}</small>
                    <br/>
                    <hr/>
                    <h5>Postcards</h5>
                    <table className="table small align-middle">
                        <thead>
                        <tr>
                            <th>Place Name</th>
                            <th>URL</th>
                            <th className={"text-center"}>Confidence</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {focusedDatum.places.map(place => {
                          return <tr key={place.id}>
                            <td>{place.name}</td>
                            <td>{place.url}</td>
                            <td className={"text-success text-center"}>
                              {place.confidence * 100}%
                            </td>
                            <td className={"text-center"}>
                              <button type={"button"}
                                      onClick={() => setFocusedPlace(place)}
                                      className="btn btn-primary btn-sm rounded-pill px-3">
                                View
                              </button>
                            </td>
                          </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    }

    {focusedPlace &&
        <>
            <div className={"position-fixed top-0 start-0 w-100 h-100"} style={{
              zIndex: 1003,
              background: "rgba(0, 0, 0, .6)",
              cursor: "pointer",
            }} onClick={() => setFocusedPlace(null)}/>
            <div className="position-fixed top-50 start-50 translate-middle bg-white" style={{
              width: "min(80vw, 500px)",
              zIndex: 1004,
            }}>
                <div className="container p-4">
                    <div className="d-flex justify-content-between">
                        <h6>View Postcard</h6>
                        <i className="bi bi-x-lg" style={{
                          cursor: "pointer",
                        }} onClick={() => setFocusedPlace(null)}/>
                    </div>
                    <h4>{focusedPlace.name}</h4>
                    <div className="w-100 position-relative mb-4" style={{
                      height: "200px"
                    }}>
                        <Image src={focusedPlace.media} alt={"place image"} fill={true} style={{
                          objectFit: "cover"
                        }}/>
                    </div>
                    <p className="fw-bold mb-0">Excerpt</p>
                    <p>{focusedPlace.excerpt}</p>
                </div>
            </div>
        </>
    }
  </PostcardMain>
}
