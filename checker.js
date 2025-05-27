const checkBtn = document.getElementById("check")
const checkInput = document.getElementById("name")
const resultsDiv = document.getElementById("results")

const API_KEY = `9785b5daa415b3de7d2cd8e201f92359`

checkBtn.addEventListener("click", async function(e) {
    e.preventDefault();
    let CheckValue = checkInput.value
    
    //input validation
    if(CheckValue === "") {
        checkResults.textContent = "Please Provide a name"
        return
    }

    try {
        const response = await fetch(`https://api.nationalize.io/?name=${CheckValue}&apiKey=${API_KEY}`)
        const results = await response.json();
        console.log(results);
        
        let {name, country} = results;
        
        country.forEach(nationalityList => {
            let {country_id, probability} = nationalityList
            let resultContent = `
                <div id="nationalityItem" class="nationalityItem">
                    <div class="probabilities" id="probabilities">
                        <div class="country" id="country">${country_id}</div>
                        <div class="probability" id="probability">${probability.toFixed(4) * 100}%</div>
                    </div>
                </div>
            `
            resultsDiv.innerHTML += resultContent
        });



    } catch (error) {
        throw new Error(error)
    }

})