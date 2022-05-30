import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import QRCodeScanner from '../components/QRCodeScanner';
import { closeOutline, ellipsisHorizontalOutline, flashlightOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import { createPortal } from 'react-dom';
import { BarcodeResult, FrameResult, EnumResolution } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner';

const Scanner = (props:RouteComponentProps) => {
  const [isActive, setIsActive] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [viewBox, setViewBox] = useState("0 0 720 1280");
  const [runtimeSettings,setRuntimeSettings] = useState("{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_ALL\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}")
  const [barcodeResults, setBarcodeResults] = useState([] as BarcodeResult[]);
  const [cameraResolution,setCameraResolution] = useState(EnumResolution.RESOLUTION_720P);
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
    const state = props.location.state as { continuous:boolean,QRCodeOnly:boolean };
    if (state.QRCodeOnly == true) {
      setRuntimeSettings("{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}");
    }
    startScan();
  }, []);

  const getPointsData = (lr:BarcodeResult) => {
    let pointsData = lr.x1 + "," + lr.y1 + " ";
    pointsData = pointsData + lr.x2+ "," + lr.y2 + " ";
    pointsData = pointsData + lr.x3+ "," + lr.y3 + " ";
    pointsData = pointsData + lr.x4+ "," + lr.y4;
    return pointsData;
  }

  const renderResults = () => {
    return (
      <div className="overlay">
        <svg
          viewBox={viewBox}
          className="overlay"
          xmlns="<http://www.w3.org/2000/svg>"
        >
          {barcodeResults.map((tr,idx) => (
            <polygon key={"poly-"+idx} xmlns="<http://www.w3.org/2000/svg>"
            points={getPointsData(tr)}
            className="barcode-polygon"
            />
          ))}
          {barcodeResults.map((tr,idx) => (
            <text key={"text-"+idx} xmlns="<http://www.w3.org/2000/svg>"
            x={tr.x1}
            y={tr.y1}
            fill="red"
            fontSize="20"
            >{tr.barcodeText}</text>
          ))}
        </svg>
      </div>
    );
  }

  const onFrameRead = (frameResult:FrameResult) => {
    const state = props.location.state as { continuous:boolean,QRCodeOnly:boolean };
    console.log(frameResult);
    if (state.continuous == false) {
      if (frameResult.results.length>0) {
        props.history.replace({ state: {results:frameResult.results} });
        close();
      }
    }else{
      setViewBox("0 0 "+frameResult.frameWidth+" "+frameResult.frameHeight);
      setBarcodeResults(frameResult.results);
    }
  }

  const renderToBody = () => {
    return createPortal(
      <div>
        <QRCodeScanner 
          isActive={isActive} 
          torchOn={torchOn}
          resolution={cameraResolution}
          runtimeSettings={runtimeSettings}
          onFrameRead={(frameResult) => {onFrameRead(frameResult)}}
        ></QRCodeScanner>
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
