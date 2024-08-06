import {useState,useEffect, createContext, useContext} from 'react';


const searchContext = createContext()

const SearchProvider =({children})=>{

    const [auth, setAuth] = useState({
        keyword:"",
        results:[],
    })

    

    return <searchContext.Provider value={[auth,setAuth]}>
        {children}
    </searchContext.Provider>
}

const useSearch =()=>{
    return useContext(searchContext);
}

export {SearchProvider, useSearch};






