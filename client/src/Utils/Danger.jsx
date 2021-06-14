import React,{useEffect} from 'react'

const Danger = ({msg}) => {

    // useEffect(() => {
    //     window.addEventListener('ready', function ()           
    //     {
    //         document.getElementsByClassName(".toast")[0].toast('show')
    //     })
    // }, [msg])
    


    return (
        <div>
            <div class="alert alert-danger alert-dismissible" role="alert">
                {msg}
                <button type="button" class="close" data-dismiss="alert" 
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        </div>

/* <div aria-live="polite" aria-atomic="true" class="bg-dark position-relative 
bd-example-toasts">
  <div class="toast-container position-absolute p-3" id="toastPlacement">
    <div class="toast">
      <div class="toast-header">
        <img src="..." class="rounded me-2" alt="..."/>
        <strong class="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </div>
      <div class="toast-body">
        Hello, world! This is a toast message.
      </div>
    </div>
  </div>
</div> */

    )
}

export default Danger
