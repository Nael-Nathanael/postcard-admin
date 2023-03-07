"use client";

import PostcardMain from "@/components/main/postcardMain";
import FlowTable from "@/components/FlowTable";
import { ReactElement } from "react";

export default function Dashboard(): ReactElement {
  return (
    <PostcardMain title={"Content Dashboard"}>
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

        <FlowTable/>
      </div>
    </PostcardMain>
  );
}
