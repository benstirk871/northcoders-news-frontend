function SortByDropdown({sortBy, setSortBy, orderBy, setOrderBy}){

    function handleSortByChange(event){
        setSortBy(event.target.value)
    }

    const setAscending = () => setOrderBy("asc");
    const setDescending = () => setOrderBy("desc");

    return (
        <div className="sortby-dropdown-container">
          <label htmlFor="sortField"></label>
          <select id="sortField" value={sortBy} onChange={handleSortByChange}>
            <option value="" disabled>
            -- Select field --
            </option>
            <option value="created_at">Date Posted</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
                
          <button className={orderBy === "asc" ? "order-button-selected" : "order-button"} onClick={setAscending}>↑</button>
          <button className={orderBy === "desc" ? "order-button-selected" : "order-button"} onClick={setDescending}>↓</button>
        </div>
      )


}


export default SortByDropdown

