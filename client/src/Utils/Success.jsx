import React from 'react'
import { useHistory } from 'react-router'

const Success = ({msg,navigate}) => {

    const history = useHistory();
    return (
        <div className="success">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              {msg}
              {navigate=="posts"?<>View the <a href="/grid" class="navigate">Posts Grid</a><span>here</span>
              </>:<></>}
              {navigate=="login"?<>Please <a class="navigate" style={{textDecoration:'underline'}}
              onClick={()=>history.push('/signin')}>Login here</a></>:<></>}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button></div>
        </div>
    )
}

export default Success
