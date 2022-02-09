import React from "react";

export default function News({ypos}){
    const sectionref = React.createRef();
    const [style, setStyle] = React.useState({});
    const [height, setHeight] = React.useState(0);

    React.useEffect(()=>{
        setHeight(3000);
    },[]);

    React.useEffect(() => {
        let cur=sectionref.current;
        let top = cur.offsetTop;
        let bottom = cur.offsetTop+cur.offsetHeight-window.innerHeight;
        if(ypos < top){
            setStyle({transform:'translate(0px, '+(cur.offsetTop-ypos)+'px )'});
        }else if(ypos >= bottom){
            let left = -cur.firstChild.offsetWidth;
            setStyle({transform:'translate('+left+'px, '+(bottom-ypos)+'px )'});
        }else{
            let factor = (cur.offsetTop-ypos) / (cur.offsetHeight-window.innerHeight);
            console.log(cur.firstChild.offsetWidth);
            let left = factor*(cur.firstChild.offsetWidth);
            setStyle({transform:'translate('+left+'px, 0px)'});
            
        }
    }, [ypos]);

    return(
    <section ref={sectionref} className="relative min-h-screen" id="news" style={{height:`calc(100vh + ${height}px)`}}>
        <div className="min-h-screen min-w-full fixed top-0 bg-blue-600 whitespace-nowrap" style={style}>
            <div className="min-h-screen min-w-full bg-blue-500 inline-block" >
                    
            </div>
            <div className="min-h-screen min-w-full bg-blue-300 inline-block" >
                    
            </div>
        </div>
    </section>
    );
}