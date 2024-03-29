class Instrument{
  constructor(code){
    this.code = code;
    this.num_tracks = 8;
    this.refDiv;
    this.refInCont;
    this.records = [];
    this.volume = 1;
    this.numBars = 1;
    this.muteState = false;
    this.soloState = false;
    this.soloMute = false;
  }

  getCode(){
    return this.code;
  }

  setCode(code){
    this.code = code;
  }

  setRefDiv(div){
    this.refDiv = div;
  }

  getRefDiv(){
    return this.refDiv;
  }

  setRefInCont(div){
    this.refInCont = div;
  }

  getRefInCont(){
    return this.refInCont;
  }

  getRecords(){
    return this.records;
  }

  setVolume(volume){
    this.volume = volume;
  }

  getVolume(){
    return this.volume;
  }

  setNumBars(numBars){
    this.numBars = numBars;
  }

  getNumBars(){
    return this.numBars;
  }

  setMuteState(muteState){
    this.muteState = muteState;
  }

  getMuteState(){
    return this.muteState;
  }

  setSoloState(soloState){
    this.soloState = soloState;
  }

  getSoloState(){
    return this.soloState;
  }

  setSoloMute(soloMute){
    this.soloMute = soloMute;
  }

  getSoloMute(){
    return this.soloMute;
  }

}

class Piano extends Instrument{
  constructor(code){
    super(code);
    this.type = "piano";
    for(let i=0 ; i < this.num_tracks; i++){
      let tmp = new Instrument_Recorder(this, i);
      this.records.push(tmp);
    }
  }

  draw(container){
      let container_id = container.getAttribute("id");
      container.innerHTML = drawKeyBoard(container_id);
  }

  setUpMidi(){
    model.setMidi(this);
  }

  getType(){
    return this.type;
  }
}

class Drum extends Instrument{
  constructor(code){
    super(code);
    this.type = "drum";
    for(let i=0 ; i < this.num_tracks; i++){
      let tmp = new Instrument_Recorder(this, i);
      this.records.push(tmp);
    }
  }

  draw(container){
    let container_id = container.getAttribute("id");
    container.innerHTML = drawDrum(container_id);
  }

  setUpMidi(){
    model.setMidi(this);
  }

  getType(){
    return this.type;
  }
}

class Guitar extends Instrument{
  constructor(code){
    super(code);
    this.type = "guitar";
    for(let i=0 ; i < this.num_tracks; i++){
      let tmp = new Instrument_Recorder(this, i);
      this.records.push(tmp);
    }
  }

  draw(container){
      let container_id = container.getAttribute("id");
      container.innerHTML = drawGuitar(container_id);
      setupGuitar(container.getAttribute("id").split("_")[0]);
  }

  setUpMidi(){
    model.setMidi(this);
  }

  getType(){
    return this.type;
  }
}

class Bass extends Instrument{
  constructor(code){
    super(code);
    this.type = "bass";
    for(let i=0 ; i < this.num_tracks; i++){
      let tmp = new Instrument_Recorder(this, i);
      this.records.push(tmp);
    }
  }

  draw(container){
    let container_id = container.getAttribute("id");
    container.innerHTML = drawBass(container_id);
    setupBass(container.getAttribute("id").split("_")[0]);
  }

  setUpMidi(){
    model.setMidi(this);
  }

  getType(){
    return this.type;
  }
}

class Voice extends Instrument{
  constructor(code){
    super(code);
    this.type = "voice";
    for(let i=0 ; i < this.num_tracks; i++){
      let tmp = new Voice_Recorder(this, i);
      this.records.push(tmp);
    }
  }

  draw(container){
      
  }

  setUpMidi(){
   
  }

  getType(){
    return this.type;
  }
}

 /*-------------Recorder--------------*/

class Record_square{
  constructor(father, code){
    this.father = father;
    this.code = code;
    this.is_recording = false;
    this.chunks = [];
    this.can_record;
    this.isPlaying = false;
    this.duration;
    this.animationState = false;
    this.animationAngle = 0;
    this.animationInt;
  }

