import styled from "styled-components";
import NavBar from "../components/navBar";
import COLOR from "../utils/color";
import search from "../assets/search.png"
import EventCard from "../components/eventlist-card";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
// import { data } from "../groupData";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios, { Axios } from "axios";
import { data } from "../groupData";

const Wrapper = styled.div`
    background-color: ${COLOR.white};
    width: 99vw; //부모는 뷰포트 길이로 계산됨
    display: flex;
    flex-direction: column;
    justify-content: center;
    #paging{
        display: flex;
        justify-content: center;
        margin-top: 4%;
        margin-bottom: 5%;
    }
`;

const Section1 = styled.div`
    background-color: ${COLOR.green};
    margin-top: 45px;
    width: 100%;
    height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    #whiteBox{
        background-color: #F9F8FA;
        width: 80%;
        height: 300px;
        margin: auto;
        border-radius: 10px;
        position: relative;
        #searchBox{
            width: 95%;
            height: 130px;
            margin: auto;
            border-bottom: 2px solid #4F6F52;
            display: flex;
        }
        #checkList{
            width: 95%;
            height: 170px;
            margin: auto;
        }
    }

    #buttonGroup{
        width: 300px;
        margin-left: 75%;
        margin-bottom: auto;
        display: flex;
        gap: 15px;
        button{
            background-color: #EAE5D4;
            border-radius: 5px;
            height: 40px;
            color: ${COLOR.green};
            font-weight: 600;
        }
        select{
            background-color: #EAE5D4;
            border-radius: 5px;
            width: 30%;
            height: 40px;
            color: ${COLOR.green};
            font-weight: 600;
            /* appearance: none;     */
        }
    }

    #checkList{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        label{
            cursor: pointer;
            font-weight: 600;
        }
        #checkList1, #checkList2{
            display: flex;
            flex-direction: row;
            gap: 1.5rem;
            margin-bottom: 1rem;
            div{
                display: flex;
                
            }
        }
    }
`;

const SearchBar = styled.form`
    background-color: #EAE5D4;
    border: 2px solid #4F6F52;
    border-radius: 15px;
    width: 60%;
    height: 45px;
    font-size: 20px;
    font-weight: 500;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    input{
        border: 0;
        background-color: #EAE5D4;
        width: 80%;
        height: 40px;
        font-size: 1.1rem;
        font-weight: 600;
        outline: none;
    }
    input::placeholder{
        color: gray;
    }
    input::-ms-clear, input::-ms-reveal{
        display: none;
    }
    img{
        width: 6%;
        cursor: pointer;
    }
`;

const CheckBox = styled.input`
    cursor: pointer;
    appearance: none;
    width: 1.1rem;
    height: 1.1rem;
    background-color: #3A4D39;
    border-radius: 0.1rem;
    &:checked{
        background-color: #3A4D39;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    }
`;

const Section2 = styled.div`
    background-color: ${COLOR.white};
    width: 100vw;
    height: 1100px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    button{
        position: absolute;
        top: 2rem;
        right: 5rem;
        background-color: ${COLOR.green};
        color: white;
        font-weight: 550;
        width: 90px;
        height: 40px;
        text-align: center;
    }
    #word{
        margin-top: 8%;
        font-size: x-large;
        font-weight: 600;
        text-align: center;
    }
    #displayCard{
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        height: 80%;
        display: flex;
        flex-direction: row;
        flex-wrap : wrap; //flexbox의 폭이 지정되어있다면 flexbox의 width를 넘어가게 되면 여러 행에 나열
        gap: 5%;
        padding-left: 7%;
    }

    #txt {
        background-color: ${COLOR.white};
        text-align: center;
        font-size: 18px;
        margin-top: 80px;
        margin-bottom: 40px;
        cursor: pointer;
    }

`;

