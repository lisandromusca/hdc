// Tu configuración de Firebase
var firebaseConfig = {
    databaseURL: "https://hidrocarburos-b5f07-default-rtdb.firebaseio.com/"
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Referencia a la base de datos
var database = firebase.database();
var database_ref = database.ref();

// Obtener los datos y mostrarlos en la tabla, ordenados de mayor a menor puntaje
database_ref.on("value", (snapshot) => {
    const scoreData = document.getElementById("score-data");
    scoreData.innerHTML = ""; // Limpiar tabla antes de agregar nuevos datos

    // Obtener todos los datos y ordenarlos de mayor a menor puntaje
    const scoresArray = [];
    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        scoresArray.push(data);
    });
    scoresArray.sort((a, b) => b.score - a.score);

    // Insertar los datos en la tabla y agregar el ícono al puntaje más alto
    scoresArray.forEach((data, index) => {
        const name = data.name;
        const score = data.score;

        // Crear fila
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${score} ${index === 0 ? '<i class="fa-solid fa-atom"></i>' : ''}</td>
        `;
        scoreData.appendChild(row);
    });
});

