// Event listener for DOMContentLoaded triggers the fetchBooks function
document.addEventListener('DOMContentLoaded', fetchBooks);

// Define an interface for the book structure
interface Book {
    title: string;
    author: string;
    publisher: string;
    year: number;
    audience?: string;
    color?: string;
    pages?: number;
    plot?: string;
}

// Asynchronously fetches books from a JSON API
async function fetchBooks(): Promise<void> {
    try {
        const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        const books: Book[] = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Displays the fetched books in the 'book-container' element
function displayBooks(books: Book[]): void {
    const container = document.getElementById('book-container');
     // Check if the container element exists
    if (!container) {
        console.error('Container element not found');
        return;
    }

// Iterate through books and create HTML elements for each
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book');
         // Populate div with book title and year
        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>Year: ${book.year}</p>
        `;
         // Add click event listener to show book details
        div.addEventListener('click', () => showBookDetails(book));
         // Append the div to the container
        container.appendChild(div);
    });
}
// Shows detailed information about a selected book in a modal
function showBookDetails(book: Book): void {
   // Create and configure the modal element
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
     // Append the modal to the body
    document.body.appendChild(modal);

     // Close modal when close button is clicked
    const closeButton = modal.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
}

      