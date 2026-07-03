import { wooting60heplus,keyboard } from './keyboard';
import {RequestDeviceIfNeeded, SetAnalogsenseCallback} from './AnalogsenseHandler';
import { CaliculatePressure, SetPressureCallback } from './calcPressure';

const title = document.createElement('h1');
title.textContent = 'KEPS - Keystroke Estimation of Pressure System';
document.body.appendChild(title);



const app = document.getElementById('app') as HTMLElement;
if(!app)
{
  throw new Error("appが見つかりませんでした．");
}




const KeyboardUI = document.createElement('div');
KeyboardUI.id = 'keyboard-ui';
app.appendChild(KeyboardUI);


const updateKeyValue = keyboard(KeyboardUI, wooting60heplus);

const requestDeviceButton = document.createElement('button');
requestDeviceButton.textContent = 'Connect AnalogKeyboard';
requestDeviceButton.id = 'request-device-button';
app.appendChild(requestDeviceButton);
RequestDeviceIfNeeded(requestDeviceButton);



SetAnalogsenseCallback((inputs: string[]) => {
    for (const input of inputs) {
        const [code, valueStr] = input.split(':');
        const value = parseFloat(valueStr);
        //console.log(`Received input: code=${code}, value=${value}`);
        CaliculatePressure(code, value);

    }
});


const logbox = document.createElement('div');
logbox.id = 'logbox';
logbox.style.width = '100%';
logbox.style.aspectRatio = '16/9';
logbox.style.overflowY = 'scroll';
logbox.style.backgroundColor = '#f0f0f0';

app.appendChild(logbox);

let PressureMultiplier = 0.1; 
SetPressureCallback((code: string, value: number) => {
    updateKeyValue(code, value*PressureMultiplier);
    logbox.innerHTML += `Key ${code} pressed with force ${value}N<br>`;
    setTimeout(() => {
        updateKeyValue(code, 0);
    }, 1000);
});







