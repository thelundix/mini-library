"use strict";
document.addEventListener('DOMContentLoaded', fetchBooks);
async function fetchBooks() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        const books = await response.json();
        displayBooks(books);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
function displayBooks(books) {
    const container = document.getElementById('book-container');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book');
        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>Year: ${book.year}</p>
        `;
        div.addEventListener('click', () => showBookDetails(book));
        container.appendChild(div);
    });
}
function showBookDetails(book) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Audience:</strong> ${book.audience}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Plot:</strong> ${book.plot}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
        </div>
    `;
    document.body.appendChild(modal);
    const closeButton = modal.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
}
