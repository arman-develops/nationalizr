const checkBtn = document.getElementById("check")
const checkInput = document.getElementById("name")
const resultsDiv = document.getElementById("results")

// const API_KEY = ``

checkBtn.addEventListener("click", async function(e) {
    e.preventDefault();
    let CheckValue = checkInput.value
    resultsDiv.innerHTML = ""
    
    //input validation
    if(CheckValue === "") {
        resultsDiv.innerHTML = `
                <div class="error-container">
                    <p class="error-message">No Name Specified</p>
                </div>
            `
        return
    }

    try {
        const response = await fetch(`https://api.nationalize.io/?name=${CheckValue}`)
        const results = await response.json();      
        let {count, country} = results;
        
        if(country.length) {
            country.forEach(nationalityList => {
                let {country_id, probability} = nationalityList
                const countryName = convertCodeToCountry(country_id)
                let resultContent = `
                    <div id="nationalityItem" class="nationalityItem">
                        <div class="probabilities" id="probabilities">
                            <div class="country" id="country">${country_id} (${countryName})</div>
                            <div class="probability" id="probability">${probability.toFixed(4) * 100}%</div>
                        </div>
                    </div>
                `
                resultsDiv.innerHTML += resultContent
            });
        }else {
            let errorContent = `
                <div class="error-container">
                    <p class="error-message">No Nationality found</p>
                </div>
            `
            resultsDiv.innerHTML = errorContent
        }

    } catch (error) {
        let errorContent = `
                <div class="error-container">
                    <p class="error-message">Something Broke</p>
                </div>
            `
        resultsDiv.innerHTML = errorContent
    }

})

function convertCodeToCountry(countryCode) {
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'})
    return regionNames.of(countryCode)
}