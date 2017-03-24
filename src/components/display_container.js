import React from "react";

class DisplayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.can_be_displayed = this.can_be_displayed.bind(this);
  }

  // TODO: Instead of this, treat them as three categories:
  //  Brand, color and sold out.
  //  Apply +OR+ within filters of a particular query.
  //  Apply +AND+ across categories.

  can_be_displayed(object) {
    var visible_colors = this.props.visible_colors;
    var visible_brands = this.props.visible_brands;
    var search_query = this.props.search_query.toLowerCase();
    var sold_out = this.props.sold_out;

    var none_filered = !visible_colors.length && !visible_brands.length;

    var only_colors_filtered = !visible_brands.length &&
      (visible_colors.length &&
        visible_colors.includes(object.color.toLowerCase()));

    var only_brands_filtered = !visible_colors.length &&
      (visible_brands.length &&
        visible_brands.includes(object.brand.toLowerCase()));

    var colors_and_brands_filtered = visible_colors.length &&
      visible_brands.length &&
      visible_colors.includes(object.color.toLowerCase()) &&
      visible_brands.includes(object.brand.toLowerCase());

    var searched = !search_query ||
      (object.name.toLowerCase().includes(search_query) ||
        object.brand.toLowerCase().includes(search_query) ||
        object.color.toLowerCase().includes(search_query));

    var sold_out_filtered = !sold_out || (object.sold_out === '0');

    return (none_filered ||
      only_colors_filtered ||
      only_brands_filtered ||
      colors_and_brands_filtered) &&
      searched &&
      sold_out_filtered;
  }

  render() {
    var products = this.props.data.map(object => {
      if (this.can_be_displayed(object)) {
        return (
          <div className="col-md-3">
            <img
              src={"images/" + object.url}
              className="img-thumbnail"
              alt="afsd"
            />
          </div>
        );
      }
    });

    return (
      <div className="col-md-9">
        {products}
      </div>
    );
  }
}

export default DisplayContainer;