// const response = {
//     tokens: {
//         accessToken:
//         "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3NzdAc29va215dW5nLmFjLmtyIiwiYXV0aCI6InVoYW5nLnVoYW5nLkF1dGguQ3VzdG9tVXNlckRldGFpbHNTZXJ2aWNlQDI1NTlmNjVjIiwiaWF0IjoxNzA3MTU0ODIwLCJleHAiOjE3MDczNzA4MjB9.DfZu4WUmsMyWVY8fq03EhBN7zgCaMW5-5rwcL0x9B7s",
//     },
//     status: "200",
// };

export default function BoardGroup(){

    const navigate = useNavigate();

    // const fetchData = async() => {
    //     axios.get("http://localhost:8080/post-list/category",{
    //         headers:{
    //             "Content-Type": "application/json",
    //             'Authorization': `Bearer ${response.tokens.accessToken}`,
    //         },
    //     })
    //     .then((response) => {
    //         console.log(response.data);
    //         setData(response.data.AllPostList);
    //     })
    //     .catch((error) => {
    //         console.error("에러:", error);
    //     });
    // }
    
    // useEffect(()=>{
    //     const fetchData = async () => {
    //         try{
    //             const accessToken = localStorage.getItem("accessToken");
    //             console.log("accessToken: " + accessToken);

    //             // const headers = {
    //             //     Authorization: `Bearer ${accessToken}`,
    //             // };

    //             const response = await axios.get('http://localhost:8080/post-list/category',{
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`
    //                 }
    //             });
    //             console.log("데이터: " + response.data);
    //             // setData(response.data.AllPostList);

    //         } catch(error){
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // },[]);

    //id가 큰 순으로 정렬(최신순 정렬)
    let [events, setEvents] = useState(data.sort(function(a,b){
        if(parseInt(a.id) > parseInt(b.id)){
            return b.id-a.id;
        }
    }));

    // 분류 목록
    const major = ["", "공과대학", "이과대학", "문과대학", "사회과학대학", "생활과학대학", "법과대학", "경상대학", "음악대학",
                "약학대학", "미술대학", "기초교양대학", "글로벌융합대학", "글로벌서비스학부", "영어영문학부", "미디어학부", "동아리"];

    // 단체 권한(백엔드에서 받기)
    const auth = "group";


    // 페이지네이션을 위한 state
    const [currentPage, setCurrentPage] = useState(1);
    // const [searchParams] = useSearchParams();
    // let page = searchParams.get("page");
    let eventIndex = (currentPage-1)*8;
    let eventSize = events.length;
    const [showEvents, setShowEvents] = useState(false);


    //검색 기능을 위한 state와 function
    const [word, setWord] = useState("");
    const onSubmit = async() => {
        window.location.href = "group/search/" + word;
    };


    //정렬 기능을 위한 state와 function
    const [sort, setSort] = useState("latest");
    const eventSort = async(sort)=>{
        let copy = [...events];
        if(sort === "latest"){
            copy.sort(function(a,b){
                if(parseInt(a.id) > parseInt(b.id)){
                    return b.id-a.id;
                }
            });
        } 
        else if(sort === "recommend"){
            copy.sort(function(a,b){
                if(parseInt(a.likes) > parseInt(b.likes)){
                    return a.id-b.id;
                }
            });
        }
        setEvents(copy);
    };
    //sort변수가 바뀔 때마다 eventSort() 실행하여 정렬
    useEffect(()=>{
        eventSort(sort);
    },[sort])


    //필터링 기능을 위한 state
    const [currentCheck, setCurrentCheck] = useState([]); //체크된 항목들의 value값을 저장할 배열
    const [filteredEvents, setFilteredEvents] = useState(data);
    const [myInterest] = useState([3,8]) //임의로 주어진 값. 백엔드에서 받아와야 됨.
    //체크박스 이벤트 처리 함수
    const onClickCheck = target => {
        if(currentCheck.includes(target)){ //currentCheck배열에 이미 있던 값이면 배열에서 삭제
            setCurrentCheck([...currentCheck].filter(check => check !== target));
            return;
        }
        return setCurrentCheck([...currentCheck, target]);
    };
    //currentCheck에 따라 이벤트 필터링
    const eventsFilter = currentCheck => {
        const filteredData = data.filter((event) => {
            return event.type.some((typeValue) => currentCheck.includes(typeValue));
        });
        setFilteredEvents(filteredData);
    };
    //'나의 관심분야' 필터링
    const [myInterestCheck, setMyInterestCheck] = useState([]);
    const myInterestFilter = interest => {
        let checkInterest;
        if(myInterestCheck.length===0){
            if(myInterest.length===0){ //관심분야가 설정되어 있지 않다면
                alert("관심분야가 설정되어 있지 않습니다. 마이페이지에서 설정해주세요.");
                return
            }
            checkInterest = interest;
            alert("나의 관심분야 필터가 적용되었습니다");
            setMyInterestCheck([...interest]);
        } else{
            checkInterest = [];
            alert("나의 관심분야 필터가 해제되었습니다.");
            setMyInterestCheck([]);
        }
        setCurrentPage(1); //1페이지로 이동
        setCurrentCheck(checkInterest);
    };

    useEffect(()=>{
        if (currentCheck.length > 0) {
            eventsFilter(currentCheck);
        } else {
            setFilteredEvents(data);
        }
    }, [currentCheck]);
    
    useEffect(()=>{
        setEvents(filteredEvents);
        setCurrentPage(1);
    },[filteredEvents]);

    // 페이징 시, 0.1초 딜레이 주기
    useEffect(()=>{
        setShowEvents(false);
        const timer = setTimeout(()=>{
            setShowEvents(true);
        }, 100);
        window.scrollTo(0,0); // 페이징 시, 맨 위로 스크롤 조정
        return () => clearTimeout(timer);
    }, [currentPage, events]);

    return(
        <Wrapper>
            <NavBar/>
            <Section1>
                <div id="whiteBox">
                    <div id="searchBox">
                        <SearchBar>
                            <input type="search" placeholder="찾고 싶은 이벤트를 검색하세요"
                            onChange={(e)=>{setWord(e.target.value)}}/>
                            <img type="button" src={search}
                                onClick={() => {onSubmit()}}/>
                        </SearchBar>
                    </div>
                    <div id="checkList">
                        <div id="checkList1">
                            {
                                [1,2,3,4,5,6,7,8].map((i)=>(
                                    <div key={i}><label htmlFor={i}>{major[i]}</label>
                                    <CheckBox value={i} type="checkbox" id={i} checked={myInterestCheck.includes(i)? true : undefined}
                                    onChange={() => onClickCheck(i)}/></div>
                                ))
                            }
                        </div>
                        <div id="checkList2">
                            {
                                [9,10,11,12,13,14,15,16].map((i)=>(
                                    <div key={i}><label htmlFor={i}>{major[i]}</label>
                                    <CheckBox value={i} type="checkbox" id={i} checked={myInterestCheck.includes(i)? true : undefined}
                                    onChange={() => onClickCheck(i)}/></div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div id="buttonGroup">
                    <button onClick={()=>{
                        myInterestFilter(myInterest);
                    }}>나의 관심분야</button>
                    <select onChange={(e)=>{setSort(e.target.value)}}>
                        <option value="latest">최신순</option>
                        <option value="recommend">추천순</option>
                    </select>
                </div>
            </Section1>
            <Section2>
                <div>
                    {
                        auth === "group" ? <button onClick={()=>{navigate("/event-register")}}>등록</button> : ""
                    }
                </div>
                <label id="word">
                    {events.length===0 ? `해당하는 이벤트가 없습니다` : ``}
                </label>
                <div id="displayCard">
                    {
                        [eventIndex,eventIndex+1,eventIndex+2,eventIndex+3,eventIndex+4,eventIndex+5,eventIndex+6,eventIndex+7].map(function(i){
                            return(
                                <>
                                {showEvents && i <= eventSize-1 && (
                                    <EventCard id={events[i].id} writer={events[i].group} title={events[i].title} apply={events[i].apply} period={events[i].period}/>
                                )}
                                </>
                            )
                        })
                    }
                </div>
            </Section2>
            <div id="paging">
                <Pagination eventsNum={events.length} eventsPerPage={8} 
                setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
        </Wrapper>
    )
}
