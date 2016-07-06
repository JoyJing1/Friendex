const React = require('react');

const SearchBar = React.createClass({
  getInitialState() {
    return { initialName: "" };
  },

  filterNames(e) {
    e.preventDefault();
    this.setState({ initialName: e.target.value });
  },

  clickedName(e) {
    e.preventDefault();
    this.setState({ initialName: e.target.id });
  },

  render() {
    // let matchingNames = this.props.names.filter(name => {
    //     return( name.includes(this.state.initialName) );
    // });

    return (
      <aside className="search-bar">
        <div className="search-bar-head">
          <input type="text"
            onChange={this.filterNames}
            value={this.state.initialName}></input>

          <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,w_30/v1467837986/icons/iconmonstr-magnifier-2-240.png"
            className="search-icon"></img>
        </div>

        <ul>

        </ul>

      </aside>
    );
  }
});

module.exports = SearchBar;
//
// {
//   matchingNames.map(name => {
//     return (<li key={name} id={name} onClick={this.clickedName}>{name}</li>);
//   })
// }
