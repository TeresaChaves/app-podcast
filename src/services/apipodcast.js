const CORS_PROXY = "https://allorigins.win/get?url=";


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
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
                }
            });

            const dataFormat = await response.json();
            console.log("sdfsdf", dataFormat.feed.entry);

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
        const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
            }
        });

        const dataFormatDetail = await response.json();
        const podcastDetailList = dataFormatDetail.results;

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
        
        return results;
    } catch (error) {
        console.error('Ocurrió un error al obtener el detalle del podcast sin CORS:', error);
        
        // Intentar nuevamente con CORS
        try {
            const response = await fetch(`${CORS_PROXY}https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`, {
                method: 'GET'
            });

            const dataFormatDetail = await response.json();
            const podcastDetailList = dataFormatDetail.results;

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

            return results;
        } catch (error) {
            console.error('Ocurrió un error al obtener el detalle del podcast con CORS:', error);
            return null;
        }
    }
}


export { getListPodcast, getPodcastDetail };