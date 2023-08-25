import styled from "styled-components";

const ModalWrapper = styled.main`
  
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
z-index: 10;

  
  .modal {
    background: #fff;
    border-radius: 0.25rem;
    text-align: center;
    place-items: center;
  }

`

export default ModalWrapper;