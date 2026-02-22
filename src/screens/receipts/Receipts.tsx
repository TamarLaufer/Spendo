import ReceiptsScanView from '../../components/receipts/receiptsScanView/ReceiptsScanView';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import { STRINGS } from '../../strings/hebrew';
import { DummyCameraView } from './Receipts.styles';

const Receipts = () => {
  return (
    <ScreenLayout>
      <ReceiptsScanView footerText={STRINGS.RECEIPTS_DESCRIPTION}>
        {/* Placeholder למצלמה */}
        <DummyCameraView />
      </ReceiptsScanView>
    </ScreenLayout>
  );
};

export default Receipts;
