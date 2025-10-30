// === Implementações (Implementors) ===
class TvDevice {
  powerOn() { console.log("TV: ligada"); }
  powerOff() { console.log("TV: desligada"); }
  setChannel(ch) { console.log(`TV: canal ${ch}`); }
}

class AudioSystemDevice {
  powerOn() { console.log("Áudio: ligado"); }
  powerOff() { console.log("Áudio: desligado"); }
  setVolume(v) { console.log(`Áudio: volume ${v}`); }
}

class ProjectorDevice {
  powerOn() { console.log("Projetor: ligado"); }
  powerOff() { console.log("Projetor: desligado"); }
  selectInput(src) { console.log(`Projetor: entrada ${src}`); }
}

// === Abstração ===
class BasicRemote {
  constructor(device) {
    if (!device || typeof device.powerOn !== 'function' || typeof device.powerOff !== 'function') {
      throw new Error("device inválido: requer powerOn()/powerOff()");
    }
    this.device = device;
    this.isOn = false;
  }

  power(on) {
    if (on && !this.isOn) { this.device.powerOn(); this.isOn = true; }
    else if (!on && this.isOn) { this.device.powerOff(); this.isOn = false; }
  }

  // Agora silencioso: se o método não existir, simplesmente não faz nada
  callIfSupported(methodName, ...args) {
    if (typeof this.device[methodName] === 'function') {
      this.device[methodName](...args);
    }
  }
}

// === Abstração Refinada ===
class ProRemote extends BasicRemote {
  quickMute() {
    if (typeof this.device.setVolume === 'function') {
      this.device.setVolume(0);
    }
    // se não houver setVolume, não faz nada (silencioso)
  }

  cinemaPreset() {
    this.callIfSupported('setChannel', 100);
    this.callIfSupported('setVolume', 15);
    this.callIfSupported('selectInput', 'HDMI2');
  }
}

// === Cliente ===
console.log("--- Básico com TV ---");
const tv = new TvDevice();
const tvRemote = new BasicRemote(tv);
tvRemote.power(true);
tvRemote.callIfSupported('setChannel', 7);
tvRemote.power(false);

console.log("\n--- Básico com Sistema de Áudio ---");
const audio = new AudioSystemDevice();
const audioRemote = new BasicRemote(audio);
audioRemote.power(true);
audioRemote.callIfSupported('setVolume', 20);
audioRemote.power(false);

console.log("\n--- Avançado com TV ---");
const proRemoteTv = new ProRemote(tv);
proRemoteTv.power(true);
proRemoteTv.quickMute();      // se não houver setVolume, fica silencioso
proRemoteTv.cinemaPreset();   // só executa o que a TV suportar
proRemoteTv.power(false);

console.log("\n--- Avançado com Projetor ---");
const projector = new ProjectorDevice();
const proRemoteProj = new ProRemote(projector);
proRemoteProj.power(true);
proRemoteProj.cinemaPreset(); // só executa o que o projetor suportar
proRemoteProj.power(false);