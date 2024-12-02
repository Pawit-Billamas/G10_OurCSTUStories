function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }  

  document.addEventListener('DOMContentLoaded', function () { 
    const savedEntries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    const entriesList = document.getElementById('entries-list');

    entriesList.innerHTML = '';
    savedEntries.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Name:</strong> ${entry.name} <br>
            <strong>Message:</strong> ${entry.message} <br>
            <strong>Suggestions:</strong> ${entry.suggestions} <br>
            <strong>Rating:</strong> ${'★'.repeat(entry.rating)}${'☆'.repeat(5 - entry.rating)}
        `;
        entriesList.appendChild(listItem);
    });

    const starInputs = document.querySelectorAll('input[name="rating"]');
    const ratingDisplay = document.createElement('div');
    ratingDisplay.id = 'rating-display';
    document.querySelector('.star-rating-container').appendChild(ratingDisplay);

    // อัปเดตการแสดงผลเมื่อผู้ใช้เลือกดาว
    starInputs.forEach(input => {
        input.addEventListener('change', function () {
            const selectedRating = this.value; // ค่าดาวที่เลือก
            ratingDisplay.innerHTML = `${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}<br>You selected: ${selectedRating} star${selectedRating > 1 ? 's' : ''}`;
        });
    });
});

  document.getElementById('guestbook-form').addEventListener('submit', function (event) {
      event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const suggestions = document.getElementById('suggestions').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');

    if (!name || !message || !suggestions || !rating) {
        alert('All fields are required, including Rating!');
        return;
    }

    const entry = { 
        name, 
        message, 
        suggestions,
        rating: parseInt(rating.value, 10)
    };

    const entriesList = document.getElementById('entries-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>Name:</strong> ${name} <br>
        <strong>Message:</strong> ${message} <br>
        <strong>Suggestions:</strong> ${suggestions} <br>
        <strong>Rating:</strong> ${'★'.repeat(entry.rating)}${'☆'.repeat(5 - entry.rating)}
    `;
    entriesList.appendChild(listItem);

    const savedEntries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    savedEntries.push(entry);
    localStorage.setItem('guestbookEntries', JSON.stringify(savedEntries));

    document.getElementById('guestbook-form').reset();

    document.getElementById('rating-display').innerHTML = '';
});

function clearEntries() {
  const password = prompt("Please enter the developer password:");
  if (password === "Dev_Group10") /*รหัสที่เอาไว้ลบอยู่นี่นะเพื่อนๆ*/{ 
    if (confirm('Are you sure you want to clear all guestbook entries?')) {
      localStorage.removeItem('guestbookEntries');
      document.getElementById('entries-list').innerHTML = ''; 
      alert('All entries have been cleared.');
    }
  } else {
    alert('You do not have permission to delete entries.');
  }
}