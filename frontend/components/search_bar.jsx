const React = require('react')
    , hashHistory = require('react-router').hashHistory;

const SearchActions = require('../actions/search_actions')
    , SearchStore   = require('../stores/search_store');

const SearchBar = React.createClass({
  getInitialState() {
    return { query: "", matches: [] };
  },

  componentDidMount() {
    // console.log("componentDidMount in search_bar.jsx");
    // SearchActions.fetchMatches(this.state.query);
    this.searchListener = SearchStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.searchListener.remove();
  },

  _onChange() {
    this.setState( { matches: SearchStore.matches(this.state.query)});
  },

  filterUsers(e) {
    e.preventDefault();
    this.setState({ query: e.target.value });
    if (e.target.value.length > 0) {
      SearchActions.fetchMatches(e.target.value);
    }
  },

  clickedUser(e) {
    e.preventDefault();
    // console.log("clickedUser(e) in search_bar.jsx");
    hashHistory.push(`/users/${e.target.value}`);
    this.setState( { query: '' } );
  },

  searchResults() {
    if (this.state.query !== "") {
      return (
        <ul className="search-results">
          { this.state.matches.map ( (user, i) => {
            if (i <= 12) {
              return (
                <li className="search-item"
                  onClick={this.clickedUser}
                  key={user.id}
                  value={user.id}>
                  <img src={user.profile_img.replace('upload', 'upload/c_scale,w_50')}></img>
                  {user.username}
                </li>
              );
            }
          })}
        </ul>
      );
    }
  },

  render() {
    return (
      <aside className="search-bar">
        <div className="search-bar-head">
          <input type="text"
            onChange={this.filterUsers}
            value={this.state.query}></input>

          <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,w_30/v1467837986/icons/iconmonstr-magnifier-2-240.png"
            className="search-icon"></img>
        </div>

        {this.searchResults()}

      </aside>
    );
  }
});

module.exports = SearchBar;
