# Prerequisites

The Playa works with WebAudio leveraging on [Howler](https://github.com/goldfire/howler.js) using a technique called [Audio Sprites](https://howlerjs.com/#sprite), this ensure that the audio can be reproduced on devices that can't reproduce more than one file simultaneously.
This technique is similar to its Computer Graphic counterpart, a single file contains multiple tracks and metadata describe when a track begins and its lenght.

# Prepare audio for The Playa

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

The script will output directly in audio/ folder some sound files in different formats, and a json file.

The conversion script will recursively traverse all files and folders in the passed path, this permits to keep audio sprites samples well organized, for example my folder is organized this way:

```
SAMPLESWAP
  |-BASS_LOOPS
  |   |-sample1_BASS_.wav
  |   |-sample2_BASS_.aif
  |   |-...
  |-DRUM_LOOPS_and_BREAKS
  |   |-sample1_DRUM_.aif
  |   |-sample2_DRUM_.wav
  |   |-...
```

When I convert files I execute this command:

```
./convertAudio.sh ./SAMPLESWAP the-playa-demo
```

### Naming convention

The player does not know your folder structure, to keep audio samples organized in multitrack is necessary to define tags in `config.json` file and use those tags to name your samples, this example uses `_BASS_` and `_DRUM_`, check `config.json` and samples in `SAMPLESWAP` to understand better what's going on.

Is possible to add more tags to `config.json` in order to add new tracks to multitrack player The Playa.

# Use The Playa on your local machine

Clone or download this repository.

The software is intentionally kept as simple as possible.

Open a Terminal, navigate to project folder, launch a webserver and visit it from a browser.

For example from a Mac is possible to launch a webserver with this command:

```
python -m SimpleHTTPServer 8080
```

Then visit `http://localhost:8080` from your browser.
