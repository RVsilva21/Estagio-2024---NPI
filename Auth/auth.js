// auth.js

function getUserRoleFromToken(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
}

function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'http://127.0.0.1:5501/Login/login.html'; // Redireciona para login
    }
    return token;
}

function checkUserRole(requiredRole) {
    const token = checkAuthentication();
    const userRole = getUserRoleFromToken(token);

    if (userRole !== requiredRole) {
        alert("Você não tem permissão para acessar essa página.");
        window.location.href = 'http://127.0.0.1:5501/Login/login.html'; // Redireciona para página principal ou de erro
    }
}

async function login(username, password) {
    const response = await fetch('http://localhost:8085/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Armazena o token
        window.location.href = 'http://127.0.0.1:5501/Home/home.html'; // Redireciona para a página principal
    } else {
        alert('Login falhou! Verifique suas credenciais.');
    }
}

function logout() {
    localStorage.removeItem('token'); // Remove o token
    window.location.href = 'http://127.0.0.1:5501/Login/login.html'; // Redireciona para a tela de login
}
