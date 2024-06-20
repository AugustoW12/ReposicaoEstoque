// Função para formatar a data e hora atuais como DD-MM-YYYY
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year}-${hours}:${minutes}:${seconds}`;
}

// Define a data e hora atuais no campo oculto
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('currentDateTime').value = getCurrentDateTime();
});

let firstClick = true;


function reloadPageAfterDelay(){
    setTimeout(() => {
        location.reload();
    }, 3500); // Espera 5 segundos antes de recarregar 
}


// Adiciona um evento de clique ao botão
document.getElementById('saveButton').addEventListener('click', function(event) {
    if (firstClick) {
        alert('Finalizado.');
        firstClick = false;
        reloadPageAfterDelay();
    } else {
        document.getElementById('dataForm').submit();
    }
});


// Adiciona um evento de submissão ao formulário
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Atualiza a data e hora no campo oculto antes de enviar
    document.getElementById('currentDateTime').value = getCurrentDateTime();

    // Coleta os dados do formulário
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Envia os dados para a API do Sheet Monkey
    fetch('https://api.sheetmonkey.io/form/SnX1tD3LbDxZ5MboHwz8R', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-agent': 'learning app',
        },
        body: JSON.stringify(data),
    })
});
