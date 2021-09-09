const searchBooks = () => {
    //CLearing search results
    document.getElementById('search-result').textContent = '';
    //Showing Spinner
    document.getElementById('spinner').classList.remove('d-none');
    // Clearing total books number
    document.getElementById('total-books-number').textContent = '';
    //Hiding the error message
    document.getElementById('error-message').classList.add('d-none');
    // Getting the output from user
    const searchFeild = document.getElementById('search-feild');
    const searchText = searchFeild.value;
    //Fetching URL
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySearchResult(data));
    //Clearing search bar
    document.getElementById('search-feild').value=''; 
};

const displaySearchResult = (data) => {
    const books = data.docs;
    if(books == false){
        document.getElementById('error-message').classList.remove('d-none');
    }
    //Total books number
    const totalBooksFound =  books.length;
    const h1 = document.createElement('h1');
    h1.classList.add('text-center');
    h1.innerHTML = `Total books found: ${totalBooksFound}`;
    document.getElementById('total-books-number').appendChild(h1);
    //Looping through every book
    books.forEach(book => {
        //Getting data of each book
        const cover_i = book.cover_i;
        const bookTitle = book.title;
        const publishYear = book.first_publish_year;
        let publisher = book?.publisher?.[0];
        let authorName = book?.author_name?.[0];
        // Error handling of authorName and publisher
        if(authorName === undefined){
            authorName='Unknown';
        }
        if(publisher === undefined){
            publisher='Unknown';
        }
        let imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        //Error handling of image
        if(imageUrl === "https://covers.openlibrary.org/b/id/undefined-M.jpg"){
            imageUrl = "images/unavailable.jpg";
        }
        //Displaying details in UI 
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h1 class="card-title">Title: ${bookTitle}</h1>
                    <h3 class="card-title">Author: ${authorName}</h3>
                    <h5 class="card-title">Publisher: ${publisher}</h5>
                    <h7 class="card-title">Published at: ${publishYear}</h7>
                    <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
        `;
        document.getElementById('search-result').appendChild(div);
    });
    
    //Hiding Spinner
    document.getElementById('spinner').classList.add('d-none');
};