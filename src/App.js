import React, { Component } from "react";
import "./styles.css";
import GoogleMap from "./components/GoogleMap";
import List from "./components/List";
import escapeRegExp from "escape-string-regexp";
import Locations from "./components/locations.json";

//if the map does not load show alert
window.gm_authFailure = () => {
  alert('Google Map failed to load :(');
}

export class App extends Component {
  state = {
    locations: Locations,
    showingInfoWindow: false, // Hides or the shows the infoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: { lat: 0, lng: 0 } // Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  showInfo(e, selectedPlace) {
    this.setState({
      selectedPlace: selectedPlace,
      showingInfoWindow: true,
      activeMarker: null
    });
    console.log(selectedPlace);
  }

  filterBeaches = query => {
    // Reset list of beaches if query is empty
    if (!query) {
      return this.setState({ locations: Locations });
    }

    const match = new RegExp(escapeRegExp(query), "i");
    const filterBeaches = Locations.filter(beach => match.test(beach.name));
    this.setState({
      locations: filterBeaches,
      showingInfoWindow: false,
      selectedPlace: {}
    });
  };

  render() {
    return (
      <div>
        <List
          locations={this.state.locations}
          filterBeaches={this.filterBeaches}
          onClick={this.showInfo.bind(this)}
        />
        <GoogleMap
          locations={this.state.locations}
          onMarkerClick={this.onMarkerClick}
          activeMarker={this.state.activeMarker}
          showingInfoWindow={this.state.showingInfoWindow}
          filterBeaches={this.filterBeaches}
          selectedPlace={this.state.selectedPlace}
          pictures={this.state.pictures}
        />
      </div>
    );
  }
}

export default App;