  getCode(){
    return this.code;
  }

  getCanRecord(){
    return this.can_record;
  }

  setCanRecord(can_record){
    this.can_record = can_record;
  }

  getIsRecording(){
    return this.is_recording;
  }

  setIsRecording(is_recording){
    this.is_recording = is_recording;
  }

  getChunks(){
    return this.chunks;
  }

  setChunks(chunks){
    this.chunks = chunks;
  }

  getIsPlaying(){
    return this.isPlaying;
  }

  setIsPlaying(isPlaying){
    this.isPlaying = isPlaying;
  }

  getFather(){
    return this.father;
  }

  setFather(father){
    this.father = father;
  }

  getDuration(){
    return this.duration;
  }

  setDuration(duration){
    this.duration = duration;
  }

  getAnimationState(){
    return this.animationState;
  }

  setAnimationState(animationState){
    this.animationState = animationState;
  }

  getAnimationAngle(){
    return this.animationAngle;
  }

  setAnimationAngle(animationAngle){
    this.animationAngle = animationAngle;
  }

  getAnimationInt(){
    return this.animationInt;
  }

  setAnimationInt(animationInt){
    this.animationInt = animationInt;
  }

}

class Voice_Recorder extends Record_square{
  constructor(father,code){
    super(father,code);
    this.type = "voice";
    this.recorder = null;
    this.audio_element;
    this.can_record = false;
    this.timeStart;
    this.timeStop;
    SetupAudio(code, father);
  }

  getRecorder(){
    return this.recorder;
  }

  setRecorder(recorder){
    this.recorder = recorder;
  }

  getAudioElement(){
    return this.audio_element;
  }

  setAudioElement(audio_element){
    this.audio_element = audio_element;
  }

  getTimeStart(){
    return this.timeStart;
  }

  setTimeStart(timeStart){
    this.timeStart = timeStart;
  }

  getTimeStop(){
    return this.timeStop;
  }

  setTimeStop(timeStop){
    this.timeStop = timeStop;
  }

  resetRecord(){
    this.audio_element = null;
    this.timeStart = 0;
    this.timeStop = 0;
    this.duration = 0;
  }
}

class Instrument_Recorder extends Record_square{
  constructor(father,code){
    super(father,code);
    this.type = "instrument";
    this.onArray = [];
    this.offArray = [];
    this.startTime = null;
    this.can_record = true;
    this.beats; 
    this.bpm; 
    this.intLoop;
  }

  getStartTime(){
    return this.startTime;
  }

  setStartTime(startTime){
    this.startTime = startTime;
  }

  getOnArray(){
    return this.onArray;
  }

  setOnArray(onArray){
    this.onArray = onArray;
  }

  getOffArray(){
    return this.offArray;
  }

  setOffArray(offArray){
    this.offArray = offArray;
  }

  resetRecord(){
    this.onArray = [];
    this.offArray = [];
    this.startTime = null;
    this.can_record = true;
    clearInterval(this.intLoop);
  }

  getBPM(){
    return this.bpm;
  }

  setBPM(bpm){
    this.bpm = bpm;
  }

  getBeats(){
    return this.beats;
  }

  setBeats(beats){
    this.beats = beats;
  }

  getIntLoop(){
    return this.intLoop;
  }

  setIntLoop(intLoop){
    this.intLoop = intLoop;
  }
}


