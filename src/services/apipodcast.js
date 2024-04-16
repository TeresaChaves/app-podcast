


async function getListPodcast() {
    try {
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        const dataFormat = await response.json()

            const results = dataFormat.feed.entry.map((podcast) => ({
         id: podcast.id.attributes['im:id'],
         name: podcast['im:name'].label,
         description: podcast.summary.label,
         img: podcast['im:image'][2].label,
        author: podcast['im:artist'].label
    }
            ));
            return results
  } catch (error) {
        console.error('Ocurrió un error:', error);
    }


} 

export { getListPodcast};