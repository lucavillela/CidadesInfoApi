const pesquisar = document.getElementById("pesquisar");
const cidade = document.getElementById("cidade");
const pais = document.getElementById("pais");
const weatherIcon = document.getElementById("weather-icon");
const populacao = document.getElementById("populacao");
const temperatura = document.getElementById("temperatura");
const apiContent = document.getElementById("apiContent");
const inputCidade = document.getElementById("inputCidade");

document.addEventListener('keydown', function(event) {   
    if (event.key === 'Enter') {
      pesquisar.click();
    }
  });

pesquisar.onclick = function() {

    if(apiContent.style.fontFamily == "Kanit, sans-serif"){
        apiContent.style.fontFamily = "'Flow Circular', cursive";
    }

    apiContent.style.display = "flex";

    city = inputCidade.value;

    fetch(`/info?cidade=${city}`)
    .then(response => response.json())
    .then(data => {
        nomeCidade = data.name;
        popCidade = data.population;
        paisCidade = data.country;
        
        populacao.textContent = "População: " + popCidade;
        pais.textContent = "País: " + paisCidade;
        
        fetch(`/previsao?latitude=${data.latitude}&longitude=${data.longitude}`)
        .then(response => response.json())
        .then(data => {
            
            cidade.textContent = nomeCidade + ", " + data.temperatura + "°";
            apiContent.style.fontFamily = "'Kanit', sans-serif";
            codigo = data.codigo;

            if (codigo === 0) {
                weatherIcon.style.display = 'block';
                weatherIcon.src = '/images/sol.svg';
            } else if ([1, 2, 3].includes(codigo)) {
                weatherIcon.style.display = 'block';
                weatherIcon.src = '/images/solNuvem.svg';
            } else if ([45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86].includes(codigo)) {
                weatherIcon.style.display = 'block';
                weatherIcon.src = '/images/chuva.svg';
            } else if ([95, 96, 99].includes(codigo)) {
                weatherIcon.style.display = 'block';
                weatherIcon.src = '/images/temporal.svg';
            } 
        })
        .catch(error => {
            cidade.textContent = data.name;
        });

        

    })
    .catch(error => {
        cidade.textContent = data.name;
    });
}