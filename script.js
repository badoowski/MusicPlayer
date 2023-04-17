const container = document.querySelector('#background')
        const thumbnail = document.querySelector('#thumbnail')
        const artist = document.querySelector('#artist')
        const songTitle = document.querySelector('#song-title')
        const progressBar = document.querySelector('#progress-bar')
        const currentTime = document.querySelector('.currentTime')
        const durationTime = document.querySelector('.durationTime')
        const playBtn = document.querySelector('#play')
        const backwardBtn = document.querySelector('#backward')
        const forwardBtn = document.querySelector('#forward')
        const music = document.querySelector('audio')
        const nowPlaying = document.getElementById('now-playing')

        let isPlaying = false
        songIndex = 0
        const song = [
            {
                name: 'jacinto-1',
                displayName: 'Reggae Fusion',
                artist: 'Jacinto Design',
            },
            {
                name: 'jacinto-2',
                displayName: 'Seven Nation Army (Remix)',
                artist: 'Jacinto Design',
            },
            {
                name: 'jacinto-3',
                displayName: 'Goodnight, Disco Queen',
                artist: 'Jacinto Design',
            },
            {
                name: 'metric-1',
                displayName: 'Front Row (Remix)',
                artist: 'Metric/Jacinto Design',
            },
          
        ]

        const playMusic = () =>{
            isPlaying = true
            playBtn.src = "./assests/icons/pause.png"
            playBtn.setAttribute('title', 'Pause')
            nowPlaying.textContent = 'Now Playing'
            thumbnail.style.transform = "translateY(-20px)"
            music.play()
        }

        const pauseSong = () => {
            isPlaying = false
            nowPlaying.innerHTML = ''
            playBtn.src = './assests/icons/play.png'
            playBtn.setAttribute('title', 'Play')
            thumbnail.style.transform = "scale(1)"
            music.pause()
        }
        

        const loadSong = (song) => {
            songTitle.textContent = song.displayName
            artist.textContent = song.artist
            music.src = `./assests/music/${song.name}.mp3`
            thumbnail.src = `./assests/img/${song.name}.jpg`
            container.src = `./assests/img/${song.name}.jpg`
            return music.src
        }

        const nextSong = () => {
            songIndex++
            if (songIndex > song.length - 1) {
                songIndex = 0
            }
            loadSong(song[songIndex])
            playMusic()
        }

        const prevSong = () => {
            songIndex--
            if (songIndex < 0) {
                songIndex = song.length - 1
            }
            loadSong(song[songIndex])
            playMusic()
        }
        loadSong(song[songIndex])

        music.addEventListener('loadedmetadata', function () {
            if (music.duration == Infinity) {
                music.currentTime = 1e101;
                music.ontimeupdate = () => {
                    this.ontimeupdate = () => {
                        return;
                    }
                    music.currentTime = 0;
                    return;
                }
            }
        });
       
        function updateProgressValue () {
    progressBar.max = music.duration
    progressBar.value = music.currentTime;
    const durationMinutes = Math.floor(music.duration / 60)
                let durationSeconds = Math.floor(music.duration % 60)
                if(durationSeconds < 10){
                    durationSeconds = `0${durationSeconds}`
                }
                if(durationSeconds){
                    durationTime.innerHTML = `${durationMinutes}:${durationSeconds}`
                }

                const currentMinutes = Math.floor(music.currentTime / 60)
                let currentSeconds = Math.floor(music.currentTime % 60)
                if(currentSeconds < 10){
                    currentSeconds = `0${currentSeconds}`
                }
                if(currentSeconds){
                    currentTime.innerHTML = `${currentMinutes}:${currentSeconds}`
                }
}


        playBtn.addEventListener('click', () => {
            isPlaying ? pauseSong() : playMusic()
        })

        setInterval(updateProgressValue, 500)
        
        const changeProgressBar = () => {
    music.currentTime = progressBar.value
}

        backwardBtn.addEventListener('click', prevSong)
        forwardBtn.addEventListener('click', nextSong)
        music.addEventListener('ended', nextSong)
        progressBar.addEventListener('click', changeProgressBar)
