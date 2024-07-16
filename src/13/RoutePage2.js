import { useParams, useSearchParams } from "react-router-dom"

export default function RoutePage2() {

const [params] = useSearchParams()

  return (
    <div>
        RoutePage2 : {params.get('item1')}, {params.get('item2')}
    </div>
  )
}
