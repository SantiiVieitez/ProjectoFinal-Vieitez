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
            const editForm = document.getElementById('editForm');
            editForm.style.display = 'block';

            // Rellena el formulario con los datos actuales de la persona
            document.getElementById('editName').value = person.name;
            document.getElementById('editAge').value = person.age;

            // Agrega un manejador de eventos para el envío del formulario de edición
            editForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const name = document.getElementById('editName').value;
                const age = document.getElementById('editAge').value;

                if (name !== '' && age !== '') {
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
                            editForm.style.display = 'none';
                        })
                        .catch(error => {
                            console.error('Error al editar persona:', error);
                        });
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de la persona:', error);
        });
    }

    
    document.getElementById('filterButton').addEventListener('click', function () {
    const filterTerm = document.getElementById('filterInput').value.toLowerCase();
    
    filterPeople(filterTerm);
    });

    function filterPeople(filterTerm) {
        const peopleList = document.getElementById('peopleList');
        const listItems = peopleList.getElementsByTagName('li');
    
        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];
            const personName = listItem.textContent.toLowerCase();
    
            if (personName.includes(filterTerm)) {
                listItem.style.display = 'block';
            } else {
                listItem.style.display = 'none';
            }
        }
    }
// Cargar datos al cargar la página
fetchAndDisplayData();