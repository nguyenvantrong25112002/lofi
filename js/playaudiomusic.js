let allMusic = [{
        name: "Ít nhưng dài lâu",
        artist: "yan nguyễn",
        src: "it-nhung-dai-lau"
    },
    {
        name: "cô thắm không về",
        artist: "Phát Hồ",
        src: "co-tham-ko-ve"
    },
    {
        name: "chẳng ai yêu mãi một người",
        artist: "NB3 HOAI BAO",
        src: "chang-ai-yeu-mai-mot-nguoi"
    },
    {
        name: "Chắc vì mình chưa tốt",
        artist: "thanh hưng",
        src: "chac-vi-minh-chua-tot"
    },
    {
        name: "Đứt duyên",
        artist: "TVk x phát LEE",
        src: "dut-duyen"
    },
    {
        name: "ai đợi mình được mãi",
        artist: "thanh hưng",
        src: "doi-minh-duoc-mai"
    },
    {
        name: "Em hứa thế nào",
        artist: "như việt",
        src: "em-hua-the-nao"
    },
    {
        name: "hạnh phúc thoáng qua",
        artist: "Noo Phuoc Thinh",
        src: "hanh-phu-thoang-qua"
    },

    {
        name: "Nếu như em không hạnh phúc",
        artist: "Long Hải",
        src: "neu-em-khong-hanh-phuc"
    },
    {
        name: "Xem Như Em Chẳng May",
        artist: "CHu thúy quỳnh x trung ngon",
        src: "ngot-ngao-den-may-cung-tan-thanh-may"
    }, {
        name: "người lạ thoáng qua",
        artist: "Đinh Tùng Huy",
        src: "nguoi-la-thoang-qua"
    },
    {
        name: "Phận duyên lỡ làng",
        artist: "Phát Huy T4",
        src: "phan-duyen-lo-lang"
    },
    {
        name: "Quên Người Đã Quá Yêu",
        artist: "Hà Duy Thái",
        src: "quen-nguoi-da-qua-yeu"
    },
    {
        name: "thì thôi",
        artist: "Reddy",
        src: "thi-thoi"
    },
    {
        name: "yêu một người gian dối",
        artist: "Như Việt",
        src: "yeu-1-nguoi-gian-doi"
    },
];


const player = document.querySelector(".player"),
    wrapper = player.querySelector(".wrapper"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = player.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music"),
    closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

if (mainAudio.paused == false) {
    /*do something*/
    console.log('sfdfiwoeriuwer');

}

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    music_disc_add();
}

function music_disc_add() {
    const music_disc = document.querySelector('#app .music_disc'),
        need_img = music_disc.querySelector('.need_img'),
        disc_img = music_disc.querySelector('.disc_img');
    disc_img.classList.add("active");
    need_img.classList.add("active");

}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
    music_disc_remove();
}

function music_disc_remove() {
    const music_disc = document.querySelector('#app .music_disc'),
        need_img = music_disc.querySelector('.need_img'),
        disc_img = music_disc.querySelector('.disc_img');
    disc_img.classList.remove("active");
    need_img.classList.remove("active");

}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();

}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();

}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();

});



prevBtn.addEventListener("click", () => {
    prevMusic();
});

nextBtn.addEventListener("click", () => {
    nextMusic();
});



mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
    playingSong();
});

const repeatBtn = wrapper.querySelector("#repeat-plist"),
    repeatBtn_i = repeatBtn.querySelector("i");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn_i.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn_i.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            break;
        case "shuffle":
            repeatBtn_i.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

mainAudio.addEventListener("ended", () => {

    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});

moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});
const ulTag = musicList.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
    let liTag = `
        <li li-index="${i + 1}" class="item_music">
            <div class="description">
                <span>${allMusic[i].name}</span>
                <p>${allMusic[i].artist}</p>
            </div>
            <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
            <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
        </li>
    `;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        };
        liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
        liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}

function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");

    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}



////////////////////////////////////////////