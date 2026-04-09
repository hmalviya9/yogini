import { useState, useRef, useCallback, useEffect } from "react";
import { Eye, Play, Pause, Volume2, VolumeX, Moon, Sun, Zap, X } from "lucide-react";

const KALA_DB = [
  { no:1, yogini:"Kali", bhairava:"Mahakala Bhairava", fn:"Time & Transformation", mantra:"Om Kali Nitya Swaha", bMantra:"Om Mahakala Bhairavaya Namah" },
  { no:2, yogini:"Kapalini", bhairava:"Kalabhairava", fn:"Mastery over ego", mantra:"Om Kapalini Swaha", bMantra:"Om Kalabhairavaya Namah" },
  { no:3, yogini:"Kula Devi", bhairava:"Nilkantha Bhairava", fn:"Lineage Protection", mantra:"Om Kula Devi Swaha", bMantra:"Om Nilkanthaya Namah" },
  { no:4, yogini:"Kurukulla", bhairava:"Rasanatha Bhairava", fn:"Magnetism/Attraction", mantra:"Om Kurukulla Swaha", bMantra:"Om Rasanathaya Namah" },
  { no:5, yogini:"Virodhini", bhairava:"Vishalaksha Bhairava", fn:"Removing opposition", mantra:"Om Virodhini Swaha", bMantra:"Om Vishalakshaya Namah" },
  { no:6, yogini:"Viprachitta", bhairava:"Bhishana Bhairava", fn:"Supreme Intuition", mantra:"Om Viprachitta Swaha", bMantra:"Om Bhishanaya Namah" },
  { no:7, yogini:"Ugra Rakta", bhairava:"Shuddhapada Bhairava", fn:"Protective Fury", mantra:"Om Ugra Rakta Swaha", bMantra:"Om Shuddhapadhaya Namah" },
  { no:8, yogini:"Ugraprabha", bhairava:"Vishvamata Bhairava", fn:"Radiance/Authority", mantra:"Om Ugraprabha Swaha", bMantra:"Om Vishvamataya Namah" },
  { no:9, yogini:"Deepa Mukta", bhairava:"Darpana Bhairava", fn:"Enlightenment", mantra:"Om Deepa Mukta Swaha", bMantra:"Om Darpanaya Namah" },
  { no:10, yogini:"Neela Bhukti", bhairava:"Panchanana Bhairava", fn:"Sensory mastery", mantra:"Om Neela Bhukti Swaha", bMantra:"Om Panchananaya Namah" },
  { no:11, yogini:"Ghana Swarupa", bhairava:"Bhimalochana", fn:"Sound/Vibration", mantra:"Om Ghana Swarupa Swaha", bMantra:"Om Bhimalochanaya Namah" },
  { no:12, yogini:"Kamakshi", bhairava:"Maheshvara Bhairava", fn:"Fulfilling Desires", mantra:"Om Kamakshi Swaha", bMantra:"Om Maheshvaraya Namah" },
  { no:13, yogini:"Ananda", bhairava:"Vyomakesha Bhairava", fn:"Spiritual Bliss", mantra:"Om Jnaneshvari Swaha", bMantra:"Om Anandaya Namah" },
  { no:14, yogini:"Bhagamalini", bhairava:"Tumburu Bhairava", fn:"Creation/Fertility", mantra:"Om Bhagamalini Swaha", bMantra:"Om Tumburave Namah" },
  { no:15, yogini:"Tripura Sundari", bhairava:"Bherunda Bhairava", fn:"Beauty/Harmony", mantra:"Om Tripura Sundari Swaha", bMantra:"Om Bherundaya Namah" },
  { no:16, yogini:"Chinnamasta", bhairava:"Tripuranta Bhairava", fn:"Self-transcendence", mantra:"Om Chinnamasta Swaha", bMantra:"Om Tripurantakaya Namah" },
  { no:17, yogini:"Nitya", bhairava:"Rudra Bhairava", fn:"Eternal Presence", mantra:"Om Nitya Swaha", bMantra:"Om Rudraya Namah" },
  { no:18, yogini:"Nirriti", bhairava:"Brahmashirasa", fn:"Stability/Foundation", mantra:"Om Nirriti Swaha", bMantra:"Om Brahmashirasaya Namah" },
  { no:19, yogini:"Bhadra", bhairava:"Durvasana Bhairava", fn:"Auspiciousness", mantra:"Om Bhadra Swaha", bMantra:"Om Durvasanaya Namah" },
  { no:20, yogini:"Mahakali", bhairava:"Krodhisha Bhairava", fn:"Dissolution of Sin", mantra:"Om Mahakali Swaha", bMantra:"Om Krodhishaya Namah" },
  { no:21, yogini:"Bhavani", bhairava:"Vyomakesha Bhairava", fn:"Life Force", mantra:"Om Bhavani Swaha", bMantra:"Om Vyomakeshaya Namah" },
  { no:22, yogini:"Aparajita", bhairava:"Jvalanpuri Bhairava", fn:"Invincibility", mantra:"Om Aparajita Swaha", bMantra:"Om Jvalanpuraye Namah" },
  { no:23, yogini:"Maheshvari", bhairava:"Bhairavi Bhairava", fn:"Wisdom/Power", mantra:"Om Maheshvari Swaha", bMantra:"Om Bhairavaya Namah" },
  { no:24, yogini:"Yogeshvari", bhairava:"Kshitinashana", fn:"Union/Yoga", mantra:"Om Yogeshvari Swaha", bMantra:"Om Kshitinashanaya Namah" },
  { no:25, yogini:"Panchami", bhairava:"Vamadeva Bhairava", fn:"Harmony/Elements", mantra:"Om Panchami Swaha", bMantra:"Om Vamadevaya Namah" },
  { no:26, yogini:"Bhageshvari", bhairava:"Ishana Bhairava", fn:"Mastery over Destiny", mantra:"Om Bhageshvari Swaha", bMantra:"Om Ishanaya Namah" },
  { no:27, yogini:"Rakteshvari", bhairava:"Ugrachanda Bhairava", fn:"Vitality", mantra:"Om Rakteshvari Swaha", bMantra:"Om Ugrachandaya Namah" },
  { no:28, yogini:"Siddheshvari", bhairava:"Chhagalanda Bhairava", fn:"Achievement/Siddhi", mantra:"Om Siddheshvari Swaha", bMantra:"Om Chhagalandaya Namah" },
  { no:29, yogini:"Pitheshvari", bhairava:"Rakshasa Bhairava", fn:"Sacred Spaces", mantra:"Om Pitheshvari Swaha", bMantra:"Om Rakshasaya Namah" },
  { no:30, yogini:"Shriparni", bhairava:"Mahadeva Bhairava", fn:"Prosperity", mantra:"Om Shriparni Swaha", bMantra:"Om Mahadevaya Namah" },
  { no:31, yogini:"Parnashavari", bhairava:"Bhutapati Bhairava", fn:"Natural Healing", mantra:"Om Parnashavari Swaha", bMantra:"Om Bhutapataye Namah" },
  { no:32, yogini:"Balabhadra", bhairava:"Kamadeva Bhairava", fn:"Strength", mantra:"Om Balabhadra Swaha", bMantra:"Om Kamadevaya Namah" },
  { no:33, yogini:"Sureshvari", bhairava:"Aghora Bhairava", fn:"Divine Authority", mantra:"Om Sureshvari Swaha", bMantra:"Om Aghoraya Namah" },
  { no:34, yogini:"Ajita", bhairava:"Kalabhairava", fn:"Victory", mantra:"Om Ajita Swaha", bMantra:"Om Kalabhairavaya Namah" },
  { no:35, yogini:"Durga", bhairava:"Vishalaksha Bhairava", fn:"Protection", mantra:"Om Durga Swaha", bMantra:"Om Vishalakshaya Namah" },
  { no:36, yogini:"Ambika", bhairava:"Bhishana Bhairava", fn:"Nurturing/Motherly", mantra:"Om Ambika Swaha", bMantra:"Om Bhishanaya Namah" },
  { no:37, yogini:"Bhutamata", bhairava:"Shuddhapada Bhairava", fn:"Mastery of Elements", mantra:"Om Bhutamata Swaha", bMantra:"Om Shuddhapadhaya Namah" },
  { no:38, yogini:"Karali", bhairava:"Bhringi Bhairava", fn:"Fierce Protection", mantra:"Om Karali Swaha", bMantra:"Om Bhringaye Namah" },
  { no:39, yogini:"Virabhadra", bhairava:"Kalagni Bhairava", fn:"Heroic Courage", mantra:"Om Virabhadra Swaha", bMantra:"Om Kalagnaye Namah" },
  { no:40, yogini:"Sharika", bhairava:"Bhutadhya Bhairava", fn:"Clear Speech", mantra:"Om Sharika Swaha", bMantra:"Om Bhutadhyaya Namah" },
  { no:41, yogini:"Vikarali", bhairava:"Hamsavahana", fn:"Destruction of Fear", mantra:"Om Vikarali Swaha", bMantra:"Om Hamsavahanaya Namah" },
  { no:42, yogini:"Yamaduti", bhairava:"Dhurjati Bhairava", fn:"Judgment/Endings", mantra:"Om Yamaduti Swaha", bMantra:"Om Dhurjataye Namah" },
  { no:43, yogini:"Kaushiki", bhairava:"Kshipra Bhairava", fn:"Intuition", mantra:"Om Kaushiki Swaha", bMantra:"Om Kshipraya Namah" },
  { no:44, yogini:"Bhakshini", bhairava:"Darpana Bhairava", fn:"Consuming Negativity", mantra:"Om Bhakshini Swaha", bMantra:"Om Darpanaya Namah" },
  { no:45, yogini:"Yakshi", bhairava:"Vishvamata Bhairava", fn:"Material Riches", mantra:"Om Yaksi Swaha", bMantra:"Om Vishvamataya Namah" },
  { no:46, yogini:"Kaumari", bhairava:"Panchanana Bhairava", fn:"Youthful Energy", mantra:"Om Kaumari Swaha", bMantra:"Om Panchananaya Namah" },
  { no:47, yogini:"Yantravahini", bhairava:"Bhimalochana", fn:"Mechanical Mastery", mantra:"Om Yantravahini Swaha", bMantra:"Om Bhimalochanaya Namah" },
  { no:48, yogini:"Vishala", bhairava:"Maheshvara Bhairava", fn:"Expansion", mantra:"Om Vishala Swaha", bMantra:"Om Maheshvaraya Namah" },
  { no:49, yogini:"Kamuki", bhairava:"Vyomakesha Bhairava", fn:"Passion", mantra:"Om Kamuki Swaha", bMantra:"Om Vyomakeshaya Namah" },
  { no:50, yogini:"Vyaghri", bhairava:"Tumburu Bhairava", fn:"Ferocity", mantra:"Om Vyaghri Swaha", bMantra:"Om Tumburave Namah" },
  { no:51, yogini:"Yakshini", bhairava:"Bherunda Bhairava", fn:"Hidden Treasures", mantra:"Om Yakshini Swaha", bMantra:"Om Bherundaya Namah" },
  { no:52, yogini:"Pretabhusani", bhairava:"Tripuranta Bhairava", fn:"Death Mastery", mantra:"Om Pretabhusani Swaha", bMantra:"Om Tripurantakaya Namah" },
  { no:53, yogini:"Durjata", bhairava:"Rudra Bhairava", fn:"Endurance", mantra:"Om Durjata Swaha", bMantra:"Om Rudraya Namah" },
  { no:54, yogini:"Vikata", bhairava:"Brahmashirasa", fn:"Humor/Distortion", mantra:"Om Vikata Swaha", bMantra:"Om Brahmashirasaya Namah" },
  { no:55, yogini:"Ghora", bhairava:"Durvasana Bhairava", fn:"Intensity", mantra:"Om Ghora Swaha", bMantra:"Om Durvasanaya Namah" },
  { no:56, yogini:"Kapali", bhairava:"Krodhisha Bhairava", fn:"Ego-death", mantra:"Om Kapali Swaha", bMantra:"Om Krodhishaya Namah" },
  { no:57, yogini:"Vishalagni", bhairava:"Vyomakesha Bhairava", fn:"Purification", mantra:"Om Vishalagni Swaha", bMantra:"Om Vyomakeshaya Namah" },
  { no:58, yogini:"Kaalagni", bhairava:"Jvalanpuri Bhairava", fn:"Time-Fire", mantra:"Om Kalagni Swaha", bMantra:"Om Jvalanpuraye Namah" },
  { no:59, yogini:"Mohini", bhairava:"Bhairavi Bhairava", fn:"Enchantment", mantra:"Om Mohini Swaha", bMantra:"Om Bhairavaya Namah" },
  { no:60, yogini:"Chakri", bhairava:"Kshitinashana", fn:"Cosmic Cycle", mantra:"Om Chakri Swaha", bMantra:"Om Kshitinashanaya Namah" },
  { no:61, yogini:"Kankali", bhairava:"Vamadeva Bhairava", fn:"Asceticism", mantra:"Om Kankali Swaha", bMantra:"Om Vamadevaya Namah" },
  { no:62, yogini:"Bhuvaneshwari", bhairava:"Ishana Bhairava", fn:"Space/Cosmos", mantra:"Om Bhuvaneshwari Swaha", bMantra:"Om Ishanaya Namah" },
  { no:63, yogini:"Kundala", bhairava:"Ugrachanda Bhairava", fn:"Circular Energy", mantra:"Om Kundala Swaha", bMantra:"Om Ugrachandaya Namah" },
  { no:64, yogini:"Lakshmi", bhairava:"Chhagalanda Bhairava", fn:"Wealth/Abundance", mantra:"Om Lakshmi Swaha", bMantra:"Om Chhagalandaya Namah" },
];

