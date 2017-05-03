import React,{Component} from "react"
import "./App.css"

class Gallery extends Component{

    constructor(props){
        super(props);
        this.state = {
            playingUrl : '',
            audio : null,
            isPlaying : false
        }
    }

    playAudio(previewUrl){
        let audio = new Audio(previewUrl);
        if(!this.state.isPlaying){
            audio.play();
            this.setState({
                playingUrl:previewUrl,
                isPlaying:true,
                audio
            })
        }
        else {
            if(this.state.playingUrl === previewUrl){
                this.state.audio.pause();
                this.setState({
                    isPlaying:false,
                })
            }
            else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playingUrl:previewUrl,
                    isPlaying:true,
                    audio
                })
            }
        }
    }

    render(){
        const { tracks } = this.props;
        return(
            <div className="Gallery">
                {
                    tracks.map((track,index) => {
                        const trackImage = track.album.images[0].url;
                        return(
                            <div key={index} className="track" onClick={() => {this.playAudio(track.preview_url)}}>
                                <img src={trackImage} alt="track-img" className="track-img" />
                                <div className="track-play">
                                    <div className="track-play-inner">
                                        {
                                            this.state.playingUrl === track.preview_url ? <span>| | </span>: <span> &#9654;</span>
                                        }
                                    </div>
                                </div>
                                <p className="track-text">{track.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Gallery