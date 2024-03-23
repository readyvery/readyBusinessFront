import styled from 'styled-components';
import usePrintHandler from '../hooks/usePrintHandler';

const ReceiptTest = ({color}) => {
  const onClickPrintHandler = usePrintHandler();
  
  return (
    <>
      {color === "white" ? (
        <ReceiptButtonContainer>
          <ReceiptWhiteButton
            onClick={async () => {
              await onClickPrintHandler();
            }}
          > 영수증 출력 </ReceiptWhiteButton>
        </ReceiptButtonContainer>
      ) : (
        <ReceiptButton
          onClick={async () => {
            await onClickPrintHandler();
          }}
        > 영수증 출력 </ReceiptButton>
      )}
    </>
  );
};

const ReceiptButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const ReceiptWhiteButton = styled.div`
  width: 10rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 1.302px solid #DADADA;
  text-align:center;
  color: #838383;
  line-height: 2.5rem;
  font-size: 1.2rem;
`;

const ReceiptButton = styled.div`
  width: 10rem;
  height: 2.5rem;
  background-color: #d82356;
  border-radius: 1.25rem;
  text-align:center;
  color: #fff;
  line-height: 2.5rem;
  font-size: 1.2rem;
`;

export default ReceiptTest;
