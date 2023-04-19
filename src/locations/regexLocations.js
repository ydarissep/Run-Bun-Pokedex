function regexWildLocations(jsonWildLocations, locations){

	const wildEncounters = jsonWildLocations["wild_encounter_groups"][0]["encounters"]
	const methodArrayWild = ["land_mons", "water_mons", "rock_smash_mons", "fishing_mons", "honey_mons"]

	for(let i = 0; i < wildEncounters.length; i++)
	{
		let zone = "Placeholder"

		if("base_label" in wildEncounters[i]){
			zone = wildEncounters[i]["base_label"].replace(/^g|_/g, "").replace(/([A-Z])/g, " $1").replace(/(\d+)/g, " $1").trim()

			if(!(zone in locations)){
				locations[zone] = {}
			}

			for(let j = 0; j < methodArrayWild.length; j++){
				if(methodArrayWild[j] in wildEncounters[i]){
					for(let k = 0; k < wildEncounters[i][methodArrayWild[j]]["mons"].length; k++){

						const method = replaceMethodString(methodArrayWild[j], k)
						const name = wildEncounters[i][methodArrayWild[j]]["mons"][k]["species"]

						if(!(method in locations[zone])){
							locations[zone][method] = {}
						}


						if(name in locations[zone][method]){
			    			locations[zone][method][name] += returnRarity(method, k)
			    		}
			    		else{
			    			locations[zone][method][name] = returnRarity(method, k)
			    		}

					}
				}
			}
		}
		else{
			console.log("missing \"base_label\" in wildEncounters[", i, "] (regexWildLocations)")
			continue
		}
	}

	//const key = "land_mons"

    return locations
}



function regexGameCornerLocations(textGameCornerLocations, locations){
	const zone = "Mauville City", method = "Game Corner"
	
	if(!(zone in locations)){
		locations[zone] = {}
	}

	if(!(method in locations[zone])){
		locations[zone][method] = {}
	}

	const speciesArray = textGameCornerLocations.match(/SPECIES_\w+/g)

	for(let i = 0; i < speciesArray.length; i++){
		locations[zone][method][speciesArray[i]] = 100
	}

    return locations
}






function replaceMethodString(method, index){
	if(method.match(/fish/i)){
		if(index >= 0 && index <= 9)
			return "Super Rod"
		else
			return "Fishing"
	}
	else if(method.match(/water/i)){
		return "Surfing"
	}
	else if(method.match(/smash/i)){
		return "Rock Smash"
	}
	else if(method.match(/land/i)){
		return "Land"
	}
	else if(method.match(/honey/i)){
		return "Honey"
	}
    else{
    	console.log(method)
        return method
    }
}


function returnRarity(method, index){
	if(method === "Land" || method === "land_mons"){
		if(index === 0)
			return 20
		else if(index >= 1 && index <= 6){
			return 10
		}
		else if(index >= 7 && index <= 9){
			return 5
		}
		else if(index === 10){
			return 4
		}
		else if(index === 11){
			return 1
		}
		else
			return 100
	}
	if(method === "Honey"){
		if(index === 0)
			return 50
		else if(index >= 1 && index <= 2){
			return 15
		}
		else if(index === 3){
			return 10
		}
		else if(index >= 4 && index <= 5){
			return 5
		}
		else
			return 100
	}
	else if(method === "Surfing"){
		if(index === 0)
			return 30
		else if(index === 1)
			return 30
		else if(index === 2)
			return 20
		else if(index === 3)
			return 10
		else if(index === 4)
			return 10
		else
			return 100
	}
	else if(method === "Rock Smash"){
		if(index === 0)
			return 60
		else if(index === 1)
			return 30
		else if(index === 2)
			return 5
		else if(index === 3)
			return 4
		else if(index === 4)
			return 1
		else
			return 100
	}
	else if(method === "Super Rod"){
		if(index >= 0 && index <= 1)
			return 20
		else if(index >= 2 && index <= 6)
			return 10
		else if(index === 7)
			return 5
		else if(index === 8)
			return 4
		else if(index === 9)
			return 1
		else 
			return 100
	}
    else{
        return 100
    }
}