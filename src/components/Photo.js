
// Functional component for each photo. Child component in Gallery
const Photo = props => {
    const {id, server, secret, title} = props.data;

    return (
        <li>
            <img src={`https://farm5.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} />
        </li>
    )
}

export default Photo;