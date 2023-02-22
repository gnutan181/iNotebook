import noteContext from '../context/notes/noteContext'
import React,{useContext,useState} from "react";


const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;

    const [note, setNote] = useState({title:"",discription:"",tag:""})
    
    const handleClick = (e)=>{
        e.preventDefault()
     addNote(note.title,note.discription,note.tag)
     setNote({title:"",discription:"",tag:""})
     props.showAlert(" added successfully" , "success")
    }
    
    const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    
    return (
        <div className="container my-3">
        <h1>Add a Note </h1>
        <form className="my-3">
          <div className="mb-3">
            
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              id = "title"
              name ="title"
              onChange ={onChange}
              minLength={5} required
              value = {note.title}

            />
          </div>
          <div className="mb-3">
            <label htmlFor="discription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="discription"
              name = "discription"
              onChange ={onChange}
              minLength={5} required
              value = {note.discription}
            />
            </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name = "tag"
              onChange ={onChange}
              value = {note.tag}
            />

          </div>
         
          <button type="submit" disabled={note.title.length<5 || note.discription.length <5} className="btn btn-primary" onClick= {handleClick}>
             Add Note
          </button>
        </form>
        
      </div>
    )
}

export default AddNote
