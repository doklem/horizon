/// <reference lib="webworker" />

import { FrameWorkerLogic } from './frame-worker-logic';

const logic = new FrameWorkerLogic();

addEventListener('message', ({ data }) => {
  postMessage(logic.generateContourLine(data));
});
