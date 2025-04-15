function getCountryData() {
    const countryName = document.getElementById('countryInput').value.trim();
    const countryInfo = document.getElementById('countryInfo');
    const infoSection = document.querySelector('.info-section');
  
    if (countryName === '') {
      countryInfo.innerHTML = `<p style="color:red;">Please enter a country name.</p>`;
      return;
    }
  
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Country not found. Please check the spelling.");
        }
        return res.json();
      })
      .then(data => {
        const country = data[0];
  
        const name = country.name.common;
        const capital = country.capital?.[0] || "N/A";
        const population = country.population.toLocaleString();
        const currency = Object.values(country.currencies || {})[0]?.name || "N/A";
        const language = Object.values(country.languages || {}).join(", ") || "N/A";
        const flag = country.flags?.png || "";
  
        // ✅ Set static background image
        infoSection.style.backgroundImage = `url('image.png')`; // Replace with actual image path or URL
        infoSection.style.backgroundSize = "cover";
        infoSection.style.backgroundPosition = "center";
        infoSection.style.backgroundRepeat = "no-repeat";
  
        // ✅ Display country data
        countryInfo.innerHTML = `
          <div class="card">
            <img src="${flag}" alt="Flag of ${name}" style="width: 150px; border-radius: 8px;">
            <h3>${name}</h3>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Currency:</strong> ${currency}</p>
            <p><strong>Language(s):</strong> ${language}</p>
            <p><strong>Population:</strong> ${population}</p>
          </div>
        `;
      })
      .catch(error => {
        countryInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  }
  