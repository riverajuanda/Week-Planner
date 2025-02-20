document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-actividad');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        // Obtener los valores del formulario
        const dia = parseInt(document.getElementById('input-dia').value);
        const horaInicio = document.getElementById('input-hora-inicio').value;
        const duracion = parseInt(document.getElementById('input-duracion').value);
        const descripcion = document.getElementById('input-descripcion').value;

        // Validar los valores
        if (dia < 1 || dia > 7 || duracion < 1 || duracion > 8) {
            alert('Por favor, ingrese valores válidos.');
            return;
        }

        // Convertir la hora de inicio a fila de la cuadrícula
        const filaInicio = convertirHoraAFila(horaInicio);
        const filaFin = filaInicio + duracion * 2; // Cada hora son 2 filas (30 minutos cada una)

        // Obtener el nombre del día
        const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const nombreDia = diasSemana[dia - 1];

        // Crear la nueva actividad
        const nuevaActividad = document.createElement('div');
        nuevaActividad.classList.add('actividad');
        nuevaActividad.style.gridColumn = dia + 1; // +1 porque la columna 1 es para las horas
        nuevaActividad.style.gridRow = `${filaInicio} / span ${filaFin - filaInicio}`;

        // Agregar contenido a la actividad
        nuevaActividad.innerHTML = `
            <p><strong>${nombreDia}</strong></p>
            <p>${descripcion}</p>
            <p><strong>Hora:</strong> ${horaInicio}</p>
            <p><strong>Duración:</strong> ${duracion} horas</p>
            <button class="eliminar-actividad">&times;</button>
        `;

        // Agregar la actividad al contenedor de actividades
        const contenedorActividades = document.querySelector('.actividades');
        if (contenedorActividades) {
            contenedorActividades.appendChild(nuevaActividad);
        }

        // Limpiar el formulario
        form.reset();
    });

    // Función para eliminar actividades
    document.querySelector('.actividades').addEventListener('click', function (event) {
        if (event.target.classList.contains('eliminar-actividad')) {
            event.target.closest('.actividad').remove(); // Eliminar la actividad
        }
    });
});

function convertirHoraAFila(hora) {
    // Convertir la hora en formato "HH:MM" a minutos desde las 7:00 AM
    const [horas, minutos] = hora.split(':').map(Number);
    const minutosTotales = (horas - 7) * 60 + minutos; // 7:00 AM es la hora base
    return Math.floor(minutosTotales / 30) + 1; // Cada fila representa 30 minutos
}