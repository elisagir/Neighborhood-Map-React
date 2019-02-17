import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class Mappa extends Component {
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
        {this.props.locations.map(index => {
          return (
            <Marker
              key={index.id}
              tabIndex="0"
              position={index.loc}
              name={index.name}
              onClick={this.props.onMarkerClick}
            />
          );
        })}

        <InfoWindow
          tabIndex="0"
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
          onClose={this.props.onClose}
        >
          <div>
            <h4>{this.props.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDqFlloHIJ_AWR3an0LBsxhrHro-WOPoiM"
})(Mappa);
