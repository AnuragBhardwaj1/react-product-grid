import React from "react";
import SearchBar from "./components/search_bar";
import FilterContainer from "./components/filter_container";
import DisplayContainer from "./components/display_container";

var productJson = require("./data/product.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Another way to organize state might be to color: { visible: ['Yellow', 'Red'], hidden: ['Green', 'Blue']}
    //  This will make showing and hiding trivial and eliminate loops in searching everytime a filter is clicked.
    // TODO: If we are using same constants at two places, you may extract them out in a separate constants file and import them everywhere.
    this.state = {
      data: productJson,
      color: { Yellow: false, Red: false, Green: false, Blue: false },
      brand: {
        "Brand A": false,
        "Brand B": false,
        "Brand C": false,
        "Brand D": false
      },
      search_query: '',
      sold_out: false
    };

    this.color_handler = this.color_handler.bind(this);
    this.brand_handler = this.brand_handler.bind(this);
    this.visible_colors = this.visible_colors.bind(this);
    this.visible_brands = this.visible_brands.bind(this);
    this.search_query_handler = this.search_query_handler.bind(this);
    this.sold_out_handler = this.sold_out_handler.bind(this);
  }

  // TODO: The logic may be extracted out in a toggle function
  color_handler(e) {
    var color = this.state.color;
    var new_state = e.target.value;
    color[new_state] = !color[new_state];
    this.setState({ color: color });
  }

  brand_handler(e) {
    var brand = this.state.brand;
    var new_state = e.target.value;
    brand[new_state] = !brand[new_state];
    this.setState({ brand: brand });
  }

  sold_out_handler(e) {
    var sold_out = this.state.sold_out;
    this.setState({ sold_out: !sold_out });
  }

  search_query_handler(e) {
    // TODO: Are we using this search_query somewhere? Its also giving warning.
    var search_query = this.state.search_query;
    var new_state = e.target.value;
    this.setState({ search_query: new_state });
  }

  visible_colors(){
    var result = [];
    var colors = this.state.color;
    for (let key in colors){
      if(colors[key]){ result.push(key.toLowerCase()) }
    }
    return result;
  }

  visible_brands(){
    var result = [];
    var brands = this.state.brand;
    for (let key in brands){
      if(brands[key]){ result.push(key.toLowerCase()) }
    }
    return result;
  }

  render() {
    return (
      <div className="container">
        <SearchBar handler={this.search_query_handler}/>
        <div className="row">
          <FilterContainer
            color_handler={this.color_handler}
            brand_handler={this.brand_handler}
            search_query={this.state.search_query}
            sold_out={this.state.sold_out}
            sold_out_handler={this.sold_out_handler}
          />
          <DisplayContainer
            data={this.state.data}
            visible_colors={this.visible_colors()}
            visible_brands={this.visible_brands()}
            search_query={this.state.search_query}
            sold_out={this.state.sold_out}
          />
        </div>
      </div>
    );
  }
}

export default App;
