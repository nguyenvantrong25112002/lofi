$(function() {

    $(window).on('load', function() {
        $('.loading').addClass('loaded');
        renderVideoBgr();

    });

    var clock;

    $(document).ready(function() {
        clock = $('.clock').FlipClock({
            clockFace: 'TwentyFourHourClock'
        });
    });

    $(document).ready(function() {
        var rain_city_mp3 = $('#rain_city_mp3');
        var city_traffic_mp3 = $('#city_traffic_mp3');
        var player_audio = $('#player_audio');
        var time_delay = 1000;
        $('#city_rain').click(function(e) {
            e.preventDefault();
            var data = $(this).attr("data-audio_on_off");
            day_night_rainny = $('#app').attr('data-day_night_rainny');
            day_night = $('#app').attr('data-day_night');
            if (data == "off") {
                rain_city_mp3.trigger('play');
                $(this).attr('data-audio_on_off', 'on');
                $("#city_rain_icon").addClass('fade-loading');
                $("#city_rain_icon").empty();
                $("#city_rain_icon").html('<i class="icofont-volume-down"></i>');
                setTimeout(() => {
                    $("#city_rain-range").removeClass('city_range_none');
                }, time_delay);
            } else {
                rain_city_mp3.trigger('pause');
                $(this).attr('data-audio_on_off', 'off');
                $("#city_rain_icon").removeClass('fade-loading');
                $("#city_rain_icon").empty();
                $("#city_rain_icon").html('<i class="icofont-volume-mute"></i>');
                $("#city_rain-range").addClass('city_range_none');
            }

            if (day_night_rainny === 'day_rainny') {
                $(".videoOut").removeClass('active');
                $('.videoOut' + '#' + day_night_rainny).addClass('active');
                $('#app').attr('data-day_night_rainny', day_night);

            } else if (day_night_rainny === 'day_sunny') {
                $(".videoOut").removeClass('active');
                $('.videoOut' + '#' + day_night_rainny).addClass('active');
                $('#app').attr('data-day_night_rainny', 'day_rainny');

            }


            if (day_night_rainny === 'night_rainny') {
                $(".videoOut").removeClass('active');
                $('.videoOut' + '#' + day_night_rainny).addClass('active');
                $('#app').attr('data-day_night_rainny', day_night);
            } else if (day_night_rainny === 'night_clear') {
                $(".videoOut").removeClass('active');
                $('.videoOut' + '#' + day_night_rainny).addClass('active');
                $('#app').attr('data-day_night_rainny', 'night_rainny');
            }

        });

        $('#city_traffic').click(function(e) {
            e.preventDefault();
            var data = $(this).attr("data-audio_on_off");

            if (data == "off") {
                city_traffic_mp3.trigger('play');
                $(this).attr('data-audio_on_off', 'on');
                $("#city_traffic_icon").addClass('fade-loading');
                $("#city_traffic_icon").empty();
                $("#city_traffic_icon").html('<i class="icofont-volume-down"></i>');
                setTimeout(() => {
                    $("#city_traffic-range").removeClass('city_range_none');
                }, time_delay);

            } else {
                city_traffic_mp3.trigger('pause');
                $(this).attr('data-audio_on_off', 'off');
                $("#city_traffic_icon").removeClass('fade-loading');
                $("#city_traffic_icon").empty();
                $("#city_traffic_icon").html('<i class="icofont-volume-mute"></i>');
                $("#city_traffic-range").addClass('city_range_none');

            }

        });

        $(document).ready(function() {
            $('.volume_city_rain-range').on('change', function(e) {
                e.preventDefault();
                val = $(this).val();
                rain_city_mp3.prop("volume", val);
            });
            $('.volume_city_traffic-range').on('change', function(e) {
                e.preventDefault();
                val = $(this).val();
                city_traffic_mp3.prop("volume", val);
            });
        });

        $(document).ready(function() {
            const settings = {
                fill: '#1abc9c',
                background: '#d7dcdf'
            }
            const sliders = document.querySelectorAll('.range-slider');
            Array.prototype.forEach.call(sliders, (slider) => {
                slider.querySelector('input').addEventListener('input', (event) => {
                    applyFill(event.target);
                });
                applyFill(slider.querySelector('input'));
            });

            function applyFill(slider) {
                const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
                const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
                slider.style.background = bg;
            }
        });



        $(document).ready(function() {

            $('.nav-action .day-night #day-night-toggle').change(function(e) {
                e.preventDefault();
                var val_day_night = $(this).val();

                if (val_day_night === 'night_clear') {
                    $(".videoOut").removeClass('active');
                    $('.videoOut' + '#' + val_day_night).addClass('active');
                    $(this).attr('value', 'day_sunny');
                    $('#app').attr('data-day_night_rainny', 'night_rainny');
                    $('#app').attr('data-day_night', val_day_night);
                    $('#app').removeClass('day');
                    $('#app').addClass('night');
                } else if (val_day_night === 'day_sunny') {
                    $(".videoOut").removeClass('active');
                    $('.videoOut' + '#' + val_day_night).addClass('active');
                    $(this).attr('value', 'night_clear');
                    $('#app').attr('data-day_night_rainny', 'day_rainny');
                    $('#app').attr('data-day_night', val_day_night);
                    $('#app').removeClass('night');
                    $('#app').addClass('day');

                }
                rain_city_mp3_pause()
            });
        });

        $(document).ready(function() {
            $('.player .volume_player_audio-range').on('change', function(e) {
                e.preventDefault();
                val = $(this).val();
                player_audio.prop("volume", val);
            });
        });
        $(document).ready(function() {
            function toggleFullscreen(elem) {
                elem = elem || document.documentElement;
                if (!document.fullscreenElement && !document.mozFullScreenElement &&
                    !document.webkitFullscreenElement && !document.msFullscreenElement) {
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }

            document.getElementById('btnFullscreen').addEventListener('click', function() {
                toggleFullscreen();
            });


        });

        function rain_city_mp3_pause() {
            rain_city_mp3.trigger('pause');
            $('#city_rain').attr('data-audio_on_off', 'off');
            $("#city_rain_icon").removeClass('fade-loading');
            $("#city_rain_icon").empty();
            $("#city_rain_icon").html('<i class="icofont-volume-mute"></i>');
            $("#city_rain-range").addClass('city_range_none');
        }
    });
    // slide bar
    $(document).ready(function() {
        const nav__items = document.querySelectorAll("div.nav__item");

        function ActiveLink() {
            nav__items.forEach((item) => {
                item.classList.remove("active");
                this.classList.add("active");
            });
        }
        nav__items.forEach((item) => {
            item.addEventListener("click", ActiveLink);
        });

    });

    $(document).ready(function() {
        $('.checkbox_slidebar .check_slidebar').on('click', function(e) {
            e.preventDefault();
            $('.checkbox_slidebar .slide-bar').toggleClass('active');
            $('.checkbox_slidebar button.check_slidebar').toggleClass('active');
        });
    });

});




$(function() {
    const sounds = [{
            id: 'sound_1',
            icon: ' <i class="icofont-bird"></i>',
            src: './assets/musics/birds.mp3',
        },
        {
            id: 'sound_2',
            icon: ' <i class="icofont-feedburner"></i>',
            src: './assets/musics/fireplace.mp3',
        },
        {
            id: 'sound_3',
            icon: '<i class="icofont-night"></i>',
            src: './assets/musics/forest_night.mp3',
        },
        {
            id: 'sound_4',
            icon: '<i class="icofont-wave"></i>',
            src: './assets/musics/ocean.mp3',
        },
        {
            id: 'sound_5',
            icon: '<i class="icofont-wind-scale-0"></i>',
            src: './assets/musics/snow.mp3',
        },
        {
            id: 'sound_6',
            icon: ' <i class="icofont-users-social"></i>',
            src: './assets/musics/people_talk_inside.mp3',
        },
        {
            id: 'sound_7',
            icon: '<i class="icofont-rainy"></i>',
            src: './assets/musics/wind.mp3',
        },

    ];
    let _html_sound = ``;
    const sound_result = $('.slide-bar #sound_result');
    sounds.forEach(key => {
        _html_sound += `<div class="nav__item ">`;
        _html_sound += ` <div data-token_icon="on" data-sound_id="${key.id}" class="nav__item-icon ${key.id}">${key.icon}</i></div>`;
        _html_sound += `<div class="nav__item-name">`;
        _html_sound += ` <i class="icofont-volume-mute"></i>`;
        _html_sound += ` <div class="range-slider">`;
        _html_sound += ` <input  data-id_sound="${key.id}" class="sound_volume range-slider__range " type="range" type="range" min="0" max="1" step="0.000000000000001" value="1">`;
        _html_sound += `  </div>`;
        _html_sound += ` <i class="icofont-audio"></i>`;
        _html_sound += ` </div>`;
        _html_sound += `<audio id="${key.id}"  hidden loop>`;
        _html_sound += ` <source src="${key.src}" type="audio/ogg">`;
        _html_sound += ` <source src="${key.src}"  type="audio/mpeg">`;
        _html_sound += ` Your browser does not support the audio element.`;
        _html_sound += ` </audio>`;
        _html_sound += ` </div>`;
    });
    sound_result.html(_html_sound);

});
$(document).ready(function() {
    $('.checkbox_slidebar .nav__item .nav__item-icon').on('click', function(e) {
        e.preventDefault();
        token_icon = $(this).attr('data-token_icon');
        sound_id = $(this).attr('data-sound_id');
        $(this).toggleClass('click');
        if (token_icon === 'on') {
            audio = $('.checkbox_slidebar .nav__item #' + sound_id);
            audio.trigger('play');
            $('.checkbox_slidebar .nav__item .nav__item-icon' + '.' + sound_id).attr('data-token_icon', 'off');
        } else if (token_icon === 'off') {
            audio = $('.checkbox_slidebar .nav__item #' + sound_id);
            audio.trigger('pause');
            $('.checkbox_slidebar .nav__item .nav__item-icon' + '.' + sound_id).attr('data-token_icon', 'on');
        }

    });
    $('.checkbox_slidebar .nav__item .sound_volume').change(function(e) {
        e.preventDefault();
        let val = $(this).val();
        let id_sound = $(this).attr('data-id_sound');
        let audio_id_sound = $('.checkbox_slidebar .nav__item #' + id_sound);
        audio_id_sound.prop("volume", val);
        // audio_id_sound.trigger('play');
    });

    // $('.checkbox_slidebar').blur(function(e) {
    //     e.preventDefault();
    //     alert('a');
    // });
    $("#sound_result .nav__item").mouseleave(function() {
        // alert("mouseleave");
        $(this).removeClass('active');

    });
});