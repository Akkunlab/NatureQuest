  /* オーディオ */
  class AudioPlayer {
    audioContext: AudioContext;
    private buffer: AudioBuffer | null;
    sourceNodes: AudioBufferSourceNode[];

    constructor() {
      this.audioContext = new AudioContext();
      this.buffer = null;
      this.sourceNodes = [];
    }

    async loadAudioFile(url: string): Promise<void> {
      const response = await fetch(url);
      const audioData = await response.arrayBuffer();
      this.buffer = await this.audioContext.decodeAudioData(audioData);
    }

    play(): void {
      if (this.buffer) {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.audioContext.destination);

        // 重ねて再生するために新しい音源を追加
        this.sourceNodes.push(source);

        // 再生が終了したらリストから削除
        source.onended = () => {
          const index = this.sourceNodes.indexOf(source);
          if (index !== -1) {
            this.sourceNodes.splice(index, 1);
          }
        };

        source.start(0);
      } else {
        console.error('Audio buffer is not loaded.');
      }
    }

    stopAll(): void {
      // すべての音源を停止
      this.sourceNodes.forEach((source) => {
        source.stop();
      });
      this.sourceNodes = [];
    }
  }

  export const audioPlayer = new AudioPlayer();
