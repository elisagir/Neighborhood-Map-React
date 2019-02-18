import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export class List extends Component {
  responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 8 }
  };

  galleryItems() {
    return this.props.locations.map((item, i) => (
      <div key={`key-${i}`} className="beachBox">
        <button>{item.name}</button>
      </div>
    ));
  }

  render() {
    const items = this.galleryItems();

    return (
      <div className="search-beaches">
        <div className="search-beaches-bar">
          <div className="search-beaches-input-wrapper">
            <input
              aria-label="Search input"
              role="search"
              type="text"
              placeholder="Search best beaches"
              onChange={e => this.props.filterBeaches(e.target.value)}
            />
          </div>
        </div>

        <AliceCarousel
          items={items}
          duration={400}
          autoPlay={false}
          startIndex={1}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          playButtonEnabled={false}
          autoPlayInterval={2000}
          autoPlayDirection="rtl"
          responsive={this.responsive}
          disableAutoPlayOnAction={true}
        />
      </div>
    );
  }
}

export default List;
