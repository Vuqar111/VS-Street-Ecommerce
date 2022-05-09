import React from 'react'
import styled from 'styled-components'
const About = () => {
  return (
    <Wrapper>
     
 <div className='helpcenter'>
<h2>VS-STREET haqqında məlumat</h2>

<p>
VS street 2022-ci ildən başlayaraq fəaliyət göstərən geyim brendidir. Brendimiz ən dəbli və keyfiyyətli geyimləri müştəriyə çatdırmağı hədəfləyir. Siz burada istəyinizə və zövqünüzə uyğun "Urban style" geyimlər tapa bilərsiniz. Həmçinin öz ideyalarınıza və yaradıcılığınıza əsasən t-shirt dizaynı da edə bilərsiniz. <br/><br/>
Hər hansı bir sualınız yaranarsa bizimlə əlaqə saxlamaqdan çəkinməyin. Hər zaman sizə yardım etməyə hazırıq.

</p>

 </div>

    </Wrapper>
  )
}

const Wrapper = styled.div`
.helpcenter {
  width: 60%;
  margin: auto;
  margin-top: 80px;
}

h2 {
  font-size: 35px;
  font-weight: bold;
}
p {
  margin-top: 30px;
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

export default About