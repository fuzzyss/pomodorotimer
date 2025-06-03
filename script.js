class PomodoroTimer {
    constructor() {
        this.isRunning = false;
        this.interval = null;
        this.workMinutes = 25;
        this.breakMinutes = 5;
        this.currentMinutes = this.workMinutes;
        this.currentSeconds = 0;
        this.isWorkTime = true;

        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.stopButton = document.getElementById('stop');
        this.resetButton = document.getElementById('reset');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.resetButton.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', (e) => {
            this.workMinutes = parseInt(e.target.value);
            if (!this.isRunning) this.updateTimerDisplay();
        });
        this.breakTimeInput.addEventListener('change', (e) => {
            this.breakMinutes = parseInt(e.target.value);
            if (!this.isRunning) this.updateTimerDisplay();
        });
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => this.tick(), 1000);
    }

    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.currentMinutes = this.workMinutes;
        this.currentSeconds = 0;
        this.isWorkTime = true;
        this.updateTimerDisplay();
    }

    tick() {
        if (this.currentSeconds === 0) {
            if (this.currentMinutes === 0) {
                // タイムアップ！
                this.stop();
                this.isWorkTime = !this.isWorkTime;
                this.currentMinutes = this.isWorkTime ? this.workMinutes : this.breakMinutes;
                this.currentSeconds = 0;
                this.updateTimerDisplay();
                this.playSound();
                return;
            }
            this.currentMinutes--;
            this.currentSeconds = 59;
        } else {
            this.currentSeconds--;
        }
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        this.timerElement.textContent = `${this.currentMinutes.toString().padStart(2, '0')}:${this.currentSeconds.toString().padStart(2, '0')}`;
    }

    playSound() {
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audio.play();
    }
}

// タイマーの初期化
const timer = new PomodoroTimer();
