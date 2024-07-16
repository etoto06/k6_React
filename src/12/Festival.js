import { useRef, useState, useEffect } from "react";
import GalleryCard from "./GalleryCard";

export default function Festival() {
    const [guname, setGuname] = useState([]); // API에서 구 이름들을 저장하는 상태
    const [tdata, setTdata] = useState([]);   // API로부터 받은 전체 축제 데이터를 저장하는 상태
    const [box, setBox] = useState([]);       // 구 선택 드롭다운 옵션을 저장하는 상태
    const [tags, setTags] = useState([]);     // 선택된 구의 축제 정보를 저장하는 상태
    
    const selref = useRef(); // 구 선택 드롭다운에 대한 참조 생성

    // API에서 데이터를 가져오는 함수
    const getData = (url) => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => setTdata(data.getFestivalKr.item))
            .catch(err => console.log(err));
    };

    // 페이지 로드 시 한 번만 실행되는 useEffect
    useEffect(() => {
        let url = "https://apis.data.go.kr/6260000/FestivalqService/getFestivalKr?";
        url = `${url}serviceKey=${process.env.REACT_APP_APIKEY}&`;
        url = `${url}pageNo=1&numOfRows=40&resultType=json`;

        console.log(url); // 생성된 API 요청 URL을 콘솔에 출력
        getData(url); // API 요청을 보내는 함수 호출
    }, [])``;

    // tdata 상태가 업데이트될 때마다 실행되는 useEffect
    useEffect(() => {
        let tm = tdata.map(item => item["GUGUN_NM"]); // tdata에서 구 이름만 추출하여 배열에 저장
        tm = new Set(tm); // 중복된 값 제거를 위해 Set으로 변환
        tm = [...tm]; // Set을 다시 배열로 변환
        setGuname(tm); // 구 이름 배열을 guname 상태에 저장
    }, [tdata]);

    // guname 상태가 업데이트될 때마다 실행되는 useEffect
    useEffect(() => {
        // 각 구 이름을 옵션으로 갖는 select 요소를 생성
        const tm = guname.map(item => <option key={item}>{item}</option>);
        setBox(tm); // 생성된 옵션 요소들을 box 상태에 저장
    }, [guname]);

    // 구 선택 드롭다운에서 구가 선택됐을 때 실행되는 함수
    const handleSelGu = () => {
        // 선택된 구의 축제 정보들을 필터링하여 GalleryCard 컴포넌트로 변환하여 tm에 저장
        let tm = tdata
            .filter(item => item["GUGUN_NM"] === selref.current.value)
            .map(item => (
                <GalleryCard
                    imgUrl={item["MAIN_IMG_NORMAL"]}
                    title={item["TITLE"]}
                    ptitle={item["TRFC_INFO"]}
                    ktag={item["USAGE_DAY_WEEK_AND_TIME"]}
                    key={item["UC_SEQ"]}
                />
            ));
        setTags(tm); // 변환된 GalleryCard 컴포넌트들을 tags 상태에 저장
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            {/* 축제 정보 선택 폼 */}
            <form className="w-3/5 mx-auto flex mt-10 justify-center items-center">
                <label htmlFor="gu" className="w-1/3 block mb-2 text-lg font-bold text-gray-900">
                    부산축제 정보 선택
                </label>
                <select
                    id="gu"
                    onChange={handleSelGu}
                    ref={selref}
                    className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                    <option defaultValue>구를 선택하세요.</option>
                    {box} {/* 구 선택 옵션들을 표시 */}
                </select>
            </form>

            {/* 선택된 구의 축제 목록을 그리드로 표시 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-5">
                {tags} {/* 선택된 구의 축제 정보들을 표시 */}
            </div>
        </div>
    );
}
