import React from "react";

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    // TODO: There should be another entry in here for soldOut.
    this.state = {
      color: ["Yellow", "Red", "Green", "Blue"],
      brand: ["Brand A", "Brand B", "Brand C", "Brand D"]
    };
  }

  render() {
    // TODO: Check map vs forEach iterator.
    // TODO: Instead of using generic names like +handler+, use as much
    //  context-specific names as you can.
    // TODO: No need to treat filter categories like brand, colors specifically.
    //  Within filter, apply OR, across filters, apply AND.
    var color_filters = this.state.color.map(color => {
      return (
        <Filter name={color} value={color} handler={this.props.color_handler} />
      );
    });
    var brand_filters = this.state.brand.map(brand => {
      return (
        <Filter name={brand} value={brand} handler={this.props.brand_handler} />
      );
    });
    return (
      <div className="col-md-2">
        {color_filters}
        {brand_filters}
        <Filter name='Sold Out' value='Sold Out' handler={this.props.sold_out_handler} />
      </div>
    );
  }
}

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <label>
            <input
              type="checkbox"
              name={this.props.name}
              value={this.props.value}
              onClick={this.props.handler}
            />
            {this.props.value}
          </label>
        </div>
      </div>
    );
  }
}

export default FilterContainer;
