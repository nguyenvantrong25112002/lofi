let allBgr = [{
        id: 1,
        src: "./assets/video/1.mp4",
        preview: "./assets/video/preview/1.png"
    },
    {
        id: 2,
        src: "./assets/video/2.mp4",
        preview: "./assets/video/preview/2.jpg"

    },
    {
        id: 3,
        src: "./assets/video/3.mp4",
        preview: "./assets/video/preview/3.png"
    },
    {
        id: 4,
        src: "./assets/video/4.mp4",
        preview: "./assets/video/preview/4.png"
    },
    {
        id: 5,
        src: "./assets/video/5.mp4",
        preview: "./assets/video/preview/5.png"
    },
    {
        id: 6,
        src: "./assets/video/6.mp4",
        preview: "./assets/video/preview/6.png"
    },
    {
        id: 7,
        src: "./assets/video/7.mp4",
        preview: "./assets/video/preview/7.png"
    },
    {
        id: 8,
        src: "./assets/video/8.mp4",
        preview: "./assets/video/preview/8.png"
    },
    {
        id: 9,
        src: "./assets/video/9.mp4",
        preview: "./assets/video/preview/9.jpg"
    },
    {
        id: 10,
        src: "./assets/video/10.mp4",
        preview: "./assets/video/preview/10.jpg"
    },
    {
        id: 11,
        src: "./assets/video/11.mp4",
        preview: "./assets/video/preview/11.png"
    },
    {
        id: 12,
        src: "./assets/video/12.mp4",
        preview: "./assets/video/preview/12.png"
    },
    {
        id: 13,
        src: "./assets/video/13.mp4",
        preview: "./assets/video/preview/13.png"
    },
];

var checkbox_slidebar_video = document.querySelector('.checkbox_slidebar_video'),
    video_result = checkbox_slidebar_video.querySelector('#video_result');

function start() {
    renderVideoBgr();
    slidebar_video_check_btn();
    // getVideoActive();
}
start();

function renderVideoBgr() {
    const htmls = allBgr.map(function(key) {
        return `
            <div data-id_video_bgr='video_bgr_${key.id}' onclick="change_bgr_video(this)" class="nav__item">
                <img data-src_video_bgr="${key.src}" id="video_bgr_${key.id}" class="video_bgr" src="${key.preview}"> 
                </img>
            </div>
        `;
    });
    let _html = htmls.join('');
    video_result.innerHTML = _html;
}

function getVideoActive() {
    const app = document.querySelector('#app'),
        container_video = app.querySelector('.container-video'),
        videoOut_active = container_video.querySelector('.videoOut.active');
}

function change_bgr_video(e) {
    let id_video_bgr = e.getAttribute("data-id_video_bgr");
    let src = getVideo(id_video_bgr);
    videoMain_addActive(src);
    $('.checkbox_slidebar_video .slide-bar_bgr').toggleClass('active');
    return;
}

function videoMain_addActive(src) {
    const app = document.querySelector('#app'),
        container_video = app.querySelector('.container-video'),
        videoMain = container_video.querySelector('#main_video'),
        videoOut_active = container_video.querySelector('.videoOut.active'),
        source_active = videoMain.querySelector('source');
    videoOut_active.classList.remove("active");
    source_active.setAttribute('src', src);
    setTimeout(() => {
        videoMain.classList.remove("active");
        videoMain.classList.add("active");
        videoMain.load();
    }, 500);
    videoMain.play();
    // console.log(source_active);
}

function getVideo(id) {
    const nav_item_audio = video_result.querySelectorAll(".nav__item");
    for (let j = 0; j < nav_item_audio.length; j++) {

        if (nav_item_audio[j].getAttribute("data-id_video_bgr") == id) {
            let videoTag = nav_item_audio[j].querySelector("#" + id);
            // console.log(videoTag);
            let linkvideo = videoTag.getAttribute("data-src_video_bgr");
            return linkvideo;
        }
    }
}

function slidebar_video_check_btn() {
    $('.checkbox_slidebar_video .check_slidebar').on('click', function(e) {
        e.preventDefault();
        $('.checkbox_slidebar_video .slide-bar_bgr').toggleClass('active');
        $('.checkbox_slidebar_video button.check_slidebar').toggleClass('active');
    });
}