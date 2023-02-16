import PostcardMain from "@/components/main/postcardMain";
import FlowTable from "@/components/FlowTable";

export default function Scrapings() {
  return <PostcardMain title={"Scrapings"}>
    <div className="card card-body">
      <FlowTable limit_per_page={10}/>
    </div>
  </PostcardMain>
}
