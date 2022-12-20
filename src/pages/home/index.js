import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from '../../components/googlePlacesAutocomplete.js';
import classNames from "classnames";
import { SearchSelect } from "../../components/searchSelect";
import { statesUS, colourStyles } from "../../data/states";

const Home = (props) => {
    const [errors, setErrors] = useState({});
	const [address1, setAddress1] = useState("");
	const [city, setCity] = useState("");
	const [state, bindState] = useState("");
	const [zip, bindZip] = useState("");

	// Google Places Autocomplete
	const placeholder = "Your address";
	const [googleInput, setGoogleInput] = useState(undefined);
	const [inputValue, setInputValue] = useState("");
	const [stateName, setStateName] = useState("")

    const handleStateChange = (event) => {
        const states = statesUS.filter((USstate) => USstate.value == event.value);
        bindState(states);
    };

    useEffect(() => {
        statesUS.push(stateName);
        const selectedState = statesUS.filter((state) => state.value == stateName.value);
    
        bindState(selectedState);
    }, [stateName])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()){
            submitForm();
        } else {
            console.log("Form is not submitted...!!!");
        }
    };

    // validation
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!googleInput) {
            isValid = false;
            errors["googleInput"] = "Please enter your Address.";
        }
        if (!city) {
            isValid = false;
            errors["city"] = "Please enter your City.";
        }
        if (!state) {
            isValid = false;
            errors["state"] = "Please enter your State.";
        }
        if (!zip) {
            isValid = false;
            errors["zip"] = "Please enter your Zipcode.";
        }
    }

    const submitForm = () => {
        if (validateForm()) {

            let formData = {
                address: address1,
                zip: zip,
                state: state[0].value,
                city: city,
            }

            console.log(formData)
        }
    }

    return (
        <>
            <form className="py-5" onSubmit={(event) => handleSubmit(event)}>
                <div className="container">
                    <div className="row">
                        <div className="col-8 offset-2 mb-4 pb-4">
                            <GooglePlacesAutocomplete
                                bindZip={bindZip}
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                setGoogleInput={setGoogleInput}
                                placeholder={placeholder}
                                setAddress1={setAddress1}
                                setCity={setCity}
                                setStateName={setStateName}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="inputWrap">
                                <h3 className="form-label dBlock">City*</h3>
                                <input
                                    data-testid="city_field"
                                    id="city"
                                    className={classNames(
                                    errors.city
                                        ? "fcError"
                                        : "formName",
                                    "form-input w-100 d-block"
                                    )}
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    placeholder="City"
                                />
                                {errors?.city && (
                                    <small data-testid="city_Err_field" className="support-error">
                                    {errors.city}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="inputWrap">
                                <h3 className="form-label dBlock">ZIP*</h3>
                                <input
                                    data-testid="zip_field"
                                    id="zip"
                                    type="text"
                                    className={classNames(
                                        errors.zip ? "fcError" : "formName",
                                        "form-input w-100 d-block"
                                    )}
                                    value={zip}
                                    onChange={(event) => bindZip(event.target.value)}
                                    placeholder="ZIP Code"
                                />
                                {errors?.zip && (
                                    <small data-testid="zip_Err_field" className="support-error">
                                        {errors.zip}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="inputWrap">
                                <h3 className="form-label dBlock">Select State*</h3>
                                <SearchSelect
                                    data-testid="state_field"
                                    styles={colourStyles}
                                    theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,

                                        primary: "#0B4DA2",
                                    },
                                    })}
                                    className="customSelect fcError"
                                    options={statesUS}
                                    value={state}
                                    onChange={(event) => handleStateChange(event)}
                                />
                                {errors?.state && (
                                    <small data-testid="zip_Err_field" className="support-error">
                                        {errors.state}
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Home;