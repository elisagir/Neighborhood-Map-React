import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import sortBy from "sort-by";
export class List extends Component {
  state = {
    query: ""
  };
  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  render() {
    const { locations } = this.props;
    const { query } = this.state;
    let showingLocations;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingLocations = locations.filter(beach => match.test(beach.name));
    } else {
      showingLocations = locations;
    }
    showingLocations.sort(sortBy("name"));
    return (
      <div className="search-beaches">
        <div className="list-beaches-top">
          <div className="search-beaches-bar">
            <div className="search-beaches-input-wrapper">
              <input
                aria-label="Search input"
                role="search"
                type="text"
                placeholder="Search best beaches"
                value={query}
                onChange={event => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
        </div>
        <ol className="beach-list" aria-label="Filtered list of beaches">
          {showingLocations.map(beach => (
            <li key={beach.id} className="beach-list-item">
              <div className="beach-details">
                <p>{beach.name}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default List;
