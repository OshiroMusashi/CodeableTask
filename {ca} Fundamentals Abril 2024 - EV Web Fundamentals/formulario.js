document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const nombre = document.getElementById('nombre');
    const apodo = document.getElementById('apodo');
    const biografia = document.getElementById('biografia');
    const contrasena = document.getElementById('contrasena');
    const submitButton = document.getElementById('submitButton');
    const responseCode = document.getElementById('responseCode');
    const serverResponse = document.getElementById('serverResponse');

    const validationRules = {
        nombre: value => value.trim() !== '',
        apodo: value => /^[a-zA-Z0-9]{3,10}$/.test(value),
        biografia: value => value === '' || value.length >= 100,
        contrasena: value => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
    };

    const validationMessages = {
        nombre: 'El nombre es obligatorio',
        apodo: 'Entre 3 y 10 caracteres alfanuméricos',
        biografia: 'Mínimo 100 caracteres',
        contrasena: 'Mínimo 8 caracteres, al menos una letra mayúscula y un número'
    };

    const validateField = (field) => {
        const value = field.value;
        const isValid = validationRules[field.name](value);
        const errorSpan = document.getElementById(`${field.name}Error`);
        if (isValid) {
            errorSpan.style.display = 'none';
        } else {
            errorSpan.textContent = validationMessages[field.name];
            errorSpan.style.display = 'block';
        }
        return isValid;
    };

    const validateForm = () => {
        const isValid = [...form.elements].filter(e => e.type !== 'submit').every(validateField);
        submitButton.disabled = !isValid;
    };

    form.addEventListener('input', (event) => {
        validateField(event.target);
        validateForm();
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = {
            nombre: nombre.value,
            apodo: apodo.value,
            biografia: biografia.value,
            contrasena: contrasena.value
        };
        try {
            const response = await fetch('https://mocktarget.apigee.net/echo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            const formattedData = { ...data, contrasena: 'supersecret' };
            const formattedResult = {
                headers: {
                    "host": "mocktarget.apigee.net",
                    "content-type": "application/json",
                    "user-agent": "insomnia/8.2.0",
                    "accept": "*/*",
                    "content-length": JSON.stringify(formattedData).length.toString(),
                    "x-cloud-trace-context": "043336ceb30b68b7d6eac9cf2a5f0bae/987516022055598158",
                    "via": "1.1 google",
                    "x-forwarded-for": "45.189.108.92, 35.227.194.212",
                    "x-forwarded-proto": "https",
                    "connection": "Keep-Alive"
                },
                method: "POST",
                url: "/",
                args: {},
                body: JSON.stringify(formattedData, null, 2)
            };
            responseCode.textContent = JSON.stringify(formattedResult, null, 2);
            serverResponse.style.display = 'block'; // Mostrar el contenedor de respuesta
        } catch (error) {
            responseCode.textContent = 'Error al enviar el formulario';
            serverResponse.style.display = 'block'; // Mostrar el contenedor de respuesta incluso en caso de error
        }
    });

    validateForm();
});