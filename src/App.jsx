import React,{Component} from "react"
import {FormGroup,InputGroup,FormControl,Glyphicon} from "react-bootstrap"
import "./App.css"
import Profile from "./Profile"
import Gallery from "./Gallery"


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            query : '',
            artist : null,
            tracks : []
        }
    }

    search(){
        const BASEURL = "https://api.spotify.com/v1/search";
        let fetchUrl = `${BASEURL}?type=artist&limit=1&query=${this.state.query}`;
        const ALBUMURL = 'https://api.spotify.com/v1/artists/';
        fetch(fetchUrl,{
            method : "GET"
        })
            .then((response) =>response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({artist});
                fetchUrl = `${ALBUMURL}${artist.id}/top-tracks?country=US`;
                fetch(fetchUrl,{
                    method:'GET'
                }).then(res => res.json())
                    .then(albumJson => {
                        const {tracks} = albumJson;
                        this.setState({tracks});
                    })
            })
            .catch((ex) => console.log("ex",ex))
    }
    enterSearch(event){
        if(event.key === "Enter"){
            this.search()
        }
    }
    render(){
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="search an Artist"
                            value={this.state.query}
                            onChange={event => this.setState({query : event.target.value})}
                            onKeyPress={event => {this.enterSearch(event)}}
                        />
                        <InputGroup.Addon onClick={() => {this.search()} }>
                            <Glyphicon
                                glyph="search"> </Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                        ? <div>
                        <Profile
                            artist={this.state.artist}
                        />
                        <Gallery
                            tracks={this.state.tracks}
                        />
                    </div>
                        : <div></div>
                }
            </div>
        )
    }
}


export default App;