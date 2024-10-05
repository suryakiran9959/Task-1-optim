import { BrowserRouter, Route, Routes } from "react-router-dom"
import Fetch from "./one"
import History from "./history1"

function Stack(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Fetch}/>
                <Route path="/history" Component={History}/>

            </Routes>
        </BrowserRouter>
    )
}
export default Stack