/** @format */

import React, { useContext, useEffect, useRef,useState } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
// import addNote from './AddNote'


const Notes = (props) => {

  const context = useContext(noteContext);
  let navigate = useNavigate()
  const { notes, getNotes ,editNote} = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({id : "", etitle:"",ediscription:"",etag:"default"})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id,etitle :currentNote.title,ediscription :currentNote.discription,etag :currentNote.tag  
  });
  }
  const ref = useRef(null);
  const refClose = useRef(null)
    
    const handleClick = (e)=>{
      e.preventDefault();
        refClose.current.click();
        editNote(note.id,note.etitle,note.ediscription,note.etag)
      console.log("updating the note", note)
      props.showAlert(" updated successfully" , "success")
    }
    
    const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value= {note.etitle}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ediscription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ediscription"
                    name="ediscription"
                    onChange={onChange}
                    value= {note.ediscription}
                    minLength={5} required

                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value= {note.etag}
                  />
                </div>

               
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref ={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.ediscription.length <5} type="button" className="btn btn-primary" onClick ={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" row my-3">
        <h1>Your Notes </h1>
        <div className="container mx=2">
        {notes.length ===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
