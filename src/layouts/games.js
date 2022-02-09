import React from "react";

const data=[
    {
        title:"Adventure Of Hanacaraka",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        thumbnail: new URL('../assets/img/aoh.png?as=webp&width=250',import.meta.url),
        bg: new URL('../assets/img/aoh.png?as=webp',import.meta.url),
    },
    {
        title:"Tag Runner",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        thumbnail: new URL('../assets/img/tagrunner.webp?as=webp&width=250',import.meta.url),
        bg: new URL('../assets/img/tagrunner.webp?as=webp',import.meta.url),
    },
    {
        title:"Isolated Forest",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        thumbnail: new URL('../assets/img/isolatedforest.png?as=webp&width=250',import.meta.url),
        bg: new URL('../assets/img/isolatedforest.png?as=webp',import.meta.url),
    },
    {
        title:"Tower of Science",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        thumbnail: new URL('../assets/img/tos.png?as=webp&width=250',import.meta.url),
        bg: new URL('../assets/img/tos.png?as=webp',import.meta.url),
    }
];

export default function Games({ypos, onscrollstop}) {
    const size=400;
    const sectionref = React.createRef();
    const [style, setStyle] = React.useState('');
    const [thumbnailStyle, setThumbnailStyle] = React.useState({});
    const [pos, setPos] = React.useState(0);
    const [game, setGame] = React.useState(data[0] || 
        {
            title:'',
            desc:'',
            thumbnail:'',
            bg:'',
        });

    React.useEffect(() => {
        let cur=sectionref.current;
        let yInsidePos;
        if(ypos < cur.offsetTop){
            setStyle('absolute');
        }else if(ypos >= cur.offsetTop+cur.offsetHeight-window.innerHeight){
            setStyle('absolute bottom-0');
        }else{
            setStyle('fixed top-0');
            yInsidePos=Math.floor((ypos-cur.offsetTop)/size);
            if(yInsidePos!==pos ){ 
                setPos(yInsidePos);
                setThumbnailStyle({transform:'translateY('+(-7*yInsidePos)+'rem )'});
            }
        }
    }, [ypos]);

    React.useEffect(() => {
        if(onscrollstop){
            setGame(data[pos]);
        }
    }, [onscrollstop]);

    return(<section ref={sectionref} className="relative" id="games">
        <div className={"min-h-screen table w-full bg-no-repeat bg-center bg-blend-overlay "+style} style={{background:'url('+game.bg+'), rgb(46 46 46 / 80%)'}}>
            <div className="table-cell align-middle">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex">
                    <div className="w-2/5 relative ">
                        <div className="absolute" style={thumbnailStyle}>
                        {data.map(function(d, i){
                            return <div key={i} className={
                                "max-w-full bg-gray-600 "+
                                (pos===i?"w-[15rem] h-[7.5rem] my-4 ml-4":"w-[13rem] h-[6.5rem] my-2") 
                            } style={{backgroundImage:'url('+d.thumbnail+')'}}></div>
                        })}    
                        </div>
                    </div>
                    <div className="w-3/5 text-right">
                        <p className="text-3xl mb-7 text-white" >{game.title}</p>
                        <p className="text-base mb-7 text-white">{game.desc}</p>
                        <div className="block">
                            <span>
                            <button className="px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Play Now</button>
                            </span>
                            or
                            <span>
                            <button className="px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Play Now</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className="w-full bg-indigo-600" style={{height:`calc(100vh + ${data.length*size}px)`}}>
            
        </div>
  </section>)
}