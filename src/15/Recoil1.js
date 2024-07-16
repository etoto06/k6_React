import { useRecoilValue } from "recoil"
import { rcnt } from "./RecoilAtom"
import Recoil2 from "./Recoil2"

export default function Recoil1() {

const cnt = useRecoilValue(rcnt)

  return (
    <div className="w-full h-full flex flex-col justify-center items-center font-bold">
      Recoil1 : {cnt}
      <Recoil2 />
    </div>
  )
}