/*-------------Model Object--------------*/
model = {
  
  instruments: [],
  num_tracks: 8,
  countdown: 8,
  rec_state:false,
  play_state:false,
  remove_state:false,
  delete_record_state:false,
  loop_state:false,
  current_inst_rec: null,
  Inst_Chunks: [],
  On_time: [],
  Off_time: [],
  start_time: null,
  outFlag: false,
  midi:null,
  midiFlag:false,

  /*-------------Getter and setter methods--------------*/

  getInstruments: function(){
    return this.instruments;
  },

  getNumTracks: function(){
    return this.num_tracks;
  },

  getCountDown: function(){
    return this.countdown;
  },

  getRecState: function(){
    return this.rec_state;
  },

  setRecState: function(rec_state){
    this.rec_state= rec_state;
  },

  getPlayState: function(){
    return this.play_state;
  },

  setPlayState: function(play_state){
    this.play_state= play_state;
  },

  getRemoveState: function(){
    return this.remove_state;
  },

  setRemoveState: function(remove_state){
    this.remove_state= remove_state;
  },

  getDeleteRecordState: function(){
    return this.delete_record_state;
  },

  setDeleteRecordState: function(delete_record_state){
    this.delete_record_state = delete_record_state;
  },

  getLoopState: function(){
    return this.loop_state;
  },

  setLoopState: function(loop_state){
    this.loop_state = loop_state;
  },

  getCurrent_inst_rec: function(){
    return this.current_inst_rec;
  },

  setCurrent_inst_rec: function(current_inst_rec){
    this.current_inst_rec = current_inst_rec;
  },

  getInstChunks: function(){
    return this.Inst_Chunks;
  },

  setInstChunks: function(Inst_Chunks){
    this.Inst_Chunks = Inst_Chunks;
  },

  getOnTime: function(){
    return this.On_time;
  },

  setOnTime: function(On_time){
    this.On_time = On_time;
  },

  getOffTime: function(){
    return this.Off_time;
  },

  setOffTime: function(Off_time){
    this.Off_time = Off_time;
  },

  getStartTime: function(){
    return this.start_time;
  },

  setStartTime: function(start_time){
    this.start_time = start_time;
  },

  getOutFlag: function(){
    return this.outFlag;
  },

  setOutFlag: function(outFlag){
    this.outFlag = outFlag;
  },

  getMidi: function(){
    return this.midi;
  },

  setMidi: function(midi){
    this.midi = midi;
  },

  getMidiFlag: function(){
    return this.midiFlag;
  },

  setMidiFlag: function(midiFlag){
    this.midiFlag = midiFlag;
  },

  /*-------------Model methods--------------*/

  checkButtons: function(){
    let count = 0;

    if(this.getRecState()){
      count++;
    }

    if(this.getPlayState()){
      count++;
    }

    if(this.getRemoveState()){
      count++;
    }

    if(this.getDeleteRecordState()){
      count++;
    }

    if(this.getLoopState()){
      count++;
    }

    if(count >= 2)
      return false;
    else return true;
  },

  resetStateButton: function(){
    this.setRecState(false);
    this.setPlayState(false);
    this.setRemoveState(false);
    this.setDeleteRecordState(false);
    this.setLoopState(false);
  },

  addInstrument: function(instrument){
    if(this.getMidiFlag() == false){
      setUpMidiInstrument();
    }
    this.instruments.push(instrument);
  },

  deleteInstrument: function(num){
    this.instruments.splice(num,1);
    for(let i=num; i< this.instruments.length; i++){
      if(this.instruments[i].getCode() != i){
          this.instruments[i].setCode(i);
      }
    }
  
  },

  saveInstRec: function(event,record){
    if(record.getFather().getType() == model.getCurrent_inst_rec() && model.getStartTime() != null ){
      record.setOnArray(model.getOnTime());
      record.setOffArray(model.getOffTime());
      record.setStartTime(model.getStartTime());
      record.setCanRecord(false);
      record.setBPM(metronome.getBPM());
      
      record.setBeats(record.getFather().getNumBars() * 4);
      
      duration = (60 / record.getBPM()) * record.getBeats() * 1000;
      record.setDuration(duration);

      model.setOutFlag(false);
      view.now_recording(event);
      view.printTime(event, record);
      this.resetRecInst();
    }else{
      alert('Choose the correct instrument');
    }
  },

  resetRecInst: function(){
    this.setOnTime([]);
    this.setOffTime([]);
    this.setStartTime(null);
    this.setCurrent_inst_rec(null);
  }
}