import React, { Component } from "react";
import "./styles.css";
import Mappa from "./components/Mappa";
import List from "./components/List";
import escapeRegExp from "escape-string-regexp";
import Locations from "./components/locations.json";
import axios from "axios";

export class App extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    locations: Locations
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
  filterBeaches = query => {
    // Reset to full list of castles if query is empty
    if (!query) {
      return this.setState({ locations: Locations });
    }

    const match = new RegExp(escapeRegExp(query), "i");
    const filterBeaches = Locations.filter(beach => match.test(beach.name));
    this.setState({
      locations: filterBeaches,
      // Prevent infowindow and selected marker from showing during search
      showingInfoWindow: false,
      selectedPlace: {}
    });
  };

  render() {
    return (
      <div>
        <List
          locations={this.state.locations}
          showingInfoWindow={this.state.showingInfoWindow}
          selectedPlace={this.state.selectedPlace}
          filterBeaches={this.filterBeaches}
          listItemClicked={this.listItemClicked}
        />
        <Mappa
          locations={this.state.locations}
          onMarkerClick={this.onMarkerClick}
          activeMarker={this.state.activeMarker}
          showingInfoWindow={this.state.showingInfoWindow}
          onClose={this.onClose}
          filterBeaches={this.filterBeaches}
          selectedPlace={this.state.selectedPlace}
        />
      </div>
    );
  }
}

export default App;
