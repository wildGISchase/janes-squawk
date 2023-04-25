    // TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1Ijoicm56ZWUiLCJhIjoiY2xnd3BsamtkMTJkZDNqa2xjaWhrcXY1dSJ9.Wnj9Xg4bX4AmEO05bTnTOw';
    
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-73.85778, 40.66912],
        maxZoom: 18,
        minZoom: 9,
        zoom: 11.15
    });

    const title = document.getElementById('location-title');
    const description = document.getElementById('location-description');

    const locations = [
        {
            'id': '1',
            'title': 'Fields',
            'description':
                'Among fields that have been cleared of trees and where new growth has occurred are grasslands. Although they are among the most endangered of habitats because of competition from development and remain rare even in New York City, infill sites that were underutilized have restored fields to the great benefit of nesting and migrating birds. Fields require maintenance for the managed growth and cultivation of native species as well as limited pesticide use. Where fields might meet another habitat, like a forest, the variety of plant species can attract more animals, including birds.',
            'camera': {
                center: [-73.75762, 40.76089],
                pitch: 33.00,
                zoom: 16.25
            }
        },
        {
            'id': '2',
            'title': 'Forests',
            'description':
                "Queens' forest land consists of a variety of species of trees of varying maturity. This enables a diversity of bird species to take shelter and sustenance in vegetation across different niches, from the tallest tree canopies to the undergrowth beneath. Forest Park, pictured here, is also on the site of an ancient glacier that left different elevations, resulting in present-day ponds, gullies, and one particularly popular “Water Hole” that draws migrating songbirds. To protect these critical breeding grounds and stopover locations for migrating birds, forest conservation is a necessity.",
            'camera': {
                center: [-73.85413, 40.70115],
                pitch: 33.00,
                zoom: 14.25
            }
        },
        {
            'id': '3',
            'title': 'Freshwater',
            'description':
                "Freshwater habitats include lakes, ponds, and cattail marshes. Flushing Meadows-Corona Park's Willow Lake, pictured here, and the marshes and meadows around it attract waterfowl, hawks, and other animals. Like the other habitats, freshwater wetlands are both home to native species and a migratory stop along the Atlantic flyway. Today, just one percent of the city's historical wetlands remain, a sobering statistic given their important roles in ecosystems and stormwater flood mitigation.",
            'camera': {
                center: [-73.83316, 40.72338],
                pitch: 33.00,
                zoom: 14.25
            }
        },
        {
            'id': '4',
            'title': 'Salt Marshes',
            'description':
                "Vegetation in salt marshes have acclimated to both freshwater and saltwater and some segments will also regularly submerge under water. One particular species of grass, saltmarsh cordgrass, thrives in sediment-rich deposits along the shore and provides the added benefit of acting as a natural filtration system for debris, producing mud that adds biodiversity. Like fields, many of which were once salt marshes themselves, they are also at edges where one habitat will transition to another. Wetlands such as these have to contend not only with pollution and runoff that introduces additional debris in the water, but also impermeable development that continues to be built atop vulnerable watersheds.",
            'camera': {
                center: [-73.74585, 40.77927],
                pitch: 33.00,
                zoom: 16.25
            }
        },
        {
            'id': '5',
            'title': 'Seashore',
            'description':
                'The Rockaway Penninsula is particularly a hotspot for migratory birds in autumn. Unfortunately, certain species of birds that nest along beaches are threatened by encroaching human activity. On the southern side of the Breezy Point neighborhood is a federally designated protected area for piping plovers, a threatened or endangered species that has all but disappeared from some of its other habitats in the U.S.',
            'camera': {
                center: [-73.92195, 40.55287],
                pitch: 33.00,
                zoom: 14.25
            }
        },
        {
            'title': 'Queens Bird Habitats and Springtime Hotspots',
            'description':
                'New York City is made up of five boroughs: the Bronx, Brooklyn, Manhattan, Queens and Staten Island. Each one has enough attractions—and enough personality—to be a city all its own.',
            'camera': {
                center: [-73.85778, 40.66912],
                zoom: 11.15,
                bearing: 0,
                pitch: 0
            }
        }
    ];

    function highlightBorough(code) {
        // Only show the polygon feature that corresponds to `borocode` in the data.
        map.setFilter('highlight', ['==', 'borocode', code]);
    }

    function playback(index) {
        title.textContent = locations[index].title;
        description.textContent = locations[index].description;

        highlightBorough(locations[index].id ? locations[index].id : '');

        // Animate the map position based on camera properties.
        map.flyTo(locations[index].camera);

        map.once('moveend', () => {
            // Duration the slide is on screen after interaction.
            window.setTimeout(() => {
                // Increment index, looping back to the first after the last location.
                index = (index + 1) % locations.length;
                playback(index);
            }, 3000); // After callback, show the location for 3 seconds.
        });
    }

    // Display the last title/description first.
    title.textContent = locations[locations.length - 1].title;
    description.textContent = locations[locations.length - 1].description;

    map.on('load', () => {
        map.addSource('boroughs', {
            'type': 'vector',
            'url': 'mapbox://mapbox.8ibmsn6u'
        });
        map.addLayer(
            {
                'id': 'highlight',
                'type': 'fill',
                'source': 'boroughs',
                'source-layer': 'original',
                'paint': {
                    'fill-color': '#fd6b50',
                    'fill-opacity': 0.25
                },
                'filter': ['==', 'borocode', '']
            },
            'road-label' // Place polygon under labels.
        );

        // Start the playback animation for each borough.
        playback(0);
    });