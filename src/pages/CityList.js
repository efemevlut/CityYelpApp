import axios from "axios";
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

import {CityItem, SearchBar} from "../components"

let originalList = [];

const CityList = (props) => {
    const [cityList, setCityList] = useState([]);
    
    const fetchCityData = async () => {
        const {data} = await axios.get("https://opentable.herokuapp.com/api/cities")
        setCityList(data.cities)
        originalList = [...data.cities]
    }
    
    useEffect(() => {
        fetchCityData()
    }, [])
    
    const renderCities = ({item}) => {
        return (
            <CityItem 
                cityName={item} 
                onSelect={() => props.navigation.navigate("Restaurants", {selectedCity: item})}
            />
        )
    }

    const renderSeperator = () => <View style={{borderWidth: 1, borderColor: "#e0e0e0"}} />

    const searchCity = (search) => {
        const filteredCities = originalList.filter(city => {
            const text = search.toUpperCase();
            const cityName = city.toUpperCase();

            return cityName.indexOf(text) > -1;


        })

        setCityList(filteredCities)
    }

    return (
        <View>
            <Text style={{margin: 5, fontWeight: "bold", fontSize:40}}>Cities</Text>
            <SearchBar 
                placeholder = "Search a city..."
                onSearch={(value) => searchCity(value)}
            />
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={cityList}
                renderItem={renderCities}
                ItemSeparatorComponent={renderSeperator}
            />
        </View>
    )
}

export {CityList};