const MOOD_KEYWORDS = {
  anxious: ["anxious","stressed","worried","nervous","tense","fear","panic","overwhelmed","restless"],
  uninspired: ["bored","stuck","uninspired","blocked","empty","flat","dull","unmotivated","lost"],
  angry: ["angry","frustrated","furious","rage","irritated","annoyed","mad"],
  sad: ["sad","depressed","lonely","grief","heartbroken","down","low","melancholy"],
  seeking: ["curious","searching","seeking","exploring","wondering","questioning"],
};

const INTENT_KEYWORDS = {
  focus: ["focus","concentrate","study","work","productivity","deep work","attention"],
  create: ["create","build","design","write","compose","imagine","art","music","innovate"],
  heal: ["heal","recover","rest","restore","calm","peace","balance","wellness"],
  protect: ["protect","defend","shield","boundary","safe","guard","strength"],
  manifest: ["manifest","attract","wealth","success","goal","achieve","abundance","money"],
  transform: ["transform","change","grow","evolve","transcend","breakthrough","rebirth"],
};

function analyzeState(text) {
  const lower = text.toLowerCase();
  let best = "neutral", bestScore = 0;
  for (const [mood, words] of Object.entries(MOOD_KEYWORDS)) {
    const score = words.filter(w => lower.includes(w)).length;
    if (score > bestScore) { bestScore = score; best = mood; }
  }
  return best;
}

