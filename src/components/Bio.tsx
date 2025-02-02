import React from 'react'

const contact = 'assets/texts/contact.png'
const logo = 'assets/texts/logo.png'

const Bio: React.FC = () => {
  return (
    <div id='text-panel'>
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
