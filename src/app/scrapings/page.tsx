'use client';

import data from "../demo.data.json"
import PostcardMain from "@/components/main/postcardMain";
import {useState} from "react";

export default function Scrapings() {
  const [focusedId, setFocusedId] = useState<number>();

  const focusedDatum = focusedId ? data.filter((e: { id: number; }) => e.id === focusedId)[0] : null;

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
                    <h5>Scraping Details</h5>
                    <small className="text-secondary">ID: #{focusedDatum.id}</small>
                </div>
            </div>
        </>
    }
  </PostcardMain>
}
