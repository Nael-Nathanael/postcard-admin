'use client';

import FlowCard from "@/components/FlowCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {ExtendedFlowData, FlowData} from "@/interfaces/FlowInterface";

interface FlowTableInterface {
  limit_per_page?: number
}

export default function FlowTable({limit_per_page = 6}: FlowTableInterface) {
  const [isFetched, setIsFetched] = useState(false)
  const [data, setData] = useState<FlowData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fullyLoaded, setFullyLoaded] = useState(false)

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

  return <>
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
            {datum.match_ended_at &&
                <>
                    <td className={"text-center"}>{total_crawl}</td>
                    <td className={"text-center"}>{total_matched}</td>
                    <td className={`fw-bold text-center text-${relevance_score < 70 ? 'danger' : 'success'}`}>
                      {relevance_score}%
                    </td>
                </>
            }
            {!datum.crawl_ended_at &&
                <td colSpan={3} className={"text-center text-danger fw-bold"}>
                    Error Occurred on Flow!
                </td>
            }
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
        <FlowCard focusedDatum={focusedDatum} setFocusedDatum={setFocusedDatum}/>
    }
  </>
}