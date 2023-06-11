import { useState, useEffect, useRef } from 'react';
import tilesets from "@/constants/tilesets";
import mapboxgl from 'mapbox-gl';


export const useTilesets = (coordinates, setHoverCoordinates,setHoverCurrentLocation) => {
    
    //state
    const [tileAffecting,setTileAffecting] = useState([]); 
    const [pitch,setPitch] = useState(false);

    //references
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    useEffect(() => {
        mapContainer.current.innerHTML = '';
        var hoveredStateId = null;
       
        map.current = new mapboxgl.Map({ 
            container: mapContainer.current,
            style: 'mapbox://styles/multitaskr/cli3pe0e700xd01podw5ufbfd',
            center: [coordinates.lng, coordinates.lat],
            zoom: 20,
            pitch: 0
        });

        //marker on coordinates
        marker.current = new mapboxgl.Marker().setLngLat([coordinates.lng, coordinates.lat]).addTo(map.current);

        //load map data
        map.current.on('load', () => {
            map.current.addControl(new mapboxgl.NavigationControl());
          
            //adding special source & layer
            addParcelSource('city of san diego parcels','mapbox://multitaskr.citysandiego')
            addParcelFill('parcels-limit-fill','fill','city of san diego parcels','#DFCAEC',[ 'case',['boolean', ['feature-state', 'hover'], false],1,0]);
            addParcelLine('parcels-limit','line','city of san diego parcels','#740595',3,[2,2]);
            

            //adding interactive tilesets & sources
            tilesets.content.map((data) => {
                addSources(data.source,data.url);
                
                if(data.type == 'circle'){
                  addCircleLayer(data.id,data.type,data.source,data.properties.radius,data.properties.color,data.properties.strokeColor,data.properties.strokeWidth);
                }else if(data.type == 'line'){
                  addLineLayer(data.id,data.type,data.source,data.properties.lineColor,data.properties.lineWidth);
                }else if(data.type == 'fill'){
                  addFillLayer(data.id,data.type,data.source,data.properties.color, data.properties.opacity);
                }
            });

            //moving layer position
            map.current.moveLayer('parcels-limit-fill', 'building-extrusion');
            map.current.moveLayer('Drain Conveyance', 'Storm Water');
            map.current.moveLayer('Water Main', 'Drain Conveyance');
            map.current.moveLayer('Sewer Main', 'Sewer Manhole');
            map.current.moveLayer('Solid Report Conditional','building-extrusion');
            map.current.moveLayer('Fire Hazard Severity Zones','building-extrusion');
            map.current.moveLayer('Solid Report Required','building-extrusion');
        });

        //Hover effect
        map.current.on('mousemove', 'parcels-limit-fill', function (e) {
            if (e.features.length > 0) {
              if (hoveredStateId) { 
                map.current.setFeatureState(
                  { 
                    source: 'city of san diego parcels', 
                    sourceLayer: 'citysandiego', 
                    id: hoveredStateId 
                  },
                  { 
                    hover: false
                  }
                );
              }
              hoveredStateId = e.features[0].id;
              map.current.setFeatureState({ 
                source: 'city of san diego parcels', 
                sourceLayer: 'citysandiego', 
                id: hoveredStateId 
              },
              { 
                hover: true 
              });
            }
          });

        //Remove Hover Effect
        map.current.on('mouseleave', 'parcels-limit-fill', function () {
          if (hoveredStateId) {
              map.current.setFeatureState({ 
                source: 'city of san diego parcels', 
                sourceLayer: 'citysandiego', 
                id: hoveredStateId 
              },
              { 
                hover: false 
              });
          }
          hoveredStateId = null;
        });

        //Getting tilesets on coordinates when the map load first time.
        map.current.once('idle', handleStyleData)

        //Change location on click
        map.current.on('click','parcels-limit-fill', (e) => {
              getLocationHoverClick(e.lngLat.lng, e.lngLat.lat);
        });

        //change pointer.
        handleLinePointer('Water Main');
        handleLinePointer('Sewer Main');
        handleLinePointer('Drain Conveyance');

        //getting tilesets in line layers
        map.current.on('click',['Water Main','Sewer Main','Drain Conveyance'], (e) => {
          getAffectedTilesets(e.lngLat);
        });

        return () => {
          if (map.current) {
            map.current.remove();
          }
        };
    },[]);
    
    useEffect(() => {
        if (map.current) {
          if (coordinates.lng && coordinates.lat) {
            marker.current.setLngLat([coordinates.lng, coordinates.lat]);
            map.current.flyTo({ center: [coordinates.lng, coordinates.lat]});
            map.current.once('idle',handleStyleData);
          }
        }
      }, [coordinates]);

    useEffect(() => {
      if (pitch) {
        map.current.setPitch(60);
      } else {
          map.current.setPitch(0);
      }
    }, [pitch]);


    //Adding parcel source
    const addParcelSource = (source,url_source) => {
        map.current.addSource(source, {
          type: 'vector',
          url: url_source
        });
    }

    //Adding interactive sources
    const addSources = (source,url_source) => {
        map.current.addSource(source,{
          type: 'vector',
          url: url_source
        });
    }

    //Adding parcel fill layer to hover effect
    const addParcelFill = (layerId,layerType,layerSource,color,opacity) => {
      map.current.addLayer({
        'id': layerId,
        'type': layerType,
        'source': layerSource,'source-layer': 'citysandiego',
        'paint': {
          'fill-color': color,
          'fill-opacity':  opacity
        }
      });
    }

    //Adding parcel line limit layer
    const addParcelLine = (layerId,layerType,layerSource,color,width,dash) => {
      map.current.addLayer({
        id: layerId,
        type: layerType,
        source: layerSource, 'source-layer': 'citysandiego',
          'paint': {
            'line-color': color,
            'line-width': width,
            'line-dasharray': dash
          }
      });
    }

    //Adding circle layers
    const addCircleLayer = (layerId,layerType,layerSource,radius,color,strokeColor,strokeWidth) => {
      map.current.addLayer({
        id : layerId,
        type: layerType,
        source: layerSource, 'source-layer': layerSource,
          'paint': {
            'circle-radius': radius,
            'circle-color': color,
            'circle-stroke-color' : strokeColor,
            'circle-stroke-width' : strokeWidth
          }
      });
    }

    //Adding line layers.
    const addLineLayer = (layerId,layerType,layerSource,lineColor,lineWidth) => {
      map.current.addLayer({
        id: layerId,
        type: layerType,
        source: layerSource, 'source-layer': layerSource,
          'paint': {
                'line-color': lineColor,
                'line-width': lineWidth
          }
      });
    }

    //Adding fill layers
    const addFillLayer = (layerId,layerType,layerSource, color, opacity) => {
      map.current.addLayer({
        'id': layerId,
        'type': layerType,
        'source': layerSource,'source-layer': layerSource,
        'paint': {
          'fill-color': color,
          'fill-opacity':  opacity
        }
      });
    }

    //change pointer & hide parcel fill.
    const handleLinePointer = (layerId) => {
      map.current.on('mousemove',layerId, () => {
        map.current.setLayoutProperty('parcels-limit-fill', 'visibility', 'none');
        map.current.getCanvas().style.cursor = 'pointer';
      });
  
      map.current.on('mouseleave',layerId, () => {
        map.current.setLayoutProperty('parcels-limit-fill', 'visibility', 'visible');
        map.current.getCanvas().style.cursor = '';
      });
    }

    //getting affecting tilesets on coordinates
    const getAffectedTilesets = (location) => {
      let point = map.current.project(location);
        
      const tilesetsOnMap = map.current.queryRenderedFeatures(point);
      const tilesetProperties = ['id', 'layer', 'properties'];
      
      const displayFeatures = tilesetsOnMap
      .map((feat) => {
        const displayFeat = {};
      
        tilesetProperties.forEach((prop) => {
            displayFeat[prop] = feat[prop];
        });
      
        return displayFeat;
      })
      .filter((feat, index, self) => {
        // Filter duplicate tilesets
        return index === self.findIndex((t) => t.layer.id === feat.layer.id);
      });
      
      // do the object array with tilesets
      const description = displayFeatures
        .map((feat) => {
          const id = feat.id;
          const name = feat.layer.id;
          const properties = Object.entries(feat.properties);
      
          return { id, name, properties };
        })
        .filter((feat) => {
          return tilesets.content.some((item) => item.id === feat.name);
        });
      
      setTileAffecting(description);
    };

    const handleStyleData = () => {
      getAffectedTilesets(coordinates);
    };

    //handle layer visibility
    function setLayerVisibility(layerName, isVisible) {
      const visibility = isVisible ? 'visible' : 'none';
      if (map.current) {
        map.current.setLayoutProperty(layerName, 'visibility', visibility);
      }
        map.current.once('idle',handleStyleData);
    }

    //Change location on click
    const getLocationHoverClick = async (longitude,latitude) => {
     
        try{
          const bbox = '-124.409619,32.534156,-114.131211,42.009518';
          const res = await fetch(`${process.env.GEOCODING_URL}mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_TOKEN}&country=us&bbox=${bbox}`);
          const data = await res.json();
  
          setHoverCoordinates({
            lng: data.features[0].center[0],
            lat: data.features[0].center[1]
          });
  
          setHoverCurrentLocation(data.features[0].place_name);
  
        }catch(error){
          console.log(error);
        }
    }
    
    return { mapContainer,map,marker,pitch,setPitch,tileAffecting, setLayerVisibility }
}
