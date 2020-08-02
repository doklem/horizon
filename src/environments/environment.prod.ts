import { DayTimeAnimationModel } from 'src/app/models/day-time-animation-model';

export const environment = {
  animations: {
    contourLineBack: [
      new DayTimeAnimationModel('fill', '06:00', '03:00', '#292a4b;#78c4cd'),
      new DayTimeAnimationModel('fill', '15:00', '03:00', '#78c4cd;#292a4b')
    ],
    contourLineFront: [
      new DayTimeAnimationModel('fill', '06:00', '03:00', '#0a0c32;#319540'),
      new DayTimeAnimationModel('fill', '15:00', '03:00', '#319540;#0a0c32')
    ],
    contourLineMiddle: [
      new DayTimeAnimationModel('fill', '06:00', '03:00', '#1e1f42;#4fa97c'),
      new DayTimeAnimationModel('fill', '15:00', '03:00', '#4fa97c;#1e1f42')
    ],
    corona: [
      new DayTimeAnimationModel('stop-color', '03:00', '03:00', '#692752;#c9e9f6'),
      new DayTimeAnimationModel('stop-color', '14:00', '03:30', '#c9e9f6;#ffe373;#692752')
    ],
    sky: [
      new DayTimeAnimationModel('fill', '06:00', '03:00', '#313251;#87ceeb'),
      new DayTimeAnimationModel('fill', '15:00', '03:00', '#87ceeb;#313251')
    ],
    stars: [
      new DayTimeAnimationModel('opacity', '04:30', '03:00', '1;0'),
      new DayTimeAnimationModel('opacity', '15:30', '03:00', '0;1')
    ],
    sun: [
      new DayTimeAnimationModel('stop-color', '14:00', '05:00', 'white;#ffb200;#ff7300', false)
    ],
    waterAlbedo: [
      new DayTimeAnimationModel('fill', '06:00', '03:00', '#05061a;#0077be'),
      new DayTimeAnimationModel('fill', '15:00', '03:00', '#0077be;#05061a')
    ]
  },
  contourLineSpeed: 0.025,
  production: true,
  renderHeight: 1080,
  renderWidth: 1920,
  sunCycleInSeconds: 60
};
