

async function getListPodcast() {
    try {
        const storedData = localStorage.getItem('podcastsData');
        const storedTimestamp = localStorage.getItem('podcastsTimestamp');
        const currentTime = new Date().getTime();
        const oneDayInMillis = 24 * 60 * 60 * 1000; 

        if (storedData && currentTime - storedTimestamp < oneDayInMillis) {
            return JSON.parse(storedData);
        } else {
            const response = await fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json", {
             });

            const dataFormat = await response.json();

            const results = dataFormat.feed.entry.map((podcast) => ({
                id: podcast.id.attributes['im:id'],
                name: podcast['im:name'].label,
                description: podcast.summary.label,
                img: podcast['im:image'][2].label,
                author: podcast['im:artist'].label
            }));

            localStorage.setItem('podcastsData', JSON.stringify(results));
            localStorage.setItem('podcastsTimestamp', currentTime);

            return results;
        }
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}

async function getPodcastDetail(podcastId) {

   


    try {
         const storedData = localStorage.getItem(`podcastDetail_${podcastId}`);
        const storedTimestamp = localStorage.getItem('podcastsTimestamp');
        const currentTime = new Date().getTime();
        const oneDayInMillis = 24 * 60 * 60 * 1000; 

        if (storedData && currentTime - storedTimestamp < oneDayInMillis) {
            return JSON.parse(storedData);
        } else {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            const dataString = data.contents;
            const dataObject = JSON.parse(dataString);
            const podcastDetailList = dataObject.results;
            const results = podcastDetailList.map((podcastDetail) => ({
                artistName: podcastDetail.artistName,
                collectionId: podcastDetail.collectionId,
                collectionTitle: podcastDetail.collectionName,
                artworkUrl600: podcastDetail.artworkUrl600,
                description: podcastDetail.description,
                shortDescription: podcastDetail.shortDescription,
                trackTitle: podcastDetail.trackName,
                trackTimeMillis: podcastDetail.trackTimeMillis,
                releaseDate: podcastDetail.releaseDate,
                trackId: podcastDetail.trackId,
                previewUrl: podcastDetail.previewUrl
            }));
            localStorage.setItem(`podcastDetail_${podcastId}`, JSON.stringify(results));
            localStorage.setItem('podcastsTimestamp', currentTime);
            return results;
        }
    } catch (error) {
        console.error('Ocurrió un error al obtener el detalle del podcast:', error);
        throw error; // Re-lanza el error para que lo maneje el código que llama a esta función
    }
}

export { getListPodcast, getPodcastDetail };