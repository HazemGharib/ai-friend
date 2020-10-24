<template>
  <div class="text-center my-4">
    <h1>AI Friend</h1>
    <v-btn @click="talk" color="blue darken-4" dark fab class="ma-16 pa-16">
      <v-icon size="70">mdi-microphone</v-icon>
    </v-btn>
    <div class="text-start">
      <v-container id="you"> You: {{ you }} </v-container>
      <v-container id="ai"> Cara: {{ cara }} </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    //
  },
  data() {
    return {
      you: "",
      cara: "",
      socket: undefined,
      recognition: undefined
    };
  },
  sockets: {
    sendResponse({ response }) {
      this.cara = response;
      this.synthVoice(response);
    }
  },
  mounted() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "en-UK";
    this.recognition.interimResults = false;
    this.recognition.addEventListener("result", result =>
      this.processVoice(result)
    );
    this.recognition.addEventListener("speechend", () => {
      this.recognition.stop();
    });
  },
  methods: {
    talk() {
      this.you = "...";
      this.recognition.start();
    },
    processVoice(voice) {
      this.cara = "...";
      const last = voice.results.length - 1;
      const text = voice.results[last][0].transcript;
      this.you = text;
      this.$socket.client.emit("propagateRequest", { text });
    },
    synthVoice(text) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      synth.speak(utterance);
    }
  }
};
</script>
