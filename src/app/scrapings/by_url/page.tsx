'use client';

import PostcardMain from "@/components/main/postcardMain";
import {useEffect, useState} from "react";
import {DetailPage} from "@/interfaces/FlowInterface";
import axios from "axios";
import Image from "next/image";
import PlaceCards from "@/components/PlaceCards";

export default function ScrapingsByUrl(context: any) {
  const url = context.searchParams.url;
  console.log(context)

  const [data, setData] = useState<DetailPage | null>(null)

  useEffect(() => {
    if (data) return;
    fetchPageDetail()
  })

  async function fetchPageDetail() {
    await axios.get(`${process.env["NEXT_PUBLIC_API_URL"]}/dashboard/flow/page?url=${url}`)
      .then(e => e.data as DetailPage)
      .then(e => {
        setData(e)
      })
  }

  if (!data) {
    return <div></div>
  }

  return <PostcardMain
    backbutton={true}
    title={data.title}
    foottitle={data.url}
    footurl={data.url}
  >
    <div className="card card-body">
      <div className="container-fluid p-4">
        <h5>{data.source.replace(/__/g, " - ").replace(/_/g, " ")}</h5>

        <div className="d-flex mb-3">
          {data.media &&
              <div style={{height: "200px", width: "200px"}} className={"position-relative flex-shrink-0 me-3"}>
                  <Image src={data.media[0].url} alt={data.media[0].url} style={{objectFit: "cover"}} fill={true}/>
              </div>
          }

          <div className="row g-2">
            <div className="col-3">
              <h6 className={"mb-0"}>Start Time</h6>
              <small>{new Date(data.createdAt).toLocaleString()}</small>
            </div>
            <div className="col-3">
              <h6 className={"mb-0"}>Parsed Time</h6>
              <small>{new Date(data.parsedAt).toLocaleString()}</small>
            </div>
            {data.ignoredAt &&
                <>
                    <div className="col-6 text-danger">
                        <h6 className={"mb-0"}>IgnoredAt</h6>
                        <small>{new Date(data.ignoredAt).toLocaleString()}</small>
                    </div>
                    <div className="col-12 text-danger">
                        <h6 className={"mb-0"}>Ignored Description</h6>
                        <small>{data.ignored_reason}</small>
                    </div>
                </>
            }
            {!data.ignoredAt &&
                <>
                    <div className="col-12">
                        <h6 className={"mb-0"}>Description</h6>
                        <small>{data.description}</small>
                    </div>
                    <div className="col-12">
                        <h6 className={"mb-0"}>Excerpt</h6>
                        <small>{data.excerpt}</small>
                    </div>
                </>
            }
          </div>
        </div>

        <PlaceCards places={data.places}/>
      </div>
    </div>
  </PostcardMain>
}