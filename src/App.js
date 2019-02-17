import React, { Component } from "react";
import "./styles.css";
import Mappa from "./components/Mappa";
import List from "./components/List";

export class App extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    locations: [
      {
        id: "a123",
        name: "San Vito lo Capo",
        loc: {
          lat: 38.175824,
          lng: 12.738189
        }
      },
      {
        id: "b456",
        name: "Guidaloca",
        loc: {
          lat: 38.056636,
          lng: 12.840069
        }
      },
      {
        id: "c789",
        name: "Riserva naturale dello Zingaro",
        loc: {
          lat: 38.126091,
          lng: 12.788149
        }
      },
      {
        id: "d101",
        name: "Scala dei Turchi",
        loc: {
          lat: 37.927583,
          lng: 12.306676
        }
      },
      {
        id: "e121",
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
  onClickBeaches = location => {
    this.setState({
      locations: location
    });
  };
  onButtonClick = beachName => {
    document.querySelector(`[title="${beachName}"]`).click();
  };
  render() {
    return (
      <div>
        <List
          locations={this.state.locations}
          handleClick={this.onClickBeaches}
          showingInfoWindow={this.state.showingInfoWindow}
          selectedPlace={this.state.selectedPlace}
          onButtonClick={this.onButtonClick}
        />
        <Mappa
          locations={this.state.locations}
          onMarkerClick={this.onMarkerClick}
          activeMarker={this.state.activeMarker}
          showingInfoWindow={this.state.showingInfoWindow}
          onClose={this.onClose}
          selectedPlace={this.state.selectedPlace}
        />
      </div>
    );
  }
}

export default App;
