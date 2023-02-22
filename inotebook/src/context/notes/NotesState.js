/** @format */

import NoteContext from "./noteContext";
import { useState } from "react";
const NotesState = (props) => {
  const host = "http://localhost:3600";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    //   todo api call

    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
         
      }
    );
    const json = await response.json()
   setNotes(json)
  };
  

  //  Add a Note
  const addNote = async (title, discription, tag) => {
    //   todo api call

    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token') // token ab local storage se aana wala h
        },
        body: JSON.stringify({title, discription, tag}), // body data type must match "Content-Type" header
      }
    );
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //  Delete Note
  const deleteNote =async (id) => {
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token')
        },
      }
      );
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  }

   //  Edit Note
    const editNote = async (id, title, discription, tag) => {
    //   //  API call

      const response = await fetch(
        `${host}/api/notes/updatenote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              localStorage.getItem('token')
          },
          body: JSON.stringify({title, discription, tag}), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      // logic to edit in client

      let newNotes = JSON.parse(JSON.stringify(notes))
    //  react me hum directly state ko change nhi kr skte  toh hum deep copy bn jaygei
      for (let i = 0; i < newNotes.length; i++) {
        const element = notes[i];
        if (element._id === id) {
          newNotes[i].title = title;
          newNotes[i].discription = discription;
          newNotes[i].tag = tag;
          break;
        }
      }
      console.log(newNotes)
        setNotes(newNotes)
    };

    return (
      <NoteContext.Provider
        value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}
      >
        {/* jo provide krna h usko value me daal do */}

        {props.children}
      </NoteContext.Provider>
    );
  };


export default NotesState;
// const NotesState = (props) => {
//     const s1 ={
//         "name" : " harry",
//         "class" :"5b"
//     }
//     const [state, setState] = useState(s1)
//   const  update =()=>{
//         setTimeout(()=>{
//               setState({
//                   "name" : "Larry",
//                   "class" : "10b"
//               })
//         },1000)
//     }
//         return (
//                    <NoteContext.Provider value ={{state,update}}>
//                    {/* jo provide krna h usko value me daal do */}

//                        {props.children}
//                    </NoteContext.Provider>
//                 )
//             }

// export default NotesState
