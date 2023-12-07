import '../style/search.css'

function Search() {
    return (
        <div className={"search-bar"} id={"search-bar"}>
            <input type={"text"} id={"input-search"} placeholder={"search"} />
        </div>
    )
}

export default Search;