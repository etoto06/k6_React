import TailButton from "../UI/TailButton"
import { Link, useNavigate } from "react-router-dom"

export default function RouteNav() {

    const navigator = useNavigate()

    return (
        <div>
            <div>
                <ul className="w-11/12 flex justify-center items-center">
                    <li className="px-4 m-2 rounded-md w-1/3 text-center bg-slate-200">
                        <Link to='/'>home</Link>
                    </li>
                    <li className="px-4 m-2 rounded-md w-1/3 text-center bg-slate-200">
                        <Link to='/page1/오렌지'>page1</Link>
                    </li>
                    <li className="px-4 m-2 rounded-md w-1/3 text-center bg-slate-200">
                        <Link to='/page2?item1=커피&item2=쥬스'>page2</Link>
                    </li>
                </ul>
            </div>
            <div className="w-11/12 flex justify-center items-center">
                <TailButton caption="home" color="blue" handleClick={() => { navigator("/") }} />
                <TailButton caption="page1" color="blue" handleClick={() => { navigator("/page1/포도") }} />
                <TailButton caption="page2" color="blue" handleClick={() => { navigator("/page2?item1=사과&item2=바나나") }} />
            </div>
        </div>
    )
}
