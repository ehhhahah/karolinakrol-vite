import React from 'react'

import logo from './../assets/texts/logo.png'
import contact from './../assets/texts/contact.png'

const Bio: React.FC = () => {
  return (
    <div className='text-panel'>
      <img src={logo} alt='Karolina Król logo' width={'75%'} />
      <p>
        The issue might be related to how React updates the UI. While the artwork state is updated correctly in
        handleModeChange, React might not always immediately re-render the component to reflect the change. Here are
        some ways to address this:
      </p>
      <p>Lorem ipsum</p>

      <br />
      <img src={contact} alt='Contact' width={'30%'} />
      <br />
      <span id='links'>
        <a href='https://facebook.com'>facebook</a>
        <a href='https://instagram.com'>instagram</a>
      </span>
    </div>
  )
}

export default Bio
