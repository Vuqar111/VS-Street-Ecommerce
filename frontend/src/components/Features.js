import React from 'react';
import styled from 'styled-components';
import {TiTick} from 'react-icons/ti'
const Features = () => {
  return (
      <Wrapper>
      <h2 className='mt-[30px] text-[35px] text-center font-bold'><span className='clipspan'>About</span> US</h2>
      <p className='text-[20px] text-center'>Lorem lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
      <div className='flex justify-between  flex-wrap mt-[20px]'>
          <div className='fbox'>
           <div className='bg-[#3CBE93] p-[10px] rounded-[10px]'>
            <TiTick/>
           </div>
           <h3 className='font-bold text-[20px]'>Flexible</h3>
           <p>Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum lorem ipsum</p>
          </div>

          <div className='fbox'>
           <div className='bg-[#3CBE93] p-[10px] rounded-[10px]'>
            <TiTick/>
           </div>
           <h3 className='font-bold text-[20px]'>WordClass</h3>
           <p>Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum lorem ipsum</p>
          </div>

          <div className='fbox'>
           <div className='bg-[#3CBE93] p-[10px] rounded-[10px]'>
            <TiTick/>
           </div>
           <h3 className='font-bold text-[20px]'>Durable</h3>
           <p>Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum lorem ipsum</p>
          </div>
      </div>
      </Wrapper>
  ) 
};

export default Features;


const Wrapper = styled.div`
width: 80%;
margin: auto;
margin-top: 80px;

.fbox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 300px;
    height: 100%;
    background: var(--white-color);
    padding: 20px;
}
.fbox div,h3, p {
    padding-top: 10px;
}
@media (max-width: 768px) {
    .fbox {
        margin-top: 10px
    }
    p {
        font-size: 12px;
    }
}
`