function matchKala(text) {
  const lower = text.toLowerCase();
  let bestIntent = "focus", bestScore = 0;
  for (const [intent, words] of Object.entries(INTENT_KEYWORDS)) {
    const score = words.filter(w => lower.includes(w)).length;
    if (score > bestScore) { bestScore = score; bestIntent = intent; }
  }
  const intentMap = {
    focus: [1,2,9,10,17,18,25,26],
    create: [3,4,11,12,13,14,15,49],
    heal: [19,21,30,31,36,46,57],
    protect: [5,7,22,35,38,39,41],
    manifest: [4,12,27,28,30,45,51,64],
    transform: [1,16,20,42,52,56,60],
  };
  const indices = intentMap[bestIntent] || [1];
  return indices.map(i => KALA_DB[i - 1]);
}

function optimizeUser(text) {
  const state = analyzeState(text);
  const kalas = matchKala(text);
  let frequency = 396, anchor = "Standard Protocol";
  if (state === "anxious") { anchor = "Bhishana Bhairava"; frequency = 432; }
  else if (state === "uninspired") { anchor = "Asitanga Bhairava"; frequency = 528; }
  else if (state === "angry") { anchor = "Krodhisha Bhairava"; frequency = 174; }
  else if (state === "sad") { anchor = "Vyomakesha Bhairava"; frequency = 396; }
  else if (state === "seeking") { anchor = "Darpana Bhairava"; frequency = 528; }
  return { state, kalas, frequency, anchor };
}

const BHAIRAVA_COLORS = {
  "Mahakala Bhairava":"#d4af37","Kalabhairava":"#a855f7","Nilkantha Bhairava":"#06b6d4",
  "Rasanatha Bhairava":"#f43f5e","Vishalaksha Bhairava":"#22c55e","Bhishana Bhairava":"#ef4444",
  "Shuddhapada Bhairava":"#e2e8f0","Vishvamata Bhairava":"#f59e0b","Darpana Bhairava":"#818cf8",
  "Panchanana Bhairava":"#14b8a6","Bhimalochana":"#fb923c","Maheshvara Bhairava":"#6366f1",
  "Vyomakesha Bhairava":"#8b5cf6","Tumburu Bhairava":"#ec4899","Bherunda Bhairava":"#f97316",
  "Tripuranta Bhairava":"#dc2626","Rudra Bhairava":"#b91c1c","Brahmashirasa":"#fbbf24",
  "Durvasana Bhairava":"#84cc16","Krodhisha Bhairava":"#991b1b","Jvalanpuri Bhairava":"#f97316",
  "Bhairavi Bhairava":"#e11d48","Kshitinashana":"#65a30d","Vamadeva Bhairava":"#2dd4bf",
  "Ishana Bhairava":"#a78bfa","Ugrachanda Bhairava":"#ea580c","Chhagalanda Bhairava":"#ca8a04",
  "Rakshasa Bhairava":"#7f1d1d","Mahadeva Bhairava":"#7c3aed","Bhutapati Bhairava":"#059669",
  "Kamadeva Bhairava":"#f472b6","Aghora Bhairava":"#475569","Bhringi Bhairava":"#c084fc",
  "Kalagni Bhairava":"#dc2626","Bhutadhya Bhairava":"#0ea5e9","Hamsavahana":"#fde68a",
  "Dhurjati Bhairava":"#78716c","Kshipra Bhairava":"#38bdf8",
};

function getCellColor(kala) {
  return BHAIRAVA_COLORS[kala.bhairava] || "#6366f1";
}

// Build layered meditation sound into an AudioContext
function buildSoundGraph(ctx, baseFreq, dest, startTime) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, startTime);
  master.gain.linearRampToValueAtTime(0.18, startTime + 3);
  master.connect(dest);

  // Layer 1: Base tone
  const osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(baseFreq, startTime);
  const g1 = ctx.createGain();
  g1.gain.setValueAtTime(0.5, startTime);
  osc1.connect(g1); g1.connect(master);

  // Layer 2: Binaural offset (+4Hz in mono creates gentle beating)
  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(baseFreq + 4, startTime);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.35, startTime);
  osc2.connect(g2); g2.connect(master);

  // Layer 3: Sub-harmonic drone (octave below)
  const osc3 = ctx.createOscillator();
  osc3.type = "sine";
  osc3.frequency.setValueAtTime(baseFreq / 2, startTime);
  const g3 = ctx.createGain();
  g3.gain.setValueAtTime(0.2, startTime);
  osc3.connect(g3); g3.connect(master);

  // Layer 4: Soft overtone (fifth above)
  const osc4 = ctx.createOscillator();
  osc4.type = "sine";
  osc4.frequency.setValueAtTime(baseFreq * 1.5, startTime);
  const g4 = ctx.createGain();
  g4.gain.setValueAtTime(0.08, startTime);
  osc4.connect(g4); g4.connect(master);

  return { oscs: [osc1, osc2, osc3, osc4], master };
}

// Realtime playback hook
function useFrequencyGenerator() {
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [freq, setFreq] = useState(432);

  const start = useCallback((f) => {
    const targetFreq = f || freq;
    if (nodesRef.current) { nodesRef.current.oscs.forEach(o => { try{o.stop();}catch(e){} }); }
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    const nodes = buildSoundGraph(ctx, targetFreq, ctx.destination, ctx.currentTime);
    nodes.oscs.forEach(o => o.start(ctx.currentTime));
    nodesRef.current = nodes;
    setPlaying(true);
    setFreq(targetFreq);
  }, [freq]);

  const stop = useCallback(() => {
    if (nodesRef.current && ctxRef.current) {
      const ct = ctxRef.current.currentTime;
      nodesRef.current.master.gain.linearRampToValueAtTime(0, ct + 1.5);
      const oscs = nodesRef.current.oscs;
      setTimeout(() => { oscs.forEach(o => { try{o.stop();}catch(e){} }); }, 1800);
      nodesRef.current = null;
    }
    setPlaying(false);
  }, []);

  return { start, stop, playing, freq, setFreq };
}

