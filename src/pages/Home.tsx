import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToggle, IonToolbar, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import './Home.css';
import { BarcodeResult } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner';
import copy from 'copy-to-clipboard';

const Home = (props:RouteComponentProps) => {
  const [present, dismiss] = useIonToast();
  const [continuous, setContinuous] = useState(false);
  const [QRCodeOnly, setQRCodeOnly] = useState(false);
  const [barcodeResults, setBarcodeResults] = useState([] as BarcodeResult[]);
  
  useEffect(() => {
    const state = props.location.state as { results?: BarcodeResult[] };
    console.log(state);
    if (state) {
      if (state.results) {
        setBarcodeResults(state.results);
        props.history.replace({ state: {} });
      }
    }
  }, [props.location.state]);

  const startScan = () => {
    props.history.push("scanner",{continuous:continuous,QRCodeOnly:QRCodeOnly})
  }

  const copyBarcode = (text:string) => {
    if (copy(text)){
      present("copied",500);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand='full' onClick={startScan} >Scan Barcodes</IonButton>
        <IonList>
          <IonItem>
            <IonLabel>Continuous scan</IonLabel>
            <IonToggle slot="end" checked={continuous} onIonChange={e => setContinuous(e.detail.checked)} />
          </IonItem>
          <IonItem>
            <IonLabel>Scan only QR code</IonLabel>
            <IonToggle slot="end" checked={QRCodeOnly} onIonChange={e => setQRCodeOnly(e.detail.checked)} />
          </IonItem>
          {(barcodeResults.length>0) &&
            <IonListHeader>
              <IonLabel>Results:</IonLabel>
            </IonListHeader>
          }
          {barcodeResults.map((tr,idx) => (
            <IonItem key={idx}>
              <IonLabel>{(idx+1) + ". " + tr.barcodeFormat + ": " + tr.barcodeText}</IonLabel>
              <IonLabel style={{color:"green"}} slot="end" onClick={() =>{copyBarcode(tr.barcodeText)}}>copy</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;


