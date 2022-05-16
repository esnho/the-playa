let sound; // this will be the howler instance
const nowplaying = document.getElementById("nowplaying");
let config = {};
let instruments = {};

window.onload = () => letsbegin();
function letsbegin() {
  getSprites().then((audioSprites) => {
    console.log("audioSprites", audioSprites)
    addSoundsToList(audioSprites);
    console.log("instruments", instruments);
    setupGUI(audioSprites);
    sound = new Howl(audioSprites);
    console.log("sound", sound);
    sound.autoSuspend = false;
    play = true;
    document.getElementById("stop-button").onclick = () => {
      sound.stop();
      play = false;
    }

    window.analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(analyser);

    analyser.fftSize = 1024;
    window.bufferLength = analyser.frequencyBinCount;
    window.dataArray = new Uint8Array(window.bufferLength);

    document.getElementById("play-button").onclick = () => {
      let time = 0;
      let firstTime = true;
      let bid = undefined;
      let did = undefined;

      play = true;

      const loop = () => {
        if (!play) return;
        const curtime = window.performance.now();
        if (curtime - time < config.spriteLenghtMS && !firstTime) {
          // nuttin
        } else {
          firstTime = false;
          time = window.performance.now();
          const nowPlaying = [];
          for (let instrumentName in instruments) {
            const instrument = instruments[instrumentName];
            console.log(instrument);
            const newInstrumentID = Math.ceil(Math.random() * instrument.name.length - 1);
            const newInstrumentName = instrument.name[newInstrumentID];
            if (instrument.playID !== undefined) {
              sound.stop(instrument.playID);
            }
            instrument.playID = sound.play(newInstrumentName);
            nowPlaying.push(newInstrumentName);
            document.getElementById(instrumentName).childNodes.forEach((title) => {
              if (nowPlaying.includes(title.id)) {
                title.style.color = "red";
              } else {
                title.style.color = "black";
              }
            });
          }
          console.log("nowPlaying", JSON.stringify(nowPlaying));
        }
        window.requestAnimationFrame(loop);
      }
      loop();
    }
  });
}

function getSprites() {
  return fetch(window.location.href + "/config.json")
    .then((body) => {
      return body.json();
    })
    .then((json) => {
      config = json;
      return fetch(window.location.href + "/" + config.filename);
    })
    .then((body) => {
      return body.json();
    })
}

function addSoundsToList(audioSprites) {
  for (let soundName in audioSprites.sprite) {
    for (let instrument of config.instruments) {
      if (soundName.indexOf(instrument) >= 0) {
        if (!instruments[instrument]) {
          instruments[instrument] = { playID: undefined, name: [] };
        }
        instruments[instrument].name.push(soundName);
      }
    }
  }
}

function setupGUI(audioSprites) {
  for (let soundName in audioSprites.sprite) {
    const title = document.createElement("p");
    title.id = soundName;
    title.innerHTML = soundName;
    for (let instrument of config.instruments) {
      if (soundName.indexOf(instrument) >= 0) {
        let instrumentContainer = document.getElementById(instrument);
        if (!instrumentContainer) {
          instrumentContainer = document.createElement('div');
          instrumentContainer.id = instrument;
          const instrumentTitle = document.createElement('h2');
          instrumentTitle.innerHTML = instrument;
          instrumentContainer.appendChild(instrumentTitle);
          nowplaying.appendChild(instrumentContainer);
        }
        instrumentContainer.appendChild(title);
      }
    }
  }
}