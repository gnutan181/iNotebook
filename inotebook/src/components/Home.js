/** @format */

import React from "react";
import Notes from './Notes.js'
// import AddNote from "./AddNote.js";

function Home(props) {
    const {showAlert} = props
  return (
    <div>
      <Notes showAlert={showAlert}  />
    </div>
  );
}

export default Home;
