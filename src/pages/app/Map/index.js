import {useState,useEffect,useRef} from 'react';
import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import TilesetMenu from '@/components/TilesetMenu';
import SatelliteMenu from '@/components/SatelliteMenu';
import tilesets from '../../../constants/tilesets';
import Sidebar from '@/components/Sidebar';
import LocationLabel from '@/components/LocationLabel';
import ButtonPitch from '@/components/ButtonPitch';


//Mapbox token
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;


const Map = ({location, address,handleChangue,handleSubmit,setHoverCoordinates,setHoverCurrentLocation}) => {

    //state
    const [tileAffecting,setTileAffecting] = useState([]); 
    const [pitch,setPitch] = useState(false);

    //Map's containers
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    //Use Effect for Map rendering, It only renders 1 time.
    useEffect(() => {
      mapContainer.current.innerHTML = '';
      var hoveredStateId = null;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/multitaskr/cli3pe0e700xd01podw5ufbfd',
        center: [location.lng, location.lat],
        zoom: 20,
        pitch: 0
      });

      marker.current = new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current);

      //load map
      map.current.on('load', () => {
          //load zoom controls
          map.current.addControl(new mapboxgl.NavigationControl());

          //ADDING  MAPBOX SOURCES & LAYERS .
          addParcelSource('city of san diego parcels','mapbox://multitaskr.citysandiego')
          addParcelFill('parcels-limit-fill','fill','city of san diego parcels','#DFCAEC',[ 'case',['boolean', ['feature-state', 'hover'], false],1,0]);
          addParcelLine('parcels-limit','line','city of san diego parcels','#740595',3,[2,2]);
         
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

         // layers order.
         map.current.moveLayer('parcels-limit-fill', 'building-extrusion');
         map.current.moveLayer('Drain Conveyance', 'Storm Water');
         map.current.moveLayer('Water Main', 'Drain Conveyance');
         map.current.moveLayer('Sewer Main', 'Sewer Manhole');
         map.current.moveLayer('Solid Report Conditional','building-extrusion');
         map.current.moveLayer('Fire Hazard Severity Zones','building-extrusion');
         map.current.moveLayer('Solid Report Required','building-extrusion');
      });

      //mouse move effect to hover the property
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

      //remove color hover
      map.current.on('mouseleave', 'parcels-limit-fill', function () {
        if (hoveredStateId) {
            map.current.setFeatureState({ 
              source: 'city of san diego parcels', 
              sourceLayer: 'citysandiego', 
              id: hoveredStateId 
              },
              { 
                hover: false 
              }
            );
        }
        hoveredStateId = null;
      });

      //get tilesets affecting the area
      map.current.once('idle', handleStyleData)
     
      //change location by hover.
      map.current.on('click','parcels-limit-fill', (e) => {
        getLocationHoverClick(e.lngLat.lng,e.lngLat.lat);
      });

      /*Changue pointer hover*/
      handleLinePointer('Water Main');
      handleLinePointer('Sewer Main');
      handleLinePointer('Drain Conveyance');

      /*get tilesets on clic parcel*/
      map.current.on('click',['Water Main','Sewer Main','Drain Conveyance'], (e) => {
        getAffectedTilesets(e.lngLat);
      });
      
      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }, []);

    //UseEffect for location, this useEffect only execute when you search another location in map window.
    useEffect(() => {
      if (map.current) {
        if (location.lng && location.lat) {
          marker.current.setLngLat([location.lng, location.lat]);
          map.current.flyTo({ center: [location.lng, location.lat]});
          map.current.once('idle',handleStyleData);
        }
      }
    }, [location]);

    //UseEffect for pitch, to changue the pitch.
    useEffect(() => {
      if (pitch) {
        map.current.setPitch(60);
      } else {
        map.current.setPitch(0);
      }
    }, [pitch]);





    //Function to get the tilesets in an array
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
      getAffectedTilesets(location);
    };

    //Display layers.
    function setLayerVisibility(layerName, isVisible) {
      const visibility = isVisible ? 'visible' : 'none';
      if (map.current) {
        map.current.setLayoutProperty(layerName, 'visibility', visibility);
      }
      map.current.once('idle',handleStyleData);
    }
   
    //Function to get location by click.
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

    //Adding sources to mapbox
    const addSources = (source,url_source) => {
      map.current.addSource(source,{
        type: 'vector',
        url: url_source
      });
    }

    const addParcelSource = (source,url_source) => {
      map.current.addSource(source, {
        type: 'vector',
        url: url_source
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
    //Adding line layers
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

    //Adding parcel limits fill
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

    const handleLinePointer = (layerId) => {
      map.current.on('mousemove',layerId, () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave',layerId, () => {
        map.current.getCanvas().style.cursor = '';
      })
    }


    return(
            <Layout>
                {/*Map container*/}
                <div 
                  className="h-screen w-[75%]"  
                  ref={mapContainer}>
                </div>
                
                {/*Tileset Menu*/}
                <TilesetMenu tilesetVisibility={setLayerVisibility}/>
                
                {/*Sidebar Information*/}
                <Sidebar 
                  form={handleChangue} 
                  formSubmit={handleSubmit} 
                  tilesets={tileAffecting}>
                </Sidebar>
                
                {/*Current Location*/}
                <LocationLabel 
                  currentAddress={address}>
                </LocationLabel>

                {/*Changue pitch*/}
                <ButtonPitch pitch={pitch}  setPitch={setPitch}/>

                {/*Change to satelite view*/}
                <SatelliteMenu satelliteVisibility={setLayerVisibility}/>
            </Layout>
    );
}

export default Map;