import { useContext } from "react";
import styled, { css } from "styled-components";
import { useFetchCompleteInfo } from "../../../hooks/useFetchCompleteInfo";
import { useFetchIntegrationInfo } from "../../../hooks/useFetchIntegrationInfo";
import { HomeContext } from "../../../pages/OrderManage/Home";
import theme from "../../../style/theme/theme";

export default function StatusBtn({ status, text }) {
  const context = useContext(HomeContext);

  // const {refreshData: fetchWait} = useFetchWaitInfo();
  // const {refreshData: fetchMake} = useFetchMakeInfo();
  const {refreshData: fetchIntegration} = useFetchIntegrationInfo();
  const {refreshData: fetchComplete} = useFetchCompleteInfo();
  
  // 처리중 | 완료 버튼 눌렀을 때
  const onClickHandler = () => {
    context.setStatus(status);
    context.setSelectedIdx(0);
    context.setSelectedMenu({});

    if(status === 1){
      fetchIntegration();
    }
    if(status === 2){
      fetchComplete();
    }
  };

  return (
    <StatusBtnBox clicked={context.status === status} onClick={onClickHandler}>
      <StatusTxt>{text}</StatusTxt>
    </StatusBtnBox>
  );
}

const StatusBtnBox = styled.div`
  width: 50%;
  height: 100%;
  color: #fff;
  background-color: ${theme.colors.MainColor};
  border-radius: 15px 15px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.clicked
      ? css`
          color: #fff;
          background-color: ${theme.colors.MainColor};
        `
      : css`
          color: ${theme.colors.text};
          background-color: #fff;
        `}
`;

const StatusTxt = styled.span`
  font-size: 1.25rem;
  font-family: "Pretendard Variable";
  font-weight: 800;
`;
