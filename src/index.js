import { NativeModules } from 'react-native';

const { ThermalPrinterModule } = NativeModules;

let defaultConfig = {
  macAddress: '',
  ip: '192.168.1.168',
  port: 9100,
  payload: '',
  autoCut: true,
  openCashbox: false,
  mmFeedPaper: 20,
  printerDpi: 203,
  printerWidthMM: 80,
  printerNbrCharactersPerLine: 42,
  timeout: 30000,
  encoding: 'UTF-8',
  charsetId: 0,
};

const getConfig = (args) => {
  return Object.assign({}, defaultConfig, args);
};

const printTcp = async (args) => {
  const {
    ip,
    port,
    payload,
    autoCut,
    openCashbox,
    mmFeedPaper,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    timeout,
    encoding,
    charsetId,
  } = getConfig(args);

  await ThermalPrinterModule.printTcp(
    ip,
    port,
    payload,
    autoCut,
    openCashbox,
    mmFeedPaper,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    timeout,
    encoding,
    charsetId,
  );
};

const printBluetooth = (args) => {
  const {
    macAddress,
    payload,
    autoCut,
    openCashbox,
    mmFeedPaper,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
  } = getConfig(args);

  return ThermalPrinterModule.printBluetooth(
    macAddress,
    payload,
    autoCut,
    openCashbox,
    mmFeedPaper,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine
  );
};

const getBluetoothDeviceList = () => {
  return ThermalPrinterModule.getBluetoothDeviceList();
};

export default {
  printTcp,
  printBluetooth,
  defaultConfig,
  getBluetoothDeviceList,
};
