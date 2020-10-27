import { transition, style, animate } from '@angular/animations';

export const fadeOut = [
  transition(':leave', [
    style({ opacity: '1', zIndex: 500 }),
    animate('225ms ease-out', style({ opacity: '0', zIndex: 500 })),
  ]),
];