// Offline render 20-min WAV and trigger download
async function renderAndDownload(baseFreq, modeName, setProgress) {
  const duration = 20 * 60; // 20 minutes
  const sampleRate = 44100;
  const offCtx = new OfflineAudioContext(2, sampleRate * duration, sampleRate);

  // Build the same layered sound graph
  const nodes = buildSoundGraph(offCtx, baseFreq, offCtx.destination, 0);
  // Fade out at the end
  nodes.master.gain.setValueAtTime(0.18, duration - 5);
  nodes.master.gain.linearRampToValueAtTime(0, duration);
  nodes.oscs.forEach(o => { o.start(0); o.stop(duration); });

  setProgress("rendering");
  const buffer = await offCtx.startRendering();
  setProgress("encoding");

  // Encode to WAV
  const numCh = buffer.numberOfChannels;
  const length = buffer.length;
  const dataSize = length * numCh * 2;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  const writeStr = (off, str) => { for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i)); };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numCh, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numCh * 2, true);
  view.setUint16(32, numCh * 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  const channels = [];
  for (let c = 0; c < numCh; c++) channels.push(buffer.getChannelData(c));
  for (let i = 0; i < length; i++) {
    for (let c = 0; c < numCh; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
  }

  const blob = new Blob([arrayBuffer], { type: "audio/wav" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `KalaSync_${modeName}_${baseFreq}Hz_20min.wav`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  setProgress(null);
}

// Tooltip component
function Tooltip({ kala, x, y }) {
  if (!kala) return null;
  const color = getCellColor(kala);
  return (
    <div style={{
      position:"fixed", left: Math.min(x + 12, window.innerWidth - 320), top: Math.max(y - 180, 8),
      width: 300, background:"rgba(10,10,12,0.96)", border:`1px solid ${color}`,
      borderRadius: 8, padding: 16, zIndex: 999, pointerEvents:"none",
      boxShadow:`0 0 24px ${color}40`,
    }}>
      <div style={{color, fontFamily:"'Cinzel', serif", fontSize:16, fontWeight:700, marginBottom:4}}>
        #{kala.no} — {kala.yogini}
      </div>
      <div style={{color:"#94a3b8", fontSize:12, marginBottom:8}}>{kala.bhairava}</div>
      <div style={{color:"#e2e8f0", fontSize:13, marginBottom:6}}>
        <span style={{color:"#d4af37"}}>Function:</span> {kala.fn}
      </div>
      <div style={{color:"#c4b5fd", fontSize:12, fontStyle:"italic", marginBottom:4}}>{kala.mantra}</div>
      <div style={{color:"#94a3b8", fontSize:11, fontStyle:"italic"}}>{kala.bMantra}</div>
    </div>
  );
}

// Protocol mode component
function ProtocolEngine({ result, audio }) {
  const [mode, setMode] = useState("stillness");
  const [timer, setTimer] = useState(1200);
  const [running, setRunning] = useState(false);
  const [dlProgress, setDlProgress] = useState(null);
  const intervalRef = useRef(null);

  const modeFreqs = { stillness: 432, flow: 528, integration: 174 };

  useEffect(() => {
    if (running && timer > 0) {
      intervalRef.current = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(intervalRef.current);
    }
    if (timer <= 0) { setRunning(false); audio.stop(); }
  }, [running, timer]);

  const toggleTimer = () => {
    if (running) { setRunning(false); audio.stop(); }
    else {
      setRunning(true);
      audio.start(modeFreqs[mode]);
    }
  };

  const handleDownload = () => {
    if (dlProgress) return;
    const labels = { stillness: "BhairavaStillness", flow: "YoginiFlow", integration: "SiddhaIntegration" };
    renderAndDownload(modeFreqs[mode], labels[mode], setDlProgress);
  };

  const mins = Math.floor(timer / 60);
  const secs = timer % 60;

  const modeStyles = {
    stillness: { bg:"radial-gradient(circle at 50% 50%, #0f0a1a 0%, #0a0a0c 100%)", label:"Bhairava Stillness", icon:<Moon size={18}/>, desc:"Darkness. 432Hz drone + 4Hz binaural beat. Dissolve into the void.", freq:432 },
    flow: { bg:"radial-gradient(circle at 50% 50%, #1a0a2e 0%, #0a0a0c 100%)", label:"Yogini Flow", icon:<Sun size={18}/>, desc:"528Hz creation frequency + harmonic overtones. Creative fire.", freq:528 },
    integration: { bg:"radial-gradient(circle at 50% 50%, #0a1a1a 0%, #0a0a0c 100%)", label:"Siddha Integration", icon:<Zap size={18}/>, desc:"174Hz foundation tone. Witness effect. Subtle awareness.", freq:174 },
  };

  const m = modeStyles[mode];

  return (
    <div style={{background:m.bg, border:"1px solid #1e1e2e", borderRadius:12, padding:24, marginTop:20}}>
      <div style={{display:"flex", gap:8, marginBottom:16, flexWrap:"wrap"}}>
        {Object.entries(modeStyles).map(([k, v]) => (
          <button key={k} onClick={() => { setMode(k); setTimer(1200); setRunning(false); audio.stop(); }}
            style={{
              flex:1, minWidth:140, padding:"10px 8px", borderRadius:8, border: mode===k ? "1px solid #d4af37" : "1px solid #2a2a3e",
              background: mode===k ? "#d4af3715" : "transparent", color: mode===k ? "#d4af37" : "#64748b",
              cursor:"pointer", fontSize:11, fontFamily:"'Cinzel', serif", display:"flex", alignItems:"center", justifyContent:"center", gap:6
            }}>
            {v.icon} {v.label}
          </button>
        ))}
      </div>
      <p style={{color:"#94a3b8", fontSize:13, textAlign:"center", marginBottom:8, fontStyle:"italic"}}>{m.desc}</p>
      <p style={{color:"#6366f1", fontSize:11, textAlign:"center", marginBottom:16, letterSpacing:1}}>
        Base: {m.freq}Hz · Binaural: +4Hz · Sub: {m.freq/2}Hz · Overtone: {Math.round(m.freq*1.5)}Hz
      </p>
      {result && (
        <div style={{textAlign:"center", marginBottom:16}}>
          <span style={{color:"#d4af37", fontFamily:"'Cinzel', serif", fontSize:14}}>Anchor: {result.anchor}</span>
          <span style={{color:"#6366f1", marginLeft:12, fontSize:13}}>⟡ {result.frequency}Hz</span>
        </div>
      )}
      <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:20, flexWrap:"wrap"}}>
        <button onClick={toggleTimer} style={{
          width:56, height:56, borderRadius:"50%", border:"2px solid #d4af37", background:"#d4af3710",
          color:"#d4af37", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center"
        }}>
          {running ? <Pause size={24}/> : <Play size={24}/>}
        </button>
        <div style={{fontFamily:"'JetBrains Mono', monospace", fontSize:36, color:"#e2e8f0", letterSpacing:4}}>
          {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
        </div>
        <button onClick={() => audio.playing ? audio.stop() : audio.start(modeFreqs[mode])} style={{
          width:40, height:40, borderRadius:"50%", border:"1px solid #2a2a3e", background:"transparent",
          color: audio.playing ? "#d4af37" : "#475569", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center"
        }}>
          {audio.playing ? <Volume2 size={18}/> : <VolumeX size={18}/>}
        </button>
      </div>

      {/* Download Section */}
      <div style={{marginTop:20, borderTop:"1px solid #1e1e2e", paddingTop:16, textAlign:"center"}}>
        <button onClick={handleDownload} disabled={!!dlProgress} style={{
          padding:"10px 20px", borderRadius:8,
          background: dlProgress ? "#1e1e2e" : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          border:"none", color: dlProgress ? "#64748b" : "#fff",
          fontFamily:"'Cinzel', serif", fontSize:12, letterSpacing:1, cursor: dlProgress ? "wait" : "pointer",
          display:"inline-flex", alignItems:"center", gap:8
        }}>
          {dlProgress === "rendering" ? "⏳ Rendering 20min audio..." :
           dlProgress === "encoding" ? "⏳ Encoding WAV..." :
           `⬇ Download ${m.label} · ${m.freq}Hz · 20 min WAV`}
        </button>
        <p style={{color:"#475569", fontSize:11, marginTop:8}}>
          Generates a full 20-minute layered meditation track (44.1kHz stereo WAV)
        </p>
      </div>

      {running && mode === "flow" && result?.kalas?.[0] && (
        <div style={{textAlign:"center", marginTop:20, animation:"pulse 3s ease-in-out infinite"}}>
          <div style={{color:"#c4b5fd", fontSize:18, fontFamily:"'Cinzel', serif", fontStyle:"italic"}}>
            {result.kalas[0].mantra}
          </div>
        </div>
      )}
    </div>
  );
}

export default function KalaSync() {
  const [intent, setIntent] = useState("");
  const [result, setResult] = useState(null);
  const [activeKalas, setActiveKalas] = useState(new Set());
  const [hoveredKala, setHoveredKala] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedKala, setSelectedKala] = useState(null);
  const audio = useFrequencyGenerator();

  const handleSubmit = () => {
    if (!intent.trim()) return;
    const r = optimizeUser(intent);
    setResult(r);
    setActiveKalas(new Set(r.kalas.map(k => k.no)));
  };

  return (
    <div style={{
      minHeight:"100vh", background:"#0a0a0c", color:"#e2e8f0",
      fontFamily:"'Cinzel', serif", overflow:"auto",
    }}>
      <div style={{maxWidth:800, margin:"0 auto", padding:"32px 16px"}}>
        {/* Header */}
        <div style={{textAlign:"center", marginBottom:32, animation:"fadeIn 0.8s ease"}}>
          <h1 style={{
            fontSize:28, fontWeight:700, letterSpacing:6,
            background:"linear-gradient(135deg, #d4af37 0%, #6366f1 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:4
          }}>
            KALA-SYNC
          </h1>
          <p style={{color:"#475569", fontSize:12, letterSpacing:3}}>THE 64-BIT AVATAR</p>
        </div>

        {/* Observer Input */}
        <div style={{
          background:"#0f0f14", border:"1px solid #1e1e2e", borderRadius:12,
          padding:20, marginBottom:24, animation:"fadeIn 1s ease"
        }}>
          <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:12}}>
            <Eye size={16} color="#d4af37"/>
            <span style={{color:"#d4af37", fontSize:13, letterSpacing:2}}>THE OBSERVER</span>
          </div>
          <textarea
            value={intent}
            onChange={e => setIntent(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }}}
            placeholder="Enter your intent and emotional state... (e.g. 'I feel anxious and need to focus on creative work')"
            style={{
              width:"100%", minHeight:80, background:"#0a0a0c", border:"1px solid #2a2a3e",
              borderRadius:8, padding:12, color:"#e2e8f0", fontSize:14, resize:"vertical",
              fontFamily:"'JetBrains Mono', monospace", outline:"none",
            }}
          />
          <button onClick={handleSubmit} style={{
            marginTop:12, padding:"10px 24px", background:"linear-gradient(135deg, #d4af37 0%, #b8860b 100%)",
            border:"none", borderRadius:8, color:"#0a0a0c", fontFamily:"'Cinzel', serif",
            fontWeight:700, fontSize:13, letterSpacing:2, cursor:"pointer",
          }}>
            ACTIVATE MANDALA
          </button>
          {result && (
            <div style={{marginTop:12, display:"flex", gap:16, flexWrap:"wrap", animation:"fadeIn 0.5s ease"}}>
              <span style={{fontSize:12, color:"#94a3b8"}}>State: <span style={{color:"#f59e0b"}}>{result.state}</span></span>
              <span style={{fontSize:12, color:"#94a3b8"}}>Anchor: <span style={{color:"#d4af37"}}>{result.anchor}</span></span>
              <span style={{fontSize:12, color:"#94a3b8"}}>Freq: <span style={{color:"#6366f1"}}>{result.frequency}Hz</span></span>
              <span style={{fontSize:12, color:"#94a3b8"}}>Kalas: <span style={{color:"#22c55e"}}>{result.kalas.length} activated</span></span>
            </div>
          )}
        </div>

        {/* 64-Cell Mandala Grid */}
        <div style={{
          background:"#0f0f14", border:"1px solid #1e1e2e", borderRadius:12,
          padding:20, marginBottom:24, animation:"fadeIn 1.2s ease"
        }}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16}}>
            <span style={{color:"#d4af37", fontSize:13, letterSpacing:2}}>64-CELL MANDALA</span>
            {activeKalas.size > 0 && (
              <button onClick={() => { setActiveKalas(new Set()); setResult(null); }}
                style={{background:"none", border:"1px solid #2a2a3e", borderRadius:6, padding:"4px 10px",
                  color:"#64748b", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", gap:4}}>
                <X size={12}/> Clear
              </button>
            )}
          </div>
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(8, 1fr)", gap:4,
            maxWidth:560, margin:"0 auto",
          }}>
            {KALA_DB.map(kala => {
              const active = activeKalas.has(kala.no);
              const color = getCellColor(kala);
              return (
                <div
                  key={kala.no}
                  className={`grid-cell ${active ? "active-cell" : ""}`}
                  style={{
                    "--c": color,
                    aspectRatio:"1", borderRadius:6, cursor:"pointer", position:"relative",
                    background: active ? `${color}30` : "#14141e",
                    border: active ? `1.5px solid ${color}` : "1px solid #1e1e2e",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:9, color: active ? color : "#334155",
                    fontFamily:"'JetBrains Mono', monospace",
                  }}
                  onClick={() => setSelectedKala(selectedKala?.no === kala.no ? null : kala)}
                  onMouseEnter={e => { setHoveredKala(kala); setMousePos({x:e.clientX,y:e.clientY}); }}
                  onMouseMove={e => setMousePos({x:e.clientX,y:e.clientY})}
                  onMouseLeave={() => setHoveredKala(null)}
                >
                  {kala.no}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Kala Detail */}
        {selectedKala && (
          <div style={{
            background:"#0f0f14", border:`1px solid ${getCellColor(selectedKala)}`,
            borderRadius:12, padding:20, marginBottom:24, animation:"fadeIn 0.3s ease",
            boxShadow:`0 0 30px ${getCellColor(selectedKala)}15`,
          }}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
              <div>
                <h3 style={{color:getCellColor(selectedKala), fontSize:18, marginBottom:4}}>
                  #{selectedKala.no} — {selectedKala.yogini}
                </h3>
                <p style={{color:"#94a3b8", fontSize:13}}>{selectedKala.bhairava}</p>
              </div>
              <button onClick={() => setSelectedKala(null)}
                style={{background:"none", border:"none", color:"#64748b", cursor:"pointer"}}>
                <X size={18}/>
              </button>
            </div>
            <div style={{marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
              <div style={{background:"#0a0a0c", borderRadius:8, padding:12}}>
                <div style={{color:"#d4af37", fontSize:11, letterSpacing:1, marginBottom:4}}>FUNCTION</div>
                <div style={{color:"#e2e8f0", fontSize:14}}>{selectedKala.fn}</div>
              </div>
              <div style={{background:"#0a0a0c", borderRadius:8, padding:12}}>
                <div style={{color:"#6366f1", fontSize:11, letterSpacing:1, marginBottom:4}}>YOGINI MANTRA</div>
                <div style={{color:"#c4b5fd", fontSize:13, fontStyle:"italic"}}>{selectedKala.mantra}</div>
              </div>
            </div>
            <div style={{background:"#0a0a0c", borderRadius:8, padding:12, marginTop:12}}>
              <div style={{color:"#475569", fontSize:11, letterSpacing:1, marginBottom:4}}>BHAIRAVA MANTRA</div>
              <div style={{color:"#94a3b8", fontSize:13, fontStyle:"italic"}}>{selectedKala.bMantra}</div>
            </div>
          </div>
        )}

        {/* Protocol Engine */}
        <ProtocolEngine result={result} audio={audio}/>

        {/* ===== SADHANA PROTOCOL GUIDE ===== */}
        <div style={{marginTop:32, animation:"fadeIn 1.5s ease"}}>
          <div style={{textAlign:"center", marginBottom:24}}>
            <h2 style={{
              fontSize:20, fontWeight:700, letterSpacing:4, color:"#d4af37", marginBottom:6
            }}>MANTRA SIDDHI PROTOCOL</h2>
            <p style={{color:"#64748b", fontSize:12, letterSpacing:2}}>THE PATH OF ACTIVATION</p>
            <div style={{width:60, height:1, background:"linear-gradient(90deg, transparent, #d4af37, transparent)", margin:"12px auto"}}/>
          </div>

          {/* Important Foundation */}
          <div style={{
            background:"#0f0f14", border:"1px solid #d4af3730", borderRadius:12,
            padding:20, marginBottom:16,
          }}>
            <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:12}}>
              <div style={{width:8, height:8, borderRadius:"50%", background:"#d4af37"}}/>
              <span style={{color:"#d4af37", fontSize:13, letterSpacing:2, fontWeight:600}}>FOUNDATION — BEFORE YOU BEGIN</span>
            </div>
            <div style={{color:"#c8c8d0", fontSize:13, lineHeight:1.8, fontFamily:"'JetBrains Mono', monospace"}}>
              <p style={{marginBottom:8}}>Mantra Siddhi is the state where the mantra becomes alive within you — it is no longer something you repeat, it repeats itself. This requires sustained, disciplined practice over a defined period called a <span style={{color:"#d4af37"}}>Purashcharana</span>.</p>
              <p style={{marginBottom:8}}>Select your Kala from the Mandala above. Your activated Yogini and her Bhairava form a pair — but they are practiced in <span style={{color:"#f59e0b"}}>separate periods</span>, never mixed in the same sitting.</p>
              <p style={{marginBottom:8}}>Each protocol below uses the 20-minute frequency track as a sonic foundation. Download the appropriate track for each phase and play it in the background during your entire session.</p>
              <p>Commit to a minimum of <span style={{color:"#22c55e"}}>40 consecutive days</span> (one Mandala cycle). A break in continuity resets the count.</p>
            </div>
          </div>

          {/* Phase 1: Bhairava Protocol */}
          <div style={{
            background:"linear-gradient(135deg, #0f0a1a 0%, #0f0f14 100%)",
            border:"1px solid #6366f140", borderRadius:12,
            padding:20, marginBottom:16,
          }}>
            <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:14}}>
              <Moon size={16} color="#6366f1"/>
              <span style={{color:"#6366f1", fontSize:13, letterSpacing:2, fontWeight:600}}>PHASE 1 — BHAIRAVA SADHANA</span>
            </div>
            <div style={{
              display:"grid", gap:2,
              background:"#0a0a0c", borderRadius:8, overflow:"hidden", marginBottom:14
            }}>
              {[
                { label:"WHEN", value:"Brahma Muhurta (3:30 AM – 5:00 AM) or after sunset", color:"#818cf8" },
                { label:"DURATION", value:"40 days minimum, unbroken", color:"#818cf8" },
                { label:"FREQUENCY", value:'Play "Bhairava Stillness — 432Hz" track for full 20 minutes', color:"#818cf8" },
                { label:"DIRECTION", value:"Face North or East", color:"#818cf8" },
                { label:"POSTURE", value:"Padmasana or Siddhasana. Spine erect. Eyes closed.", color:"#818cf8" },
              ].map((r, i) => (
                <div key={i} style={{display:"flex", gap:12, padding:"10px 14px", background: i%2===0 ? "#0e0e16" : "#0a0a0c"}}>
                  <span style={{color:"#475569", fontSize:11, letterSpacing:1, minWidth:90, flexShrink:0}}>{r.label}</span>
                  <span style={{color:r.color, fontSize:12}}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{color:"#c8c8d0", fontSize:13, lineHeight:1.9, fontFamily:"'JetBrains Mono', monospace"}}>
              <p style={{color:"#6366f1", fontFamily:"'Cinzel', serif", fontSize:14, marginBottom:10}}>Step-by-Step:</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>1.</span> <span style={{color:"#e2e8f0"}}>Preparation (2 min)</span> — Sit in stillness. Light a ghee lamp or incense if available. Set intention: "I invoke the Bhairava to anchor my consciousness."</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>2.</span> <span style={{color:"#e2e8f0"}}>Pranayama (3 min)</span> — Perform 10 rounds of Nadi Shodhana (alternate nostril breathing). Inhale left 4 counts, hold 4, exhale right 4. Reverse. This purifies the nadis before mantra enters.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>3.</span> <span style={{color:"#e2e8f0"}}>Start the Sound (press Play)</span> — Begin the Bhairava Stillness track (432Hz). Let the drone fill the space. Allow 30 seconds of just listening.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>4.</span> <span style={{color:"#e2e8f0"}}>Bhairava Mantra Japa (15 min)</span> — Chant the Bhairava mantra of your activated Kala using a Rudraksha mala (108 beads). One full mala = one cycle. Aim for 1–3 malas per sitting. Chant aloud for the first mala, then whisper (Upanshu) for the second, then silent (Manasik) for the third. The progression moves the mantra from throat → mind → heart.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>5.</span> <span style={{color:"#e2e8f0"}}>Dissolution (2 min)</span> — Stop chanting. Sit in the vibration. Let the 432Hz track carry you. Do not move. Observe what arises — this is the Bhairava's teaching, the space between thoughts.</p>
              <p><span style={{color:"#d4af37"}}>6.</span> <span style={{color:"#e2e8f0"}}>Seal the Practice</span> — Place both palms over your heart. Mentally recite the mantra 3 final times. Bow. Practice complete.</p>
            </div>
            <div style={{
              marginTop:14, background:"#6366f110", border:"1px solid #6366f120",
              borderRadius:8, padding:12,
            }}>
              <p style={{color:"#818cf8", fontSize:12, fontStyle:"italic"}}>
                Bhairava is the anchor — Shiva as pure awareness. This phase builds the container. Without the container, the Yogini's shakti has nowhere to rest. Complete this phase first.
              </p>
            </div>
          </div>

          {/* Transition */}
          <div style={{textAlign:"center", padding:"12px 0"}}>
            <div style={{color:"#475569", fontSize:11, letterSpacing:3}}>— AFTER 40 DAYS OF BHAIRAVA, TRANSITION TO —</div>
            <div style={{width:1, height:24, background:"#2a2a3e", margin:"8px auto"}}/>
          </div>

          {/* Phase 2: Yogini Protocol */}
          <div style={{
            background:"linear-gradient(135deg, #1a0a1e 0%, #0f0f14 100%)",
            border:"1px solid #c084fc30", borderRadius:12,
            padding:20, marginBottom:16,
          }}>
            <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:14}}>
              <Sun size={16} color="#c084fc"/>
              <span style={{color:"#c084fc", fontSize:13, letterSpacing:2, fontWeight:600}}>PHASE 2 — YOGINI SADHANA</span>
            </div>
            <div style={{
              display:"grid", gap:2,
              background:"#0a0a0c", borderRadius:8, overflow:"hidden", marginBottom:14
            }}>
              {[
                { label:"WHEN", value:"Sunrise (6:00 AM – 7:30 AM) or midday when the sun is strongest", color:"#d8b4fe" },
                { label:"DURATION", value:"40 days minimum, unbroken (begins after Bhairava phase completes)", color:"#d8b4fe" },
                { label:"FREQUENCY", value:'Play "Yogini Flow — 528Hz" track for full 20 minutes', color:"#d8b4fe" },
                { label:"DIRECTION", value:"Face East (toward the rising creative force)", color:"#d8b4fe" },
                { label:"POSTURE", value:"Padmasana or comfortably seated. Spine erect. Eyes half-open, soft gaze.", color:"#d8b4fe" },
              ].map((r, i) => (
                <div key={i} style={{display:"flex", gap:12, padding:"10px 14px", background: i%2===0 ? "#0e0e16" : "#0a0a0c"}}>
                  <span style={{color:"#475569", fontSize:11, letterSpacing:1, minWidth:90, flexShrink:0}}>{r.label}</span>
                  <span style={{color:r.color, fontSize:12}}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{color:"#c8c8d0", fontSize:13, lineHeight:1.9, fontFamily:"'JetBrains Mono', monospace"}}>
              <p style={{color:"#c084fc", fontFamily:"'Cinzel', serif", fontSize:14, marginBottom:10}}>Step-by-Step:</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>1.</span> <span style={{color:"#e2e8f0"}}>Invocation (2 min)</span> — Sit with awareness in the heart center. Offer a mental flower to the Yogini. State your Sankalpa (intention) clearly: what you seek to activate through her Kala.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>2.</span> <span style={{color:"#e2e8f0"}}>Breath of Fire (2 min)</span> — Perform Kapalabhati pranayama — 30 rapid exhalations through the nose, then hold the breath for 15 seconds. Repeat 3 rounds. This ignites the Shakti channel.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>3.</span> <span style={{color:"#e2e8f0"}}>Start the Sound (press Play)</span> — Begin the Yogini Flow track (528Hz). Feel the pulsing frequency in your chest. Let it synchronize with your heartbeat for 30 seconds.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>4.</span> <span style={{color:"#e2e8f0"}}>Yogini Mantra Japa (15 min)</span> — Chant the Yogini mantra using a Crystal or Tulsi mala (108 beads). Unlike the Bhairava practice, begin in whisper (Upanshu) for the first mala. Move to aloud chanting for the second mala — let the mantra become song, let it have rhythm and feeling. Third mala: silent (Manasik), but visualize the Yogini's name as golden light pulsing at the Ajna chakra (third eye).</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>5.</span> <span style={{color:"#e2e8f0"}}>Shakti Meditation (3 min)</span> — Stop chanting. Place awareness at the base of the spine. With each breath, feel energy rising from Muladhara to Sahasrara. The 528Hz track supports this upward movement. Do not force — observe.</p>
              <p><span style={{color:"#d4af37"}}>6.</span> <span style={{color:"#e2e8f0"}}>Seal the Practice</span> — Touch the earth with your right hand (Bhumi Sparsha mudra). Mentally say "Swaha" three times — offering the practice into the cosmic fire. Bow. Practice complete.</p>
            </div>
            <div style={{
              marginTop:14, background:"#c084fc10", border:"1px solid #c084fc20",
              borderRadius:8, padding:12,
            }}>
              <p style={{color:"#d8b4fe", fontSize:12, fontStyle:"italic"}}>
                Yogini is the power — Shakti as creative intelligence. This phase fills the container built by Bhairava. The mantra will begin to "speak itself" — this is the first sign of Siddhi.
              </p>
            </div>
          </div>

          {/* Phase 3: Integration */}
          <div style={{
            background:"linear-gradient(135deg, #0a1a18 0%, #0f0f14 100%)",
            border:"1px solid #2dd4bf30", borderRadius:12,
            padding:20, marginBottom:16,
          }}>
            <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:14}}>
              <Zap size={16} color="#2dd4bf"/>
              <span style={{color:"#2dd4bf", fontSize:13, letterSpacing:2, fontWeight:600}}>PHASE 3 — SIDDHA INTEGRATION (THE WITNESS)</span>
            </div>
            <div style={{
              display:"grid", gap:2,
              background:"#0a0a0c", borderRadius:8, overflow:"hidden", marginBottom:14
            }}>
              {[
                { label:"WHEN", value:"Any time of day — this practice lives in the gaps between moments", color:"#5eead4" },
                { label:"DURATION", value:"Ongoing. Begins after both 40-day phases are complete.", color:"#5eead4" },
                { label:"FREQUENCY", value:'Play "Siddha Integration — 174Hz" track for 20 minutes', color:"#5eead4" },
                { label:"DIRECTION", value:"No fixed direction. You are the center.", color:"#5eead4" },
                { label:"POSTURE", value:"Any comfortable position. Even walking or lying down.", color:"#5eead4" },
              ].map((r, i) => (
                <div key={i} style={{display:"flex", gap:12, padding:"10px 14px", background: i%2===0 ? "#0e0e16" : "#0a0a0c"}}>
                  <span style={{color:"#475569", fontSize:11, letterSpacing:1, minWidth:90, flexShrink:0}}>{r.label}</span>
                  <span style={{color:r.color, fontSize:12}}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{color:"#c8c8d0", fontSize:13, lineHeight:1.9, fontFamily:"'JetBrains Mono', monospace"}}>
              <p style={{color:"#2dd4bf", fontFamily:"'Cinzel', serif", fontSize:14, marginBottom:10}}>Step-by-Step:</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>1.</span> <span style={{color:"#e2e8f0"}}>Start the Sound</span> — Play the 174Hz Siddha track. Sit or lie down. Close your eyes.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>2.</span> <span style={{color:"#e2e8f0"}}>Recall Both Mantras Silently</span> — Let the Bhairava mantra arise naturally in the left channel of awareness. Let the Yogini mantra arise in the right. Do not chant — just witness them appearing. If they merge into a single vibration, allow it.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>3.</span> <span style={{color:"#e2e8f0"}}>The Witness Practice (15 min)</span> — Drop the mantras entirely. Rest as the one who was listening. This is the Siddha state — not the doer, not the knower, but pure awareness watching itself. The 174Hz tone anchors you at the root, preventing dissociation while the mind opens.</p>
              <p style={{marginBottom:6}}><span style={{color:"#d4af37"}}>4.</span> <span style={{color:"#e2e8f0"}}>Micro-Awareness Pulses</span> — Every 3 minutes, gently notice: "Am I still witnessing, or have I become the thought?" This gentle return is the practice itself. Each return strengthens the Witness.</p>
              <p><span style={{color:"#d4af37"}}>5.</span> <span style={{color:"#e2e8f0"}}>Closing</span> — When the track ends, remain still for 2 minutes. Then slowly open your eyes. Look at your hands. Feel the boundary between inner and outer dissolve. This is integration — Bhairava (awareness) and Yogini (energy) united in the Siddha (the realized one).</p>
            </div>
            <div style={{
              marginTop:14, background:"#2dd4bf10", border:"1px solid #2dd4bf20",
              borderRadius:8, padding:12,
            }}>
              <p style={{color:"#5eead4", fontSize:12, fontStyle:"italic"}}>
                The Siddha does not practice — the Siddha is what remains when practice dissolves. This phase has no end date. It is the fruit of the first two phases merging into your daily consciousness.
              </p>
            </div>
          </div>

          {/* Complete Timeline */}
          <div style={{
            background:"#0f0f14", border:"1px solid #1e1e2e", borderRadius:12,
            padding:20, marginBottom:16,
          }}>
            <span style={{color:"#d4af37", fontSize:13, letterSpacing:2, fontWeight:600}}>COMPLETE TIMELINE</span>
            <div style={{marginTop:14, display:"flex", flexDirection:"column", gap:0}}>
              {[
                { day:"Day 1–40", phase:"Bhairava Sadhana", time:"Brahma Muhurta / Evening", freq:"432Hz", color:"#6366f1", track:"Bhairava Stillness" },
                { day:"Day 41–80", phase:"Yogini Sadhana", time:"Sunrise / Midday", freq:"528Hz", color:"#c084fc", track:"Yogini Flow" },
                { day:"Day 81+", phase:"Siddha Integration", time:"Any time", freq:"174Hz", color:"#2dd4bf", track:"Siddha Integration" },
              ].map((row, i) => (
                <div key={i} style={{
                  display:"grid", gridTemplateColumns:"100px 1fr 1fr 80px",
                  gap:8, padding:"12px 0",
                  borderBottom: i < 2 ? "1px solid #1e1e2e" : "none",
                  alignItems:"center",
                }}>
                  <span style={{color:row.color, fontSize:13, fontWeight:600}}>{row.day}</span>
                  <span style={{color:"#e2e8f0", fontSize:12}}>{row.phase}</span>
                  <span style={{color:"#94a3b8", fontSize:11}}>{row.time}</span>
                  <span style={{color:row.color, fontSize:12, textAlign:"right"}}>{row.freq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules & Warnings */}
          <div style={{
            background:"#0f0f14", border:"1px solid #ef444430", borderRadius:12,
            padding:20, marginBottom:16,
          }}>
            <span style={{color:"#ef4444", fontSize:13, letterSpacing:2, fontWeight:600}}>ESSENTIAL RULES</span>
            <div style={{marginTop:12, color:"#c8c8d0", fontSize:12, lineHeight:1.9, fontFamily:"'JetBrains Mono', monospace"}}>
              {[
                "Never mix Bhairava and Yogini mantras in the same sitting. They operate on different energy channels and different times of day.",
                "Maintain the same sitting time each day. The body's circadian rhythm amplifies the mantra's effect when practiced at a consistent hour.",
                "Do not share your mantra with others during the 40-day cycle. The mantra is accumulating charge — speaking it casually disperses the energy.",
                "If you miss a day, restart the 40-day count. Partial cycles create partial containers. Siddhi requires completion.",
                "Keep a journal. After each session, write one line about what you experienced. Patterns will emerge by day 20.",
                "Diet: Minimize tamasic food (heavy, processed, stale) during the sadhana period. The mantra works on subtle channels that are sensitive to what you consume.",
                "The download feature lets you practice offline — use it. Consistency matters more than environment. A park bench with headphones is better than a perfect altar you visit inconsistently.",
              ].map((rule, i) => (
                <p key={i} style={{marginBottom:8}}>
                  <span style={{color:"#ef4444"}}>{i+1}.</span> {rule}
                </p>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{textAlign:"center", padding:"20px 0 40px", color:"#2a2a3e", fontSize:11, letterSpacing:2}}>
            ॐ KALA-SYNC · THE 64-BIT AVATAR ॐ
          </div>
        </div>

        <Tooltip kala={hoveredKala} x={mousePos.x} y={mousePos.y}/>
      </div>
    </div>
  );
}
