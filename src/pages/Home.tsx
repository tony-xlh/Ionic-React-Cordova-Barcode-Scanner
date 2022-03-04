import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BarcodeScanner, BarcodeScanResult } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner';
import './Home.css';
import React from 'react';

const Home: React.FC = () => {
  const [barcodeResult, setBarcodeResult] = React.useState<BarcodeScanResult>();
  const scan = async () => {
    const result = await BarcodeScanner.scan({"dynamsoftlicense":"t0068MgAAAB9sAFxbOCJarOQ5q0mj0cOtipXJlA1HSoSvxEawMCMHbzpyXbSWMAyWHI+10l4rrHap9xf2pXRop8oZHL+Lag8="});
    console.log("scan complete");
    console.log(result.text);
    setBarcodeResult(result);
  }

  const renderResults = () => {
   if (barcodeResult) {
     return (
       <p>{barcodeResult.format + ": " + barcodeResult.text}</p>
     );
   } else{
     return "";
   }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton expand='full' onClick={()=> scan()}>Scan Barcodes</IonButton>
        {renderResults()}
      </IonContent>
    </IonPage>
  );
};

export default Home;
