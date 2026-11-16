// Confirmação antes de excluir um registro
document.addEventListener('DOMContentLoaded', () => {
    const formulariosExcluir = document.querySelectorAll('form[data-confirmar-exclusao]');

    formulariosExcluir.forEach((formulario) => {
        formulario.addEventListener('submit', (evento) => {
            const confirmado = confirm('Tem certeza de que deseja excluir este registro?');

            if (!confirmado) {
                evento.preventDefault();
            }
        });
    });
});
