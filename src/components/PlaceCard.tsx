import Image from "next/image";
import {Place} from "@/interfaces/FlowInterface";
import {Dispatch, SetStateAction} from "react";

interface PlaceCardInterface {
  focusedPlace: Place,
  setFocusedPlace: Dispatch<SetStateAction<Place | null>>
}

export default function PlaceCard({focusedPlace, setFocusedPlace}: PlaceCardInterface) {
  return <>
    <div className={"position-fixed top-0 start-0 w-100 h-100"} style={{
      zIndex: 1003,
      background: "rgba(0, 0, 0, .6)",
      cursor: "pointer",
    }} onClick={() => setFocusedPlace(null)}/>
    <div className="position-fixed top-50 start-50 translate-middle bg-white overflow-auto" style={{
      width: "min(80vw, 500px)",
      height: "min(90vh, 600px)",
      zIndex: 1004,
    }}>
      <div className="container p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className={"mb-0"}>{focusedPlace.name}</h4>
          </div>
          <i className="bi bi-x-lg" style={{
            cursor: "pointer",
          }} onClick={() => setFocusedPlace(null)}/>
        </div>
        {focusedPlace.media.length > 0 &&
            <div className="w-100 position-relative my-2" style={{
              height: "200px"
            }}>
                <Image src={focusedPlace.media[0].url} alt={"place image"} fill={true} style={{
                  objectFit: "cover"
                }}/>
            </div>
        }
        {focusedPlace.row_data && focusedPlace.row_data.url && focusedPlace.row_data.url_title &&
            <a href={focusedPlace.row_data.url} target={"_blank"} rel={"noreferrer"} className={""}>
                <p className="text-primary lh-1 small">
                  {focusedPlace.row_data.url_title}
                </p>
            </a>
        }

        {focusedPlace.externalAttribution &&
            <>
                <p className="fw-bold mb-0">Author</p>
                <p>{focusedPlace.externalAttribution}</p>
            </>
        }

        {focusedPlace.externalPublishedAt &&
            <>
                <p className="fw-bold mb-0">Published At</p>
                <p>{focusedPlace.externalPublishedAt.toLocaleString()}</p>
            </>
        }

        {focusedPlace.description &&
            <>
                <p className="fw-bold mb-0">Description</p>
              {focusedPlace.description.split("\n").map((e, idx) => <p className={"mb-0"} key={idx}>{e}<br/></p>)}
            </>
        }

        <p className={"mb-0 fw-bold"}>Links</p>
        <div className="d-flex justify-content-between w-100">
          <p className={"mb-0"}>
          </p>

        </div>

        <>
          <div className="row mb-2">
            <div className={"col-6"}>
              <p className={"mb-0 fw-bold"}>Lat</p>
              <p className={"mb-0"}>{focusedPlace.row_data ? focusedPlace.row_data.lat || "-" : "-"}</p>
            </div>
            <div className={"col-6"}>
              <p className={"mb-0 fw-bold"}>Score</p>
              <p className={"mb-0"}>{focusedPlace.row_data ? focusedPlace.row_data.score * 100 || "-" : "-"}</p>
            </div>
            <div className={"col-6"}>
              <p className={"mb-0 fw-bold"}>Long</p>
              <p className={"mb-0"}>{focusedPlace.row_data ? focusedPlace.row_data.long || "-" : "-"}</p>
            </div>
          </div>
        </>

        <div className="d-flex justify-content-around align-items-center mt-4">
          {focusedPlace.row_data &&
              <a href={focusedPlace.row_data.gmap} rel={"noreferrer"}
                 className={"btn btn-sm btn-primary rounded-0 w-100"}
                 target={"_blank"}>
                  Open in Google Map
              </a>
          }

          {focusedPlace.placeId &&
              <a href={"https://postcard.inc/places/s/" + focusedPlace.placeId} rel={"noreferrer"}
                 className={"btn btn-sm btn-dark rounded-0 w-100"}
                 target={"_blank"}>
                  Open in Postcard
              </a>
          }
        </div>
      </div>
    </div>
  </>
}