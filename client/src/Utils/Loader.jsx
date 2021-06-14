import React from 'react'

const Loader = ({msg}) => {
    return (
        <div>
             <div className="loader">
        <button className="btn btn-primary"
        type="button" disabled>
         <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
         {msg}...
       </button>
       </div>
       </div>
       )
    
}

export default Loader
