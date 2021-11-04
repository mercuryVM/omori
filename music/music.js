var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

let playerReady = false;

let index = -1;

$(".loading").css("display", "block");

function onYouTubeIframeAPIReady() {
    playerReady = true;
    $(".loading").css("display", "none");
    PlayNextMusic()
}

function PlayNextMusic() {
    isPlaying = false;
    $("#playBtn").text("play_arrow")

    if (!player) {
        player = new YT.Player('player', {
            playerVars: {
                controls: 1,
                disablekb: 1,
                list: "PLbANFjAlbtqLkcthrPJ7lqYcVTSwXr2L0",
                listType: "playlist"
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
            }
        });
    } else {
        player.loadVideoById(nextMusic.id);
    }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

let isPlaying = false;

let lastSended = "00:00/00:00";

function formatTime(seconds) {
    return [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1")
}

function SkipMusic() {
    if (player) {
        player.nextVideo()
    }
}

$("#skipDuet").click((e) => {
    SkipMusic()
    StopDuetAnimation()
})

function StopDuetAnimation() {
    $(".duet").css("display", "none");
    $(".duet").css("opacity", "0");
    $(".duet").find(".bg").stop()
    $(".duet").stop();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        $("#playBtn").text("pause")
        isPlaying = true;
        if (interval) {
            clearInterval(interval);
        }

        const videoData = player.getVideoData()

        if (videoData.video_id === "ACon4txJiDA") {
            $("#duetVideo")[0].currentTime = player.getCurrentTime()
            $("#duetVideo")[0].play()
        } else {
            StopDuetAnimation()
        }

        $(".playingNow").find(".musicname").text(videoData.title)
        interval = setInterval(() => {
            let seconds = Math.floor(player.getCurrentTime());

            if (videoData.video_id === "ACon4txJiDA") {

                if(!$("#duetVideo")[0].playing && isPlaying){
                    $("#duetVideo")[0].currentTime = player.getCurrentTime()
                    $("#duetVideo")[0].play()
                }

                if (seconds >= 11) {
                    const object = $(".duet")
                    if (object.css("display") === "none") {
                        object.css("display", "flex");
                        object.animate({
                            opacity: 1,
                        }, 2000, async function () {
                            object.find(".bg").animate({
                                backgroundPosition: "1000%",
                            }, 2 * 60 * 1000, async function () {
                            });
                        });
                    }
                }
            } else if (videoData.video_id === "10rFQMp9cjE") {
                if(seconds >= 26 && seconds < 27){
                    $(".cat").css("display", "flex");
                    $(".cat").css("opacity", "1");
                    $(".cat").find("#01").css("display", "block");
                    $(".cat").find("#02").css("display", "none");
                }
                else if(seconds > 63 && seconds <= 64){
                    $(".cat").css("display", "flex");
                    $(".cat").css("opacity", "1");
                    $(".cat").find("#01").css("display", "none");
                    $(".cat").find("#02").css("display", "block");
                } else{
                    $(".cat").css("display", "none");
                    $(".cat").css("opacity", "0");
                    $(".cat").find("#01").css("display", "none");
                    $(".cat").find("#02").css("display", "none");
                }

                
            }

            let totalSeconds = Math.floor(player.getDuration())

            let now = formatTime(seconds) + "/" + formatTime(totalSeconds);
            if (lastSended != now) {
                lastSended = now;
                $("#now").text(now)
            }
        }, 100)
    } else if (event.data == YT.PlayerState.PAUSED) {

        const videoData = player.getVideoData()

        if (videoData.video_id === "ACon4txJiDA") {
            $("#duetVideo")[0].currentTime = player.getCurrentTime()
            $("#duetVideo")[0].play()
        }

        $("#playBtn").text("play_arrow")
        isPlaying = false;
        if (interval) {
            clearInterval(interval);
        }
    } else if (event.data == YT.PlayerState.ENDED) {
        PlayNextMusic()
    }
}

function myFavorite(index) {
    if (player) {
        player.playVideoAt(index)
    }
}

let interval;

$("#playBtn").click((e) => {
    if (!player) return;

    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo()
    }
})

function stopVideo() {
    player.stopVideo();
}