import React from 'react'
import {Link} from 'react-router-dom'
import styles from './landingPage.module.css'


const LandingPage = () => {
  return (
    <div className={styles.principal}>
      <Link to={'/home'}  id={styles.btn}>
     <button >Ingresar</button> 
      </Link>
    </div>
  )
}

export default LandingPage