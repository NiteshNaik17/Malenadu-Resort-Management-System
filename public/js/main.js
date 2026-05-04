// Check auth state and update navbar
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navAdmin = document.getElementById('nav-admin');
    const navLogout = document.getElementById('nav-logout');

    const navFood = document.getElementById('nav-food');

    // Dynamically find Rooms and Contact Us nav items based on their href
    const roomsAnchor = document.querySelector('a[href="rooms.html"]');
    const contactAnchor = document.querySelector('a[href="query.html"]');
    const navRooms = roomsAnchor ? roomsAnchor.closest('li') : null;
    const navContact = contactAnchor ? contactAnchor.closest('li') : null;

    if (user) {
        if (navLogin) navLogin.classList.add('d-none');
        if (navRegister) navRegister.classList.add('d-none');
        if (navLogout) navLogout.classList.remove('d-none');
        if (user.role === 'admin') {
            if (navAdmin) navAdmin.classList.remove('d-none');
            if (navFood) navFood.classList.add('d-none');
            if (navRooms) navRooms.classList.add('d-none');
            if (navContact) navContact.classList.add('d-none');
        } else {
            if (navFood) navFood.classList.remove('d-none');
            if (navRooms) navRooms.classList.remove('d-none');
            if (navContact) navContact.classList.remove('d-none');
        }
    } else {
        if (navLogin) navLogin.classList.remove('d-none');
        if (navRegister) navRegister.classList.remove('d-none');
        if (navLogout) navLogout.classList.add('d-none');
        if (navFood) navFood.classList.add('d-none');
        if (navAdmin) navAdmin.classList.add('d-none');
        if (navRooms) navRooms.classList.add('d-none');
        if (navContact) navContact.classList.add('d-none');
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', updateNavbar);
