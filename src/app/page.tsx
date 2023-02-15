import data from "./demo.data.json"
import PostcardMain from "@/components/main/postcardMain";

export default function Home() {
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
          <th>Date/Time</th>
          <th>Site</th>
          <th>URL</th>
          <th>Postcards</th>
          <th>Confidence</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data.slice(0, 6).map((datum) => {
          return <tr key={datum.id}>
            <td>{datum.id}</td>
            <td>{datum.createdAt}</td>
            <td>{datum.site}</td>
            <td>{datum.url}</td>
            <td>{datum.count}</td>
            <td className={"text-success"}>{datum.confidence * 100}%</td>
            <td>
              <button type={"button"} className="btn btn-primary btn-sm rounded-pill px-3">
                Details
              </button>
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  </PostcardMain>
}
