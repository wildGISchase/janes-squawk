    // TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoibWFzLW55YyIsImEiOiJjbGVpbnlhYzYwMzc5M3BudmlzbHF5MXNuIn0.nDBUmbAhFgGtOnZIBBqh0g';
    
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-74.0315, 40.6989],
        maxZoom: 16,
        minZoom: 9,
        zoom: 9.68
    });

    const title = document.getElementById('location-title');
    const description = document.getElementById('location-description');

    const locations = [
        {
            'id': '2',
            'title': 'The Bronx',
            'description':
                "This is where hip-hop was born, where the Yankees became a dynasty and where you can find New York City's leading zoo and botanical garden.",
            'camera': {
                center: [-73.8709, 40.8255],
                zoom: 12.21,
                pitch: 50
            }
        },
        {
            'id': '3',
            'title': 'Brooklyn',
            'description':
                "No matter how hip it looks on TV, NYC's most populous borough is best experienced in person. Read on to find out about live music, Prospect Park, Nets basketball and more.",
            'camera': {
                center: [-73.9499, 40.626],
                bearing: -8.9,
                zoom: 11.68
            }
        },
        {
            'id': '1',
            'title': 'Manhattan',
            'description':
                'Even if you think you know Manhattan—its world-class museums, fine dining and unforgettable views—the borough always has something new and exciting in store.',
            'camera': {
                center: [-74.007, 40.7437],
                bearing: 25.3,
                zoom: 11.5
            }
        },
        {
            'id': '4',
            'title': 'Queens',
            'description':
                "Taste food from around the globe, watch Mets baseball and US Open tennis, see cutting-edge art and more in one of the world's most diverse places.",
            'camera': {
                center: [-73.8432, 40.6923],
                bearing: 36,
                zoom: 11.37
            }
        },
        {
            'id': '5',
            'title': 'Staten Island',
            'description':
                'Take a free ferry ride to an island getaway filled with historic architecture, stunning views, gardens and many family-friendly attractions.',
            'camera': {
                center: [-74.1991, 40.5441],
                bearing: 28.4,
                zoom: 11.64
            }
        },
        {
            'title': 'Boroughs of new york',
            'description':
                'New York City is made up of five boroughs: the Bronx, Brooklyn, Manhattan, Queens and Staten Island. Each one has enough attractions—and enough personality—to be a city all its own.',
            'camera': {
                center: [-74.0315, 40.6989],
                zoom: 9.68,
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