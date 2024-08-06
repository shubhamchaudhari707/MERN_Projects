import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <>
         <Spinner animation="border" variant="warning" className='m-auto' style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'50px'}}  />
    </>
  )
}

export default Loader