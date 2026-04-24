import { useContext, useRef } from "react";

import { ThemeContext } from "./ThemeContext";

export default function Video(){

    // Step-3 consume context 


    const theme = useContext(ThemeContext);

    console.log(theme);
    const ref = useRef(null);

    const handlePlay  = () => {
        return ref.current.play();
    };

    const handlePause = () =>{
        return ref.current.pause();
    };
    return (
        <div>
            <h1 style={{color:theme.chintu}}> Welcome to video player </h1>
            <video 
            ref={ref}
            controls
            src=" https://8003612b-0d52-4675-b4b6-a2999cb1763f.mdnplay.dev/shared-assets/videos/flower.webm"></video>
            <hr />
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
        </div>
    );

}