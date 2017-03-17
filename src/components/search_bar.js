import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <div className="row">
        <div className=" col-md-offset-3 col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
              value={this.props.search_query}
              onChange={this.props.handler}
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onCLick>
                Go!
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
