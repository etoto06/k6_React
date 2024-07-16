import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import TailSelect from "../UI/TailSelect"
import getcode from './getcode.json'

export default function FrsctList() {

    const [queryParams] = useSearchParams()

    const dt = queryParams.get('dt')
    const area = queryParams.get('area')
    const x = queryParams.get('x')
    const y = queryParams.get('y')
    const bRef = useRef()
    const gubun = queryParams.get('gubun')

    const ops = getcode.filter(item => item["예보구분"] === gubun).map(item =>
        `${item["항목명"]}-${item["항목값"]}`
    )

    const [frsctdata, setFrsctData] = useState([])
    const [trtags, setTrtags] = useState([])
    const [selname, setSelName] = useState([])
    const [seleng, setSelEng] = useState([])

    const getData = async (url) => {
        const resp = await fetch(url)
        const data = await resp.json()
        setFrsctData(data.response.body.items.item)
    }

    useEffect(() => {
        let url = ''
        if (gubun === "초단기예보") {
            url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?"
            url = `${url}serviceKey=${process.env.REACT_APP_APIKEY}`
            url = `${url}&pageNo=1&numOfRows=1000&dataType=json&base_`
            url = `${url}date=${dt}&base_time=0630&nx=${x}&ny=${y}`
        } else {
            url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?"
            url = `${url}serviceKey=${process.env.REACT_APP_APIKEY}`
            url = `${url}&pageNo=1&numOfRows=1000&dataType=json&base_`
            url = `${url}date=${dt}&base_time=0500&nx=${x}&ny=${y}`
        }

        console.log(url)
        getData(url)
    }, [])

    useEffect(() => {
        let tm = frsctdata.filter(item => item["category"] === seleng).map(item =>
            <tr key={`${item["fcstTime"]}${item["fcstDate"]}${item["category"]}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {selname}
                </th>
                <td className="px-6 py-2">
                    {`${item.fcstDate.substr(0, 4)}-${item.fcstDate.substr(4, 2)}-${item.fcstDate.substr(6, 2)}`}
                </td>
                <td className="px-6 py-2">
                    {`${item.fcstTime.substr(0, 2)}:${item.fcstTime.substr(2, 2)}`}
                </td>
                <td className="px-6 py-2">
                    {item.fcstValue}
                </td>
            </tr>
        )

        setTrtags(tm)
    }, [selname])

    const handleItem = () => {
        if (bRef.current.value === '') {
            alert("항목을 선택하세요.")
            bRef.current.focus()
            setTrtags([])
            return
        }
            setSelName(bRef.current.value.split("-")[0])
            setSelEng(bRef.current.value.split("-")[1])
    }

    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between my-3 mx-5 items-center">
                    <div className="font-bold">
                        {area} {gubun} {`(${dt.substring(0, 4)}-${dt.substring(4, 6)}-${dt.substring(6, 8)})`}
                    </div>
                    <TailSelect handleClick={handleItem} ops={ops} sRef={bRef} opDef="---항목선택---" />
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                항목명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                예측일자
                            </th>
                            <th scope="col" className="px-6 py-3">
                                예측시간
                            </th>
                            <th scope="col" className="px-6 py-3">
                                예측값
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {trtags}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
