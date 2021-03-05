import React, { Component } from 'react';
import Photo from './Photo';

class Gallery extends Component {


    //Updates state search by calling getData 
    componentDidUpdate() {
        if(/^\/search/i.test(this.props.location.pathname)) {
            this.props.onSearch(this.props.location.pathname.slice(8), 'search')
        }
    }

    render() {

        //Map method as shown in course directory course, creates Component for each photo
        let photos = 0;
        if (this.props.data && this.props.data.length > 0) {
            photos = this.props.data.map(photo =>
                <Photo key={photo.id} data={photo} />
            );
        }

        return (
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    { /* JSX condition that will render No results list item if length <= 0 */
                        (photos.length > 0)
                            ? photos
                            :
                                <li className="not-found">
                                    <h3>No Results Found</h3>
                                    <p>You search did not return any results. Please try again.</p>
                                </li>
                    }
                </ul>
            </div>
        )
    }
}

export default Gallery;