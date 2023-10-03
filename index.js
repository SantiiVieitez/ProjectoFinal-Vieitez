function fetchAndDisplayData() {
    fetch('https://651c5609194f77f2a5afb673.mockapi.io/Persona')
        .then(response => response.json())
        .then(data => {
            const peopleList = document.getElementById('peopleList');
            peopleList.innerHTML = '';

            data.forEach(person => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `ID: ${person.id}, ${person.name} (Edad: ${person.age}) <button onclick="deletePerson('${person.id}')">Eliminar</button> <button onclick="editPerson('${person.id}')">Editar</button>`;
                peopleList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });
}

// Función para agregar una nueva persona
document.getElementById('addPersonForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    fetch('https://651c5609194f77f2a5afb673.mockapi.io/Persona', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age })
    })
        .then(() => {
            fetchAndDisplayData();
            document.getElementById('addPersonForm').reset();
        })
        .catch(error => {
            console.error('Error al agregar persona:', error);
        });
});

// Función para eliminar una persona
function deletePerson(id) {
    fetch(`https://651c5609194f77f2a5afb673.mockapi.io/Persona/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            fetchAndDisplayData();
        })
        .catch(error => {
            console.error('Error al eliminar persona:', error);
        });
}

// Función para editar una persona
function editPerson(id) {
    fetch(`https://651c5609194f77f2a5afb673.mockapi.io/Persona/${id}`)
        .then(response => response.json())
        .then(person => {
            const name = prompt('Nuevo nombre:', person.name);
            const age = prompt('Nueva edad:', person.age);

            if (name !== null && age !== null) {
                fetch(`https://651c5609194f77f2a5afb673.mockapi.io/Persona/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, age })
                })
                    .then(() => {
                        alert(`Persona ${name} (ID: ${id}, Edad: ${age}) editada con éxito`);
                        fetchAndDisplayData();
                    })
                    .catch(error => {
                        console.error('Error al editar persona:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Error al obtener datos de la persona:', error);
        });
}

// Cargar datos al cargar la página
fetchAndDisplayData();