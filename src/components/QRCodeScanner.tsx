import { BarcodeScanner as DBR, FrameResult } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner';
import { useEffect } from 'react';

const QRCodeScanner = (props: { isActive: boolean;
  torchOn?:boolean;
  onFrameRead?: (frameResult:FrameResult) => void;
  license?:string}) => {
  useEffect(() => {
    const init = async () => {
      let license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
      if (props.license) {
        license = props.license;
      }
      let result = await DBR.init(license);
    }

    init();

    return () => {
      console.log("unmount");
      DBR.stopScanning();
    }
  }, []);

  useEffect(() => {
    if (props.isActive == true) {
      let license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
      if (props.license) {
        license = props.license;
      }
      DBR.startScanning(license).subscribe((result:FrameResult) => {
        console.log(result);
        if (props.onFrameRead) {
          props.onFrameRead(result);
        }
      });
    }else if (props.isActive == false){
      DBR.stopScanning();
    }
    
  }, [props.isActive]);

  useEffect(() => {
    if (props.torchOn == true) {
      DBR.switchTorch("on");
    }else if (props.torchOn == false){
      DBR.switchTorch("off");
    }
  }, [props.torchOn]);

  return (
    <div></div>
  );
};

export default QRCodeScanner;
