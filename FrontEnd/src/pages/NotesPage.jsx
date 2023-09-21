import { useEffect, useState } from "react"
import { baseURL } from "../api";
import axios from "axios";

function NotesPage() {
    
    const [notes, setNotes] = useState([]);

    const getNotes = async () => { 
        let res = await axios.get(`${baseURL}/notes/get`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        let data = res.data;
        setNotes(data.notes);
    }

    useEffect(() => { 
        getNotes();
    },[])

    return (
        <div className='NotesPage'>
            <h1>Please find all your Notes below: </h1>
            <div className="notesList">
                {
                }
            </div>
        </div>
    )
}

export default NotesPage
