"""Rebuild the original Small Hours spoken-word track. Requires espeak-ng and ffmpeg.
No sampled recording or third-party composition. Cue starts align to voice onsets.
"""
import json
import math
from pathlib import Path
import subprocess
import tempfile
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
LINES = [
    'The city settles into blue',
    'A little light comes drifting through',
    'We take the long way home tonight',
    'And keep the quiet in our sight',
    'The pages turn, the music stays',
    'A silver thread through busy days',
    'Wherever all our footsteps go',
    'The words will follow, soft and slow',
] * 2
RATE = 22050
DURATION = 68
music = np.zeros(RATE * DURATION)
# Original sparse arpeggio and warm sine pad, with no samples.
chords = [(130.81, 164.81, 196), (110, 130.81, 164.81), (87.31, 110, 130.81), (98, 123.47, 146.83)]
for beat in range(102):
    start = int(beat * 2 / 3 * RATE)
    chord = chords[(beat // 6) % 4]
    t = np.arange(min(RATE * 2, len(music) - start)) / RATE
    freq = chord[beat % 3] * 2
    note = (np.sin(2 * math.pi * freq * t) + .2 * np.sin(4 * math.pi * freq * t)) * np.exp(-t * 3) * .055
    note *= np.minimum(t * 70, 1)
    music[start:start + len(t)] += note
for bar in range(17):
    start = bar * 4 * RATE
    t = np.arange(min(RATE * 5, len(music) - start)) / RATE
    envelope = np.minimum(t * 2, 1) * np.minimum((len(t) / RATE - t) * 2, 1)
    pad = sum(np.sin(2 * math.pi * f * t) for f in chords[bar % 4]) * .018 * envelope
    music[start:start + len(t)] += pad
cues = [{'time': 0, 'text': '♪ Small Hours · instrumental intro'}]
with tempfile.TemporaryDirectory() as tmp:
    for index, line in enumerate(LINES):
        voice = Path(tmp) / 'voice.wav'
        subprocess.run(['espeak-ng', '-v', 'en-us', '-s', '162', '-p', '36', '-w', str(voice), line], check=True)
        with wave.open(str(voice)) as wav:
            assert wav.getframerate() == RATE
            samples = np.frombuffer(wav.readframes(wav.getnframes()), dtype='<i2').astype(float) / 32768
        onset = np.flatnonzero(np.abs(samples) > .008)[0]
        samples = samples[onset:]
        time = 2 + index * 4
        start = time * RATE
        music[start:start + len(samples)] += samples * .85
        cues.append({'time': time, 'text': line})
    cues.append({'time': 66, 'text': '♪ Small Hours · instrumental outro'})
    music *= np.minimum(np.arange(len(music)) / RATE * 2, 1)
    music *= np.minimum((DURATION - np.arange(len(music)) / RATE) / 2, 1)
    music /= max(1, np.max(np.abs(music)) / .9)
    target = Path(tmp) / 'mix.wav'
    with wave.open(str(target), 'wb') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(RATE)
        wav.writeframes((music * 32767).astype('<i2').tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(target), '-codec:a', 'libmp3lame', '-b:a', '96k', str(ROOT / 'public/demo/small-hours.mp3')], check=True)
(ROOT / 'src/content/demo-cues.json').write_text(json.dumps(cues, indent=2) + '\n')
lrc = '[ti:Small Hours]\n[ar:Floating Lyrics prototype]\n'
for cue in cues:
    m, s = divmod(cue['time'], 60)
    lrc += f"[{m:02d}:{s:02d}.000]{cue['text']}\n"
(ROOT / 'public/demo/small-hours.lrc').write_text(lrc)
