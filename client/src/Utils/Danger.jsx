import React from 'react'

const Danger = ({msg}) => {
    return (
        <div>
            <div class="alert alert-danger alert-dismissible" role="alert">
                {msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
            </div>
        </div>
    )
}

export default Danger
