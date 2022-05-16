const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext('2d');

const WIDTH = 500;
const HEIGHT = 500;

// timinds
let now = 0;
let then = Date.now();
const fpsInterval = 1000 / 20;

// draw constants
const center = {
  x: WIDTH * 0.5,
  y: HEIGHT * 0.5,
};
const radius = WIDTH * 0.25;
const amplitude = 1;

let offset = 0;
let offsetSpeed = 0.02;


const draw = () => {
  // calc elapsed time since last loop

  now = Date.now();
  const elapsed = now - then;

  // limit the framerate
  if (window.analyser && elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    window.analyser.getByteTimeDomainData(dataArray);

    // subtle fade out, this should be frame rate dependent, not absolute
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.globalAlpha = 1.0;

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(255, 255, 255)';


    // rotate the circle to reduce boredom
    offset = offset + (elapsed * offsetSpeed)

    // circle step
    const step = (Math.PI) / (window.bufferLength);

    ctx.beginPath();
    for (let i = 0; i < window.bufferLength * 2; i++) {

      // draw two half circles, the second half sample the audio backwards
      // otherwise the circle would result with a gap between the first and last sample
      let k = i;
      if (i >= window.bufferLength) {
        k = window.bufferLength - (i % window.bufferLength);
        debugger;
      }
      const sAmp = dataArray[k] / 128.0 * amplitude;

      // draw
      if (i === 0) {
        ctx.moveTo(
          center.x + (Math.sin((i * step) + offset) * radius * sAmp),
          center.y + (Math.cos((i * step) + offset) * radius * sAmp)
        );
      } else {
        ctx.lineTo(
          center.x + (Math.sin((i * step) + offset) * radius * sAmp),
          center.y + (Math.cos((i * step) + offset) * radius * sAmp)
        );
      }
    }

    // close the circle
    const v = dataArray[0] / 128.0 * amplitude;
    ctx.lineTo(
      center.x + (Math.sin(offset) * radius * v),
      center.y + (Math.cos(offset) * radius * v)
    );

    ctx.stroke();

  }
  
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);