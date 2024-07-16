import { useParams } from "react-router-dom"

export default function RoutePage1() {

  return (
    <div>
        RoutePage1 : {useParams().item}
    </div>
  )
}
