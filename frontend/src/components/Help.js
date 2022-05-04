import React from 'react'
import styled from 'styled-components'
const Help = () => {
  return (
    <Wrapper>
     
 <div className='helpcenter'>
<h2>Xoş gəlmisiniz VS-Fashion Yardim Merkezi</h2>
<h4>VS-fashion 2022-ci ilden beri fealiyyet gostermeye baslamisdir</h4>
<p>
  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</p>

 </div>

    </Wrapper>
  )
}

const Wrapper = styled.div`
.helpcenter {
  width: 70%;
  margin: auto;
  margin-top: 80px;
}

h2 {
  font-size: 35px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .helpcenter {
  width: 90%;
  margin: auto;
  margin-top: 80px;
}

h2 {
  font-size: 20px;
  font-weight: bold;
}

}
`

export default Help