# Prerequisites

The Playa works with WebAudio leveraging on [Howler](https://github.com/goldfire/howler.js) using a technique called [Audio Sprites](https://howlerjs.com/#sprite), this ensure that the audio can be reproduced on devices that can't reproduce more than one file simultaneously.
This technique is similar to its Computer Graphic counterpart, a single file contains multiple tracks and metadata describe when a track begins and its lenght.

## Prepare audio for The Playa

To prepare an audio track that can be reproduced as sprite is necessary some assistance, the project contains a script (only Mac and Linux) that use [Audiosprite](https://github.com/tonistiigi/audiosprite) to compose tracks in a single file and saves its metadata. Audiosprite uses ffmpeg and convert the audio track in multiple formats to ensure compatibility across many devices and browsers.

Before using the script is necessary to install Audiosprite, on Mac open a terminal and execute these commands:

```
brew install ffmpeg
```
```
npm install -g audiosprite
```

### Execute the script!

Now you'll be able to run `convertAudio.sh` and convert folders and folders of samples into sprites.

```
./convertAudio.sh ./path/to/your/audio/files/ theNameOfYourOutput
```

The script will output audio in different formats and a json file.

Copy these files in ./audio folder of the project.

