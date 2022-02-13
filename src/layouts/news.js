import React from "react";

const data=[
    {
        title:"Game Jam 2022",
        desc:"Lorem Ipsum issimply dummy",
        thumbnail: new URL('../assets/img/banner1.jpg?as=webp&width=750',import.meta.url),
    },
    {
        title:"Game Jam 2023",
        desc:"Lorem Ipsum issimply dummy",
        thumbnail: new URL('../assets/img/banner2.jpg?as=webp&width=750',import.meta.url),
    },
    {
        title:"Coming Soon",
    },
];

const svgs={
    flag: new URL('../assets/svg/flag.svg',import.meta.url),
    photo: new URL('../assets/svg/photo.svg',import.meta.url),
    silhoutes: [
        {
            url: new URL('../assets/svg/silhoute1.svg',import.meta.url),
            style: {height:'60vh'},
        }
    ]
}

export default function News({ypos}){
    const sectionref = React.createRef();
    const [style, setStyle] = React.useState({});
    const [style2, setStyle2] = React.useState({});
    const [height, setHeight] = React.useState(0);
    const parallaxFactor=2;

    React.useEffect(()=>{
        setHeight(3000);
    },[]);

    React.useEffect(() => {
        let cur=sectionref.current;
        let top = cur.offsetTop;
        let bottom = cur.offsetTop+cur.offsetHeight-window.innerHeight;
        if(ypos < top){
            let s={transform:'translate(0px, '+(cur.offsetTop-ypos)+'px )'}
            setStyle(s);
            setStyle2(s);
        }else if(ypos >= bottom){
            let left = -cur.firstChild.offsetWidth;
            setStyle({transform:'translate('+left+'px, '+(bottom-ypos)+'px )'});
            setStyle2({transform:'translate('+left*parallaxFactor+'px, '+(bottom-ypos)+'px )'});
        }else{
            let factor = (cur.offsetTop-ypos) / (cur.offsetHeight-window.innerHeight);
            let left = factor*(cur.firstChild.offsetWidth);
            setStyle({transform:'translate('+left+'px, 0px)'});
            setStyle2({transform:'translate('+left*parallaxFactor+'px, 0px)'});
            
        }
    }, [ypos]);

    return(
    <section ref={sectionref} className="relative min-h-screen" id="news" style={{height:`calc(100vh + ${height}px)`}}>
        <div className="min-h-screen min-w-full fixed top-0 bg-blue-600 whitespace-nowrap" style={style}>
            <div className="min-h-screen w-full bg-blue-500 inline-block align-top pt-24" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex">
                        <div className="flex-auto">
                            <object className="float-right" type="image/svg+xml" data={svgs.flag}></object>
                        </div>
                        <div className="flex-auto text-center">
                            <object className="inline-block" type="image/svg+xml" data={svgs.photo}></object>
                        </div>
                        <div className="flex-auto">
                            <object type="image/svg+xml" data={svgs.flag}></object>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen min-w-full bg-blue-500 inline-block align-top " style={{marginLeft:-1}}>
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
                    <div className="w-1/2 inline-block pr-4">
                        <div className="table w-full h-screen" >
                            <div className="table-cell align-middle" >
                                <div className="bg-white pt-[56%] relative" >
                                    <div className="p-2 absolute w-full h-full top-0">
                                        <div className="block h-full bg-cover bg-center" style={{backgroundImage:'url('+data[0].thumbnail+')'}}>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white py-4 px-2">
                                    <p className="text-center text-xl">Game Jam 2022</p>
                                </div>
                                <div className="relative w-full bg-neutral-400 py-3" >
                                    <p className="text-base text-center text-white font-medium">Coming Soon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 inline-block pl-4">
                        <div className="table w-full h-screen" >
                            <div className="table-cell align-middle" >
                                <div className="bg-white pt-[56%] relative" >
                                    <div className="p-2 absolute w-full h-full top-0">
                                        <div className="block h-full bg-cover bg-center" style={{backgroundImage:'url('+data[1].thumbnail+')'}}>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white py-4 px-2">
                                    <p className="text-center text-xl">Game Jam 2023</p>
                                </div>
                                <div className="relative w-full bg-neutral-400 py-3" >
                                    <p className="text-base text-center text-white font-medium">Coming Soon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="min-h-screen min-w-full fixed top-0 whitespace-nowrap" style={style2}>
            <object className="absolute bottom-0" type="image/svg+xml" data={svgs.silhoutes[0].url} style={{left: window.innerWidth + window.innerWidth*0.3,...svgs.silhoutes[0].style}}></object>
        </div>
    </section>
    );
}