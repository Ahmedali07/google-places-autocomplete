import React, { useEffect, useRef, useState } from "react";
import useScript  from '../hooks/useScript';
import classNames from "classnames";

const GooglePlacesAutocomplete = (props) => {
	const autoCompleteRef = useRef();
	const inputRef = useRef();
	const options = {
	  fields: ["address_components", "geometry", "icon", "formatted_address"]
	}

	const [customGoogleMap, setCustomGoogleMap] = useState();

	const status = useScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDczfwC6d970VXbujAemMOpaigDk38Dt9I&libraries=places`);

	useEffect(() => {
		if (status === "ready") {
		  	if(window.google !== undefined){
				setCustomGoogleMap(window.google.maps)
				return;

		  	} else {
				console.log("Map Instance is not loaded yet,!")
		  	}
		}
	}, [status])

	useEffect(() => {
		if (customGoogleMap !== undefined) {
			googlePlaceAutocomplete()
			googleCurrentPlace()
		}
	}, [customGoogleMap])

	const googleCurrentPlace = () => {
		navigator.geolocation.getCurrentPosition(function(position) {
			const lat = position.coords.latitude;
			const lng = position.coords.longitude;
			const google_map_pos = new google.maps.LatLng( lat, lng );
			const google_maps_geocoder = new google.maps.Geocoder();
			google_maps_geocoder.geocode(
				{ 'latLng': google_map_pos },
				function( results, status ) {

					if (status == google.maps.GeocoderStatus.OK) {
						if (results.length) {
							for (var i = 0; i < results.length; i++) {
								for (var j = 0; j < results[i].address_components.length; j++) {
									var formatted_address=results[i].formatted_address;
									if (results[i].address_components[j].types[0] === 'postal_code') {
										var postalcode = results[i].address_components[j].short_name;
										props?.setInputValue(formatted_address);
										props?.bindZip(postalcode)
										return;

									} else {
										props?.bindZip("")
									}
								}
							}
							props?.setInputValue(formatted_address);
						}
					} else {
						console.log("Geocoder failed due to: " + status);
					}
				}
			);
		});
	}

	const googlePlaceAutocomplete = () => {
		autoCompleteRef.current = new window.google.maps.places.Autocomplete((inputRef.current), options);
		autoCompleteRef.current.addListener('place_changed', async function () {
	
			var place = await autoCompleteRef.current.getPlace();
		
			var place_lat = place?.geometry?.location?.lat();
			var place_lng = place?.geometry?.location?.lng();

			props?.setAddress1(place?.formatted_address);
			
			var latlng = new google.maps.LatLng(place_lat, place_lng);
		
			const geocoder = new google.maps.Geocoder();
		
			geocoder.geocode({ 'latLng': latlng,}, function(results, status) {        
				props?.bindZip("")
				if (status == google.maps.GeocoderStatus.OK) {

					if (results.length) {
						for (var i = 0; i < results.length; i++) {
							for (var j = 0; j < results[i].address_components.length; j++) {
								var addressType = results[i].address_components[j].types[0]

								if (addressType === 'postal_code') {
									var postalcode = results[i].address_components[j].short_name;
									props?.bindZip(postalcode)
									return;
				
								} else {
									props?.bindZip("")
								}
								if (addressType === 'locality' || addressType === 'sublocality_level_1') {
									var cityName = results[i].address_components[j].short_name;
									props?.setCity(cityName)
								}
								if (addressType === 'administrative_area_level_1') {
									var StateShortName = results[i].address_components[j].short_name;
									var StateLongName = results[i].address_components[j].long_name;
									props?.setStateName({lable: StateLongName, value: StateShortName})
								}
							}
						}
					}
				} else {
					console.log("Geocoder failed due to: " + status);
				}
			})
		});
	}

	return (
		<>
			<h1 className="d-block w-100 mb-3 text-center">Enter the Address to find zip, city, and state</h1>
			<input
				ref={inputRef}
				placeholder={props?.placeholder ? props.placeholder : ''}
				value={props?.inputValue}
				onChange={(e) => {
					props?.setInputValue(e.place);
					props?.setGoogleInput(e.target.value);
					props?.setGoogleInput(prev => {
					if (prev === '') {
						props?.bindZip('')
						props?.setCity('')
						props?.setStateName('')
					}
					return prev;
				});
				}}
				type="text"
				className={classNames("form-input zipContainer w-100 d-block")}
			/>
		</>
	);
};

export default GooglePlacesAutocomplete;