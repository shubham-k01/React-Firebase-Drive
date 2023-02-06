import {useReducer,useEffect} from 'react'
import { database , fireS } from '../firebase'
import {  doc, getDoc , where , onSnapshot, query,orderBy,collection, getDocs} from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'

const ACTIONS = {
    SELECT_FOLDER : 'select-folder',
    UPDATE_FOLDER:'update-folder',
    SET_CHILD_FOLDERS:'set-child-folders'
}

export const ROOT_FOLDER = {name:'root',path:[],id:null}

function reducer(state,{type,payload}){
// function reducer(state,action){
    switch(type){
        case ACTIONS.SELECT_FOLDER:
            return {
                folder:payload.folder,
                folderId:payload.folderId,
                childFiles:[],
                childFolders:[]
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder:payload.folder,
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders:payload.childFolders,
            }
        default:
            return state
    }
}

// firebase does not work with undefined so we make the parameters null by default
export function useFolder(folderId = null,folder =null){
    const [state,dispatch] = useReducer(reducer,{
        folder,
        folderId,
        childFolders:[],
        childFiles:[]
    })

    const {user} =useAuth()

    // we just to reset everything when we select a new folder
    useEffect(() => {
        if(folder==null){
            return dispatch({type:ACTIONS.UPDATE_FOLDER,payload:{folder:ROOT_FOLDER}})
            
        }
        dispatch({type:ACTIONS.SELECT_FOLDER,payload:{folderId,folder}})
    }, [folder,folderId])

    // we are passing folder as well because we can prepopulate our breadcrumbs and the names of different files or otherwise just using folderId we would have to wait for the folder to load entirely
    // it gives some info about the folder but not the entire infof
    

    // next we need to get all the folder information with the help of folderId , like all the child files , folders and other info
    useEffect(() => {
        if(folderId==null){
            return dispatch({type:ACTIONS.UPDATE_FOLDER,payload:{folder:ROOT_FOLDER}})
        }
        const d = doc(fireS,`folders/${folderId}`)
        getDoc(d).then((dos)=>{
            dispatch({type:ACTIONS.UPDATE_FOLDER,payload:{
                folder:database.formatDoc(dos)
            }})
        }).catch((error)=>{
            console.log(error);
            dispatch({type:ACTIONS.UPDATE_FOLDER,payload:{folder:ROOT_FOLDER}})
        })
    }, [folderId])

    useEffect(() => {
        async function start(){
            // firstly we have to create a query object then we have to pass the collection refernece to the object and the query constraints that we want to apply on the collection
            let q;
            // q = query(database.folders,where('parent','==',folderId),where('userId','==',user.uid))
            q = query(database.folders,where('parent','==',folderId),where('userId','==',user.uid),orderBy('createdAt'))
            // the following function is used to get the docs matching the query object
            // const p = await getDocs(q)
            // console.log(p);
            return onSnapshot(q,snap=>{
            dispatch(
                {type:ACTIONS.SET_CHILD_FOLDERS,
                payload:{childFolders: snap.docs.map(database.formatDoc)}})
            })
        }
        start()
    
    },[folderId,user])
    

    return state
    
}
