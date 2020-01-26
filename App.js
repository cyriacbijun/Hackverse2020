import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBke7BqlyFa5PA8mIjG23JfHFmt-R0_jG8",
    authDomain: "hackverse-1579951297563.firebaseapp.com",
    databaseURL: "https://hackverse-1579951297563.firebaseio.com",
    projectId: "hackverse-1579951297563",
    storageBucket: "hackverse-1579951297563.appspot.com",
    messagingSenderId: "98768578088",
    appId: "1:98768578088:web:489508f4709fe575efb71d",
    measurementId: "G-PJ2JH3BBEP"
};
firebase.initializeApp(firebaseConfig);
const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            location : {lat: 10.021184, lng:76.329720}
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        //this.getUserData= this.getUserData.bind(this);
    }
    componentDidMount() {
        let locationref = firebase.database().ref().child('location');
        locationref.on('value', snapshot => {
            const location_here = snapshot.val();
            this.setState({location:location_here});
        });
        console.log('DATA RETRIEVED Latitute',locationref);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.location !== this.state.location) {
            this.recenterMap();
        }
    }
    // loadMap() {
    //     if (this.props && this.props.google) {
    //         const {google} = this.props;
    //         const maps = google.maps;
    //
    //         const mapRef = this.refs.map;
    //         const node = ReactDOM.findDOMNode(mapRef);
    //
    //         let {initialCenter, zoom} = this.props;
    //         const {lat, lng} = initialCenter;
    //         const center = new maps.LatLng(lat, lng);
    //         const mapConfig = Object.assign({}, {
    //             center: center,
    //             zoom: zoom
    //         })
    //         this.map = new maps.Map(node, mapConfig);
    //         const latitude = this.state.latitude;
    //         const longitude = this.state.longitude;
    //     }
    //     // ...
    // }
    // getUserData = () => {
    //     let latref = firebase.database().ref('/latitude');
    //     let longref = firebase.database().ref('/longitude');
    //     latref.on('value', snapshot => {
    //         const latitude_here = snapshot.val();
    //         this.setState({latitude:latitude_here});
    //     });
    //     longref.on('value', snapshot => {
    //         const longitude_here = snapshot.val();
    //         this.setState({longitude:longitude_here});
    //     });
    //     //console.log('DATA RETRIEVED Latitute',latref,longref);
    // };
    recenterMap = () => {
        const map = this.map;
        const lat = this.state.location.lat;
        const long = this.state.location.lng;
        console.log('the map object',this.props.google);
        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(lat, long);
            map.panTo(center)
        }
    };
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    onMapClick = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
    return (
        <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            center={this.state.location}>
            <Marker
                onClick={this.onMarkerClick}
                name={'National Institute of Technology Karnataka Surathkal.'}
            />
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onMapClick}
            >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
            </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBHd-Gbs49rEK_1mMloN24KGKabs3-vR9A'
})(MapContainer);