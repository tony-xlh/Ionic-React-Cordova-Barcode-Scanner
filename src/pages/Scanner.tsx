import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import QRCodeScanner from '../components/QRCodeScanner';
import { closeOutline, ellipsisHorizontalOutline, flashlightOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import { createPortal } from 'react-dom';

const Scanner = (props:RouteComponentProps) => {
  const [isActive, setIsActive] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const startScan = () => {
    setIsActive(true);
  }

  const toggleTorch = () => {
    setTorchOn(!torchOn);
  }
  
  const close = () => {
    setIsActive(false);
    props.history.goBack();
  }

  useEffect(() => {
    startScan();
  }, []);

  const renderResults = () => {
    return (
      <div></div>
    );
  }

  const renderToBody = () => {
    return createPortal(
      <div>
        <QRCodeScanner isActive={isActive} torchOn={torchOn}></QRCodeScanner>
        {renderResults()}
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton>
            <IonIcon icon={ellipsisHorizontalOutline} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={toggleTorch}>
              <IonIcon icon={flashlightOutline} />
            </IonFabButton>
            <IonFabButton onClick={close}>
              <IonIcon icon={closeOutline} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </div>,document.body
    );
  }

  return (
    <IonPage>
      <IonContent style={{display:"none"}}>
      {renderToBody()}
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
