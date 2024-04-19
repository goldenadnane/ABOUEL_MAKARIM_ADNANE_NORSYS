import {Search, SearchIconWrapper, StyledInputBase} from "./styles";
import React from "react";

const SearchAppBar = () => {
    return (
        <Search>
          
            <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
            />
        </Search>
    );

}
export default SearchAppBar;