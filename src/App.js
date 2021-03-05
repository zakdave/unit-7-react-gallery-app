import React, { Component } from 'react';
import { withRouter, 
    Switch,
    Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import apiKey from './config';

import Gallery from './components/Gallery';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';

class App extends Component {
    constructor() {
        super()
        this.state = {
            query: ''
        }
    }

    getData = (search, stateName) => {
        
        //Two regular expressions to manipulate strings for axios request
        let tags = search.replace(/\s/gi, '%2C');
        let text = search.replace(/\s/gi, '+');

        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&
            api_key=${apiKey}&tags=${tags}&tag_mode=all&text=${text}&
            safe_search=3&content_type=1&per_page=24&format=json&nojsoncallback=1`
        )
            .then(response => {
                this.setState({
                    [ `${stateName}` ]: response.data.photos.photo,
                    query: search,
                })
            });
    }

    //  Load state with default queries
    componentDidMount() {
        //Default query and Nava button queries
        this.getData('cave diver', 'photos');
        this.getData('coral', 'coral');
        this.getData('javascript', 'javascript');
        this.getData('ocean', 'ocean');

        //Use regex test on location.pathname prop to check url, if true
        // use getData to store images in userURLQuery in App state
        if(/^\/search/i.test(this.props.location.pathname)) {
            this.getData(this.props.location.pathname.slice(8), 'userURLQuery')
        }
    }
    
    render() {
        //Destructuring of props and state to be passed to respective Gallery components
        const { location, history } = this.props;
        let {photos, coral, javascript, ocean, search} = this.state;

        return (
            <div className="container">
                <SearchForm onSearch={this.getData} history={history} location={location} />
                <Nav />
                <Switch>
                    <Route exact path="/"
                        render={() => <Gallery location={location} data={photos} />}
                    />
                    <Route path="/coral"
                        render={() => <Gallery location={location} data={coral} />}
                    />
                    <Route path="/javascript"
                        render={() => <Gallery location={location} data={javascript} />}
                    />
                    <Route path="/ocean"
                        render={() => <Gallery location={location} data={ocean} />}
                    />
                    <Route path="/search/:query"
                        render={() => <Gallery location={location} data={search} onSearch={this.getData} />}
                    />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
