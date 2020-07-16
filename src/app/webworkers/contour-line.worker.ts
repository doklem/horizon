/// <reference lib="webworker" />

import { ContourLineWorkerLogic } from './contour-line-worker-logic';

const logic = new ContourLineWorkerLogic();

addEventListener('message', ({ data }) => {
  postMessage(logic.generateContourLine(data));
});
