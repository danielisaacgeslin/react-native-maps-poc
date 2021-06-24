import React, { useMemo, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, View, Text } from 'react-native';
import MapView from 'react-native-map-clustering';
import MapViewBase, { Marker } from 'react-native-maps';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  const ref = useRef<MapViewBase>();
  const [mapData, setMapData] = useState<any>({});

  const onSetMapDataEvent = async () => {
    const [boundaries, camera] = await Promise.all([
      ref.current?.getMapBoundaries()
      // ref.current?.getCamera(),
    ]);
    setMapData((prev: any) => ({ ...prev, boundaries, camera }));
  };

  const markerList = useMemo(
    () => [
      {
        key: 1,
        coordinate: { latitude: 43.36708518176219, longitude: -5.865915137781359 },
        title: 'one',
        description: 'marker one'
      },
      {
        key: 2,
        coordinate: { latitude: 43.366962726299555, longitude: -5.861703978679733 },
        title: 'two',
        description: 'marker two'
      },
      {
        key: 3,
        coordinate: { latitude: 43.36810563433707, longitude: -5.872383478161458 },
        title: 'three',
        description: 'marker three'
      }
    ],
    []
  );

  const customMarkerList = useMemo(
    () => [
      {
        key: 1,
        coordinate: { latitude: 43.36165839994919, longitude: -5.865308039638282 },
        title: 'one',
        description: 'marker one'
      },
      {
        key: 2,
        coordinate: { latitude: 43.36593636067982, longitude: -5.866572767458884 },
        title: 'two',
        description: 'marker two'
      },
      {
        key: 3,
        coordinate: { latitude: 43.3695090960058, longitude: -5.864960027284962 },
        title: 'three',
        description: 'marker three'
      }
    ],
    []
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ height: '100%' }}>
        <MapView
          ref={ref}
          provider="google"
          initialRegion={{ latitude: 43.3, longitude: -5.86, latitudeDelta: 8.5, longitudeDelta: 8.5 }}
          onMapReady={onSetMapDataEvent}
          onPanDrag={onSetMapDataEvent}
          onUserLocationChange={event =>
            ref.current?.setCamera({
              center: {
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude
              }
            })
          }
          style={{ flex: 1 }}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          toolbarEnabled={true}
          showsScale={true}
          followsUserLocation={true}
          renderCluster={data => (
            <Marker key={data.id} coordinate={{ latitude: data.geometry.coordinates[1], longitude: data.geometry.coordinates[0] }}>
              <View style={{ backgroundColor: 'yellow', borderRadius: 100, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{data.properties.point_count}</Text>
              </View>
            </Marker>
          )}
          minZoomLevel={16}
          // liteMode={true}
        >
          {markerList.map(marker => (
            <Marker {...marker} />
          ))}
          {customMarkerList.map(marker => (
            <Marker key={marker.key} coordinate={marker.coordinate}>
              <View style={{ backgroundColor: '#FFF', borderRadius: 100, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{marker.title}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
        <View style={{ padding: 15 }}>
          <Text>{JSON.stringify(mapData, null, 4)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
