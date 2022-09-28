<script>
import { reactive } from "vue"
import FlagIcon from "vue-material-design-icons/Flag.vue"
import PlayIcon from "vue-material-design-icons/PlayCircle.vue"
import PauseIcon from "vue-material-design-icons/PauseCircle.vue"
import RestartIcon from "vue-material-design-icons/Restart.vue"
export default {
    components:{
        FlagIcon,
        PlayIcon,
        PauseIcon,
        RestartIcon
    },
    setup(){
        const Clock = reactive({
            time: '00:00:00.000',
            timeStart: null,
            timeStop: null,
            stopDuration: 0,
            started: null,
            running: false,
            flagData: [],
        })
        const start = () => {
            if(Clock.running) return;
            if(Clock.timeStart === null){
                reset();
                Clock.timeStart = new Date();
            }
            if(Clock.timeStop !== null){
                Clock.stopDuration += (new Date() - Clock.timeStop)
            }
            Clock.started = setInterval(clockRunning,10)
            localStorage.setItem("Date",Clock.time)
            Clock.running = true
        }

        const reset = () => {
            Clock.running = false;
            clearInterval(Clock.started);
            Clock.stopDuration = 0;
            Clock.timeStart = null;
            Clock.timeStop = null;
            Clock.time = '00:00:00.000';
            localStorage.removeItem('Date');
            Clock.flagData = [] 
        }

        const stop = () => {
            Clock.running = false;
            Clock.timeStop = new Date();
            clearInterval(Clock.started)
        }

        const clockRunning = () => {
            const currentTime = new Date();
            const timeElapsed = new Date(currentTime - Clock.timeStart - Clock.stopDuration);
            let hour = timeElapsed.getUTCHours();
            let min = timeElapsed.getUTCMinutes();
            let sec = timeElapsed.getUTCSeconds();
            let ms = timeElapsed.getUTCMilliseconds();
            Clock.time = zeroPrefix(hour,2) + ":" + zeroPrefix(min,2) + ":" + zeroPrefix(sec, 2) + "." + zeroPrefix(ms, 3)
        }

        const zeroPrefix = (num,digit) => {
            let zero = ''
            for(let i=0; i< digit; i++) {
                zero += '0'
            }
            return(zero + num).slice(-digit)
        }

        const msToTime = (duration) => {
            let milliseconds = Math.floor((duration % 1000));
            let seconds = Math.floor((duration / 1000) % 60);
            let minutes = Math.floor((duration / (1000 * 60)) % 60);
            let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        }

        const flag = () => {
           const date = new Date().toLocaleDateString("en-US");
           const prevTime = localStorage.getItem('Date');
           const currentTime = Clock.time

           localStorage.setItem("Date",currentTime)

           const timeStart = new Date(date + " " + currentTime);
           const timeEnd = new Date(date + " " + prevTime);
           let diff = msToTime(timeStart - timeEnd)

           const newData = { "diff": diff, "time":Clock.time}
           Clock.flagData.push(newData);
        }
        return{
            Clock,
            start,
            reset,
            stop,
            flag
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="main-container">
            <div id="clock">
                <div class="btn-container">
                    <a @click="stop" id="stop" v-if="Clock.running"><pause-icon title="stop" :size="60"  /></a>
                    <a @click="start" id="start" v-else><play-icon title="start" :size="60" /></a>
                    <span class="time">{{Clock.time}}</span>
                    <a @click="flag" id="flag" v-if="Clock.running"><flag-icon title="flag" :size="60" /></a>
                    <a @click="reset" id="reset" v-else><restart-icon title="reset" :size="60" /></a>
                </div>
                <table class="table text-white">
                    <tr v-for="(item,index) in Clock.flagData" :key="index">
                        <td>{{index + 1}}</td>
                        <td>{{item.diff}}</td>
                        <td>{{item.time}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Share+Tech+Mono');
.container{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
.main-container {
    background-color:  rgb(10, 10, 10);
    font-family: 'Share Tech Mono', sans-serif;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    align-content:  stretch;
    flex-wrap: nowrap;
}
#clock {
    order: 0;
    flex: 0 1 auto;
    align-self: center;
    color: rgb(200, 200, 200);
}
.time {
    font-size: 6.5em;   
}
.text {
    margin-top: 30px;
    font-size: 1em;
    color: rgba(200, 200, 200, 0.15);
    text-align: center;
}
.text a {
    text-decoration: none;
    color: inherit;

    transition: color .1s ease-out;
}
.text a:hover{
    color: rgb(200, 200, 200);
}
.btn-container{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
}
.btn-container a {
    text-align: center;
      font-family: 'Share Tech Mono', sans-serif;
      background: transparent;
     
      border: none;
      color: rgb(200, 200, 200);
      padding: 10px 15px;
      margin: 0 10px;
      text-transform: uppercase;
      font-size: 2em;
      cursor: pointer;
      
      flex-grow: 1;

      transition: color .1s ease-out;

}
.btn-container a:hover {
    color: white;
}


@media only screen and (max-width: 768px) {
    .time{
        font-size: 2.5em;
    }
}
@media only screen and (max-width: 485px) {
    .time{
        font-size: 1.5em;
    }
    .table {
        margin: 8px; 
    }
}

</style>