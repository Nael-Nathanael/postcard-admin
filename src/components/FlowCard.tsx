import {jc} from "@/helpers/general_helper";
import {Dispatch, SetStateAction, useState} from "react";
import {ExtendedFlowData, Place} from "@/interfaces/FlowInterface";
import PlaceCard from "@/components/PlaceCard";

interface FlowCardInterface {
  focusedDatum: ExtendedFlowData,
  setFocusedDatum: Dispatch<SetStateAction<ExtendedFlowData | null>>
}

export default function FlowCard({
                                   focusedDatum,
                                   setFocusedDatum
                                 }: FlowCardInterface) {
  const [focusedPlace, setFocusedPlace] = useState<Place>();

  return <>
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
              <tr
                className={`table-${pchistory.places.length > 0 ? 'success' : 'danger'}`}>
                <td colSpan={pchistory.places.length > 0 ? 3 : 1}>
                  {pchistory.places.length == 0 && "[IGNORED]"} {pchistory.anchor}
                </td>
                {pchistory.places.length > 0 &&
                    <td colSpan={2}>
                      {pchistory.description}
                    </td>
                }
              </tr>
              {pchistory.places.map(place => {
                return <tr key={place.placeId}>
                  <td>{place.name}</td>
                  <td
                    className={jc("text-center fw-bold", `text-${place.row_data.score * 100 < 70 ? 'danger' : 'success'}`)}>
                    {place.row_data.score * 100}%
                  </td>
                  <td>
                    <button type={"button"}
                            onClick={() => setFocusedPlace(place)}
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

    {focusedPlace &&
        <PlaceCard focusedPlace={focusedPlace} setFocusedPlace={setFocusedPlace}/>
    }
  </>
}