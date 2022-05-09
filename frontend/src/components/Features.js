import React from 'react';
import styled from 'styled-components';
import {BsSpeedometer} from 'react-icons/bs'
import {BiSupport} from 'react-icons/bi'
import {IoMdCreate} from 'react-icons/io'
const Features = () => {
  return (
      <Wrapper>
      <h2 className='feauturetitle mt-[30px] text-[35px] text-center font-bold'><span className='clipspan'>Keyfiyyətimiz</span>Fərqimizdir</h2>
     
      <div className='flex justify-between  flex-wrap mt-[20px]'>
          <div className='fbox'>
           <div className='bg-[#3CBE93] p-[10px] rounded-[10px]'>
            <BsSpeedometer/>
           </div>
           <h3 className='font-bold text-[20px]'>Sürətli və keyfiyyətli çatdırılma xidməti</h3>
           <p>Sifarişlər ölkə daxili həyata keçirilir</p>
          </div>

          <div className='fbox'>
           <div className='bg-[#3CBE93] p-[10px] rounded-[10px]'>
            <IoMdCreate/>
           </div>
           <h3 className='font-bold text-[20px]'>Öz dizaynını yaratma imkanı</h3>
           <p>İstədiyiniz dizaynda paltarları istehsal edirik</p>
          </div>

          <div className='fbox'>
           <div className='bg-[#3CBE93] p-[10px] rounded-[10px]'>
            <BiSupport/>
           </div>
           <h3 className='font-bold text-[20px]'>7/24 Dəstək</h3>
           <p>İstənilən vaxtda suallarınızı cavablandırmaq üçün burdayıq</p>
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
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: 1s;
}
.fbox:hover {
    transition: 1s;
    transform: scale(1.1);
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
    .feauturetitle {
        font-size: 20px;
    }
}
`