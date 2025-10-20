# 🌦️ Clima Interativo PRO

Um aplicativo web elegante e moderno para consulta de clima e previsão do tempo, desenvolvido com HTML, CSS e JavaScript puro. O projeto consome dados da API OpenWeatherMap para fornecer informações meteorológicas em tempo real e previsões para os próximos 5 dias.

![Preview do Projeto](https://imgur.com/a/JM6VWYc) 

---

## ✨ Funcionalidades Principais

* **Clima Atual:** Exibe a temperatura atual, ícone do clima, descrição (ex: "céu limpo"), umidade e velocidade do vento.
* **Previsão para 5 Dias:** Mostra um resumo da previsão para os próximos 5 dias, com dia da semana, ícone e temperatura.
* **Busca por Cidade:** Permite ao usuário digitar o nome de qualquer cidade do mundo.
* **Geolocalização:** Ao carregar, o aplicativo solicita permissão para acessar a localização do usuário e exibe o clima local automaticamente.
* **Fundo Dinâmico:** A imagem ou cor de fundo da aplicação se altera de acordo com o clima atual (ex: sol, chuva, nublado, noite).
* **Histórico de Busca:** Salva as últimas 5 cidades pesquisadas no `localStorage` do navegador, exibindo botões para uma nova consulta rápida.
* **Design Responsivo:** A interface se adapta perfeitamente a dispositivos móveis (celulares) e desktops.
* **Tratamento de Erros:** Exibe uma mensagem clara caso a cidade não seja encontrada ou a API falhe.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído do zero utilizando apenas tecnologias web fundamentais:

* **HTML5:** Para a estrutura semântica da página.
* **CSS3:** Para a estilização completa.
* **JavaScript (ES6+):** Responsável por toda a lógica da aplicação.
* **APIs Externas:**
    * **OpenWeatherMap:** Utilização de dois *endpoints*:
        * `/weather` (para o clima atual).
        * `/forecast` (para a previsão de 5 dias/3 horas).
    * **Font Awesome:** Para os ícones de umidade, vento, localização, etc.

---

## 🛠️ Como Executar

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone este repositório** (ou baixe os arquivos `index.html`, `style.css` e `script.js` para uma mesma pasta).

2.  **Obtenha sua chave de API:**
    * Crie uma conta gratuita no site [OpenWeatherMap](https://openweathermap.org/).
    * No seu painel de usuário, vá até a seção "API keys".
    * Copie a sua chave de API padrão.

3.  **Insira a Chave no Código:**
    * Abra o arquivo `script.js` no seu editor de código.
    * Encontre a constante `apiKey` (próximo ao topo do arquivo).
    * Cole a sua chave de API entre as aspas:
        ```javascript
        // --- CHAVE DA API ---
        const apiKey = "SUA_CHAVE_DE_API_AQUI"; 
        ```

4.  **Abra o `index.html`:**
    * Basta abrir o arquivo `index.html` no seu navegador de preferência (Google Chrome, Firefox, etc.).

O aplicativo estará 100% funcional.

---
