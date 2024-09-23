async function fetchCapivaras() {
    try {
        const response = await fetch('http://localhost:3000/capivaras');
        const data = await response.json();

        const capivaraInfo = document.getElementById('capivara-info');
        capivaraInfo.innerHTML = '';

        data.forEach(capivara => {
            const capivaraElement = document.createElement('div');
            capivaraElement.innerHTML = `
                <h2>${capivara.nome}</h2>
                <p>Idade: ${capivara.idade} anos</p>
                <p>Peso: ${capivara.peso} kg</p>
                <p>Status de Saúde: ${capivara.status_saude}</p>
                <p>Habitat: ${capivara.habitat}</p>
                <p>Comportamento: ${capivara.comportamento}</p>
                <p>Dieta: ${capivara.dieta}</p>
                <p>Data de Registro: ${capivara.data_registro}</p>
                <p>Observações: ${capivara.observacoes}</p>
            `;
            capivaraInfo.appendChild(capivaraElement);
        });
    } catch (error) {
        console.error('Erro ao buscar capivaras', error);
    }
}

window.onload = fetchCapivaras;