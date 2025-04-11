const API_URL = 'https://script.google.com/macros/s/AKfycbyJKgL-pUDWoIROj3oxjpZfVExcIHU5X-mIUrS5hS1OecdZ6gJLwMOfa_7ZfYPg0faYxg/exec';

document.addEventListener('DOMContentLoaded', () => {
    initFormNavigation();
    setupDynamicFields();
});

function initFormNavigation() {
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', () => {
            const currentSection = document.querySelector('.form-section.active');
            const nextSection = currentSection.nextElementSibling;
            
            if(nextSection && nextSection.classList.contains('form-section')) {
                currentSection.classList.remove('active');
                nextSection.classList.add('active');
                updateSidebarNav(nextSection.id);
            }
        });
    });
}

function setupDynamicFields() {
    document.querySelectorAll('.add-field').forEach(button => {
        button.addEventListener('click', (e) => {
            const template = document.getElementById(e.target.dataset.template);
            const clone = template.content.cloneNode(true);
            e.target.parentNode.insertBefore(clone, e.target);
        });
    });
}

async function submitForm() {
    const formData = new FormData(document.getElementById('eSPPForm'));
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if(response.ok) {
            alert('Data berjaya disimpan!');
            window.location.reload();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal menyimpan data');
    }
}
