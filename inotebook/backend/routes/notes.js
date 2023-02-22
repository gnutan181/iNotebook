/** @format */

const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// //  user ke notes dega jo user already loggedin h
// // Route 1: get all the notes using : GET "/api/auth/getuser" . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message)        
    res.status(500).send('somee error occupied')
    }
 
});


// ROUTE-2 Add a new note using : POST "/api/notes/addnote" login required
router.post(
  "/addnote",
  fetchuser,
  [ 
    body("title", "enter avalid title").isLength({ min: 3 }),
    body("discription", "enter a valid discription").isLength({ min: 5 }),
      
  ],
  async (req, res) => {
    //   const notes = await Notes.find({user : req.user.id})

    try {
    const {title, discription, tag} = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title,
      discription,
      tag,
      user: req.user.id
    });
   const saveNote =await note.save()

    res.json(saveNote);
    } catch (error) {
        console.error(error.message)        
    res.status(500).send('some error occupied')
    } 
  }
);

// ROUTE 3 update an existing Note using : POST "/api/auth/updatenote" login registered
//  update to app kr skte jb aap whi user ho jiska yeh note h
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        try {
        const {title, discription, tag} = req.body;
            // create a newNote object
            const newNote = {}
            if(title){
                newNote.title = title
            }
            if(discription){
                newNote.discription = discription
            }
            if(tag){
                newNote.tag = tag
            }
    
            //  find the note to be updated and update it
            let note =await Note.findById(req.params.id) // id ko find krne ke liye
            if(!note){
              return res.status(404).send("Not Found") //
            }
            if(note.user.toString() !== req.user.id){
          return res.status(401).send("Not Allowed") //
            }
            note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true})
            res.json({note})
        }
         catch (error) {
            console.error(error.message)        
    res.status(500).send('some error occupied')
        }}
)

    // route 4 for deleting a existing note using delete
    router.delete(
        "/deletenote/:id",
        fetchuser,
        async (req, res) => {

            try {
                const {title, discription, tag} = req.body;
            
            //  find the note to be deleted and delete it
            let note =await Note.findById(req.params.id)
            if(!note){
              return res.status(404).send("Not Found")
            }
            if(note.user.toString() !== req.user.id){
          return res.status(401).send("Not Allowed")
            }
            note = await Note.findByIdAndDelete(req.params.id)

            res.json({"success" : "notehas been deleted",note : note})
            } catch (error) {
                console.error(error.message)        
    res.status(500).send('some error occupied')
            }
            
        })
    

module.exports = router;
