import React from 'react'

function About() {
   
    
    return (
        <div>
            <h1>This is about</h1>
        </div>
    )
}

export default About
// import React from 'react'
// import {useContext} from 'react'
// import noteContext from '../context/notes/noteContext'
// function About() {
//     const a = useContext(noteContext)
//     useEffect(()=>{
//         a.update()
//          // eslint-disable-next-line react-hooks/exhaustive-deps
//         //  componets did mount ki tarah use krna chahta hu
//     },[])
//     return (
//         <div>
//             <h1>This is about{a.state.name}</h1>
//         </div>
//     )
// }

// export default About
