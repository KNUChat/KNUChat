import styled from 'styled-components';
import { useChatStore } from '@store/useChatStore';

const WaitToEnd = () => {
    const {checked,setChecked} = useChatStore();

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        <SwitchButton>
            <SwitchInput type="checkbox" checked={checked} onChange={handleCheckboxChange} />
            {checked ? <SwitchButtonChecked /> : <SwitchSlider />}
            {checked ? <SwitchButtonCheckedBefore /> : <SwitchSliderBefore />}
        </SwitchButton>
  );
};

export default WaitToEnd;

const SwitchButton = styled.label`
    position: relative;
    display: inline-block;
    width: 55px;
    height: 30px;
    margin-top:0.5rem;
    align-items:rignt;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 30px;
  background-color: #ccc;
  box-shadow: inset 1px 5px 1px #999;
  transition: 0.4s;
`;

const SwitchSliderBefore = styled.div`
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: #fff;
  transition: 0.5s;
  border-radius: 30px;
`;

const SwitchButtonChecked = styled(SwitchSlider)`
  background-color: #F2D522;
  box-shadow: inset 1px 5px 1px #E3AE56;
`;

const SwitchButtonCheckedBefore = styled(SwitchSliderBefore)`
  transform: translateX(26px);
`;