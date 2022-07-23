import React from "react"
import SelectOne from "./SelectOne";
import SelectMany from "./SelectMany";
import ButtonGet from "./ButtonGet";
import Sheets from "./Sheets";

function MainContent() {
    return (
        <header>
            This is the MainContent
            <SelectOne />
            <SelectMany />
            <ButtonGet />
            <Sheets />
        </header>

    )
}

export default MainContent