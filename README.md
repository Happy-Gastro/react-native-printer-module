# React Native Printer BL and IP printer module
[![react-native-notification-badge](https://badge.fury.io/js/%40happy-gastro%2Freact-native-printer-module.svg)](https://badge.fury.io/js/%40happy-gastro%2Fversion-manager)
[![GitHub követők](https://img.shields.io/github/followers/Happy-Gastro.svg?style=social&label=Follow&maxAge=259000)](https://github.com/Happy-Gastro?tab=followers)

Native bridge for thermal printer, forked from `react-native-thermal-printer` with additional features.

## Description

This module provides a bridge for printing on thermal printers using React Native. It supports both network and Bluetooth printing. We must added some editing into Java files to work well with Bluetooth and Hungarian characters and we will add some other features soon.

### Android Only (Working on iOS)

This module bridges the following library:
[https://github.com/DantSu/ESCPOS-ThermalPrinter-Android/tree/3.0.1](https://github.com/DantSu/ESCPOS-ThermalPrinter-Android/tree/3.0.1)

## Installation

```sh
npm @happy-gastro/install react-native-printer-module
```

or

```sh
yarn add @happy-gastro/react-native-printer-module
```

### Android Manifest Configuration

Ensure the following permissions are added to `android/app/src/main/AndroidManifest.xml`:

**For network printing:**

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

**For Bluetooth printing:**

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

## Usage

### Import the Module

```js
import PrinterModule from 'react-native-printer-module';
```

### Set Default Configuration

```js
PrinterModule.defaultConfig.ip = '192.168.100.246';
PrinterModule.defaultConfig.port = 9100;
PrinterModule.defaultConfig.autoCut = false;
PrinterModule.defaultConfig.timeout = 30000; // in milliseconds
```

or

```js
PrinterModule.defaultConfig = {
  ...PrinterModule.defaultConfig,
  ip: '192.168.100.246',
  port: 9100,
  autoCut: false,
  timeout: 30000, // in milliseconds
};
```

### Sending a Print Job

```js
// Inside an async function
try {
  await PrinterModule.printTcp({ payload: 'Hello, world!' });
} catch (err) {
  console.log(err.message);
}
```

You can also specify the configuration for each call:

```js
// Inside an async function
try {
  await PrinterModule.printTcp({
    ip: '192.168.100.246',
    port: 9100,
    payload: 'Hello, world!',
    printerWidthMM: 50,
    timeout: 30000,
  });

  await PrinterModule.printTcp({
    ip: '192.168.100.247',
    port: 9100,
    payload: 'Hello, world!',
    autoCut: false,
    timeout: 30000,
  });
} catch (err) {
  console.log(err.message);
}
```

#### Bluetooth Printing

Pair your Bluetooth device and use the `printBluetooth` method. The configurations remain the same.

```js
// Inside an async function
try {
  await PrinterModule.printBluetooth({
    payload: 'Hello, world!',
    printerNbrCharactersPerLine: 38,
  });
} catch (err) {
  console.log(err.message);
}
```

## Methods

Supports both network and Bluetooth printing.

| Method         | Parameter | Parameter Type                                                         | Default         |
| -------------- | --------- | ---------------------------------------------------------------------- | --------------- |
| printTcp       | `config`  | `Partial<PrintTcpInterface> & Pick<PrinterInterface, 'payload'>`       | `defaultConfig` |
| printBluetooth | `config`  | `Partial<PrintBluetoothInterface> & Pick<PrinterInterface, 'payload'>` | `defaultConfig` |

## Interfaces and Configurations

```js
// Default parameters
function PrinterInterface(payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine) {
  this.payload = payload;
  this.autoCut = autoCut;
  this.openCashbox = openCashbox;
  this.mmFeedPaper = mmFeedPaper;
  this.printerDpi = printerDpi;
  this.printerWidthMM = printerWidthMM;
  this.printerNbrCharactersPerLine = printerNbrCharactersPerLine;
}

// Printing on TCP / IP printers
function PrintTcpInterface(ip, port, timeout, payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine) {
  PrinterInterface.call(this, payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine);
  this.ip = ip;
  this.port = port;
  this.timeout = timeout;
}

// Printing to Bluetooth printers
function PrintBluetoothInterface(macAddress, payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine) {
  PrinterInterface.call(this, payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine);
  this.macAddress = macAddress;
}


```

### Default Configuration

```js
const defaultConfig = {
  ip: '192.168.1.121',
  port: 9100,
  payload: '',
  autoCut: true,
  openCashbox: false,
  mmFeedPaper: 20,
  printerDpi: 203,
  printerWidthMM: 80,
  printerNbrCharactersPerLine: 42,
  timeout: 30000,
};


```

### Available Config Options

| Name                        | Type      | Default         | Description                      |
| --------------------------- | --------- |-----------------| -------------------------------- |
| ip                          | `string`  | `192.168.1.121` | Printer IP address               |
| port                        | `number`  | `9100`          | Printer port                     |
| payload                     | `string`  | \`\`            | Text sent to the printer         |
| autoCut                     | `boolean` | `true`          | Automatically cut the paper      |
| openCashbox                 | `boolean` | `false`         | Open cashbox after printing      |
| mmFeedPaper                 | `number`  | `20`            | Paper feed in millimeters        |
| printerDpi                  | `number`  | `203`           | Printer DPI                      |
| printerWidthMM              | `number`  | `80`            | Printing width in millimeters    |
| printerNbrCharactersPerLine | `number`  | `42`            | Maximum characters per line      |
| timeout                     | `number`  | `30000`         | Timeout duration in milliseconds |

### Example

```js
const text =
  '[C]<img>https://via.placeholder.com/300.jpg</img>\n' +
  '[L]\n' +
  "[C]<u><font size='big'>ORDER #316-235</font></u>\n" +
  '[L]\n' +
  '[C]================================\n' +
  '[L]\n' +
  '[L]<b>PRODUCT NAME</b>[R]9.99€\n' +
  '[C]--------------------------------\n' +
  '[R]TOTAL PRICE :[R]34.98€\n' +
  '[R]TAX :[R]4.23€\n' +
  '[C]================================\n' +
  '[C]Thank You for beeing Our customer:\n' +
  '[C]Happy Solutions\n' +
  '[C]www.happysolutions.hu\n\n' +
  '[C]<barcode type="ean13" height="10">831254784551</barcode>\n' +
  '[C]<qrcode size="20">http://example.com/</qrcode>\n';
```

## Tested Devices

- Epson Printers
- Bixolon Printers
- SunMe Devices inner printers
- iMin Devices inner printers
- No-name Bluetooth printers
- Zywell
- VSC
- EPPOS

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# Author

This project is maintained by Farkas Ferenc.

- **Name**: Farkas Ferenc
- **Email**: [ferenc.farkas@happygastro.hu](mailto:ferenc.farkas@happygastro.hu)
- **Website**: [www.happysolutions.hu](http://www.happygastro.hu)

## Company

Happy Gastro Ltd.

## License
[MIT](https://choosealicense.com/licenses/mit/)
