import {
  CameraView,
  CameraViewContainer,
  Screen,
  TextDescription,
  TextDescriptionContainer,
} from './ReceiptsScanView.styles';

type ReceiptsPropsType = {
  footerText: string;
  children?: React.ReactNode; // פה נכניס Camera בעתיד
};

const ReceiptsScanView = ({ footerText, children }: ReceiptsPropsType) => {
  return (
    <Screen>
      <CameraViewContainer>
        {children}
        <CameraView />
      </CameraViewContainer>

      <TextDescriptionContainer>
        <TextDescription>{footerText}</TextDescription>
      </TextDescriptionContainer>
    </Screen>
  );
};

export default ReceiptsScanView;
