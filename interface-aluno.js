/* Controle da barra lateral */

const botaoMenu = document.getElementById('botao-menu');
const sidebar = document.querySelector('.sidebar');


botaoMenu.addEventListener('click', function() {
    
    sidebar.classList.toggle('expandida'); 
    
});

/* Controle de navegacao */

const linksMenu = document.querySelectorAll('.menu-lateral a');

linksMenu.forEach(link => {
    link.addEventListener('click', function(evento) {
        
        evento.preventDefault();

        document.querySelectorAll('.menu-lateral .flag').forEach(elemento => {
            elemento.classList.remove('flag');
        });

        const spansClicados = this.querySelectorAll('span');
        spansClicados.forEach(span => {
            span.classList.add('flag');
        });
    });
});