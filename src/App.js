import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class App extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    locations: [
      {
        id: 1,
        name: "San Vito lo Capo",
        loc: {
          lat: 38.175824,
          lng: 12.738189
        }
      },
      {
        id: 2,
        name: "Guidaloca",
        loc: {
          lat: 38.056636,
          lng: 12.840069
        }
      },
      {
        id: 3,
        name: "Riserva naturale dello Zingaro",
        loc: {
          lat: 38.126091,
          lng: 12.788149
        }
      },
      {
        id: 4,
        name: "Scala dei Turchi",
        loc: {
          lat: 37.927583,
          lng: 12.306676
        }
      },
      {
        id: 5,
        name: "La Tonnara di Scopello",
        loc: {
          lat: 38.071704,
          lng: 12.821766
        }
      }
    ]
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
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
        role="application"
        aria-label="DAFARE"
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
          lat: 38.016994,
          lng: 12.536628
        }}
      >
        {this.state.locations.map(index => {
          return (
            <Marker
              key={index.id}
              tabIndex="0"
              position={index.loc}
              name={index.name}
              onClick={this.onMarkerClick}
            />
          );
        })}

        <InfoWindow
          tabIndex="0"
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
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
  apiKey: "AIzaSyDqFlloHIJ_AWR3an0LBsxhrHro-WOPoiM"
})(App);
