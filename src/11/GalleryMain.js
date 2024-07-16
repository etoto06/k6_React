import { useRef, useState, useEffect } from "react"
import TailInput from "../UI/TailInput"
import TailButton from "../UI/TailButton"
import GalleryCard from './GalleryCard'

export default function GalleryMain() {

    const keyword = useRef()
    const [tdata, setTdata] = useState()
    const [tags, setTags] = useState()

    const handleFetch = () => {
        if (keyword.current.value === "") {
            alert("키워드를 입력하세요.")
            keyword.current.focus()
            return
        }
        let w = encodeURI(keyword.current.value)
        getData(w)
    }

    const getData = (w) => {
        let url = "https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?"
        url = `${url}serviceKey=${process.env.REACT_APP_APIKEY}&`
        url = `${url}numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A`
        url = `${url}&keyword=${w}&_type=json`
        console.log(url)
        fetch(url)
            .then(resp => resp.json())
            .then(data => setTdata(data.response.body.items.item))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!tdata) return
        const tm = tdata.map(item =>
            <GalleryCard imgUrl={item.galWebImageUrl.replace('http://','https://')}
                title={item.galTitle}
                ptitle={item.galPhotographyLocation}
                ktag={item.galSearchKeyword}
                key={item.galContentId} />
        )
        setTags(tm)
    }, [tdata])

    const handleClear = () => {
        keyword.current.value=""
        keyword.current.focus()
        setTags('')
        setTdata('')
    }

    return (
        <div className="flex flex-col w-11/12 h-full justify-start items-center mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-200 w-full p-2">
                <div className="p-2">
                    <TailInput type="text"
                        inputRef={keyword}
                        ph="키워드 입력" />
                </div>
                <div className="px-3">
                    <TailButton caption="조회"
                        color="blue" handleClick={handleFetch} />
                </div>
                <div className="px-3">
                    <TailButton caption="취소"
                        color="blue" handleClick={handleClear} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-2">
                {tags}
            </div>
        </div>
    )
}
