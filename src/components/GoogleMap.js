import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

export class GoogleMap extends Component {
  state = {
    pictures: []
  };

  imgError = () => {
    alert("Ops! Some Flickr data failed to load");
  };

  componentDidMount() {
    let images = {};

    // store all fetch requests in an array
    let fetches = this.props.locations.map(beach => {
      return (
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2fe59308eacee9d09d1abe8f71ad4825&tags=${
          beach.name
        }
&per_page=1&page=1&format=json&nojsoncallback=1`)
          .then(response => {
            return response.json();
          })

          .then(j => {
            let pic = j.photos.photo[0];
            let srcPath =
              "https://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";
            images[beach.name] = (
              <img
                className="flickrPhoto"
                key={pic.title}
                alt={pic.title}
                src={srcPath}
              />
            );
          })
          // if an image is missing show error
          .catch(photosResults => {
            this.imgError();
          })
      );
    });

    // when all fetches are finished update state pictures
    Promise.all(fetches).then(() =>
      this.setState({
        pictures: images
      })
    );
  }

  render() {
    return (
      <Map
        role="application"
        aria-label="Google Maps"
        google={this.props.google}
        zoom={10}
        styles={require("./StyleMap.json")}
        initialCenter={{
          lat: 38.024824,
          lng: 12.941607
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
              icon={
                this.props.selectedPlace.name === index.name
                  ? require("./img/pinhover.png")
                  : require("./img/pin.png")
              }
              animation={this.props.google.maps.Animation.DROP}
            />
          );
        })}

        <InfoWindow
          tabIndex="0"
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
          position={this.props.selectedPlace.loc}
        >
          <div>
            {this.state.pictures[this.props.selectedPlace.name]}
            <h4>{this.props.selectedPlace.name}</h4>
            <p>© Photo by Flickr - All rights reserved</p>
            <div />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDqFlloHIJ_AWR3an0LBsxhrHro-WOPoiM"
})(GoogleMap);
