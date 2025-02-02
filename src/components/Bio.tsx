import React from 'react'

import logo from './../assets/texts/logo.png'
import contact from './../assets/texts/contact.png'

const Bio: React.FC = () => {
  return (
    <div className='text-panel'>
      <img src={logo} alt='Karolina Król logo' width={'75%'} />
      <p>
        Born in 1994 in Warsaw, where they currently live and work.. Graduated from the Wojciech Gerson High School of Fine Arts in 2013 and obtained a Master’s degree in Graphics from the Academy of Fine Arts in Warsaw in 2022.
      </p>
      <p>Works mostly with graphic design, illustration and art books/zines. She is deeply engaged with the urgent issues of the global ecological crisis by focusing on the interconnectedness of all living beings and critiquing both anthropocentric and biocentric worldviews. Most of her projects aim to dissolve the dichotomy between human/nature and subject/object, emphasizing the importance of small, deliberate actions. She seeks to renew the connection between humans and nonhuman beings, to rediscover our essential ties to ecosystems and rethink our role within the intricate matrix of ecological interrelations under the weight of capitalism.</p>

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
