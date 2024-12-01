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

    // แสดงทุก entries ที่บันทึก
    savedEntries.forEach(entry => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>Name:</strong> ${entry.name} <br>
        <strong>Email:</strong> ${entry.email} <br>
        <strong>Message:</strong> ${entry.message} <br>
        <strong>Suggestions:</strong> ${entry.suggestions}
      `;
      entriesList.appendChild(listItem);
    });
  });

document.getElementById('guestbook-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const suggestions = document.getElementById('suggestions').value.trim();

  if (!name || !email || !message || !suggestions) {
    alert('All fields are required!');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const entry = { name, email, message, suggestions };
  const entriesList = document.getElementById('entries-list');
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <strong>Name:</strong> ${name} <br>
    <strong>Email:</strong> ${email} <br>
    <strong>Message:</strong> ${message} <br>
    <strong>Suggestions:</strong> ${suggestions}
  `;
  entriesList.appendChild(listItem);

  const savedEntries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
  savedEntries.push(entry);
  localStorage.setItem('guestbookEntries', JSON.stringify(savedEntries));

  document.getElementById('guestbook-form').reset();
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function clearEntries() {
  const password = prompt("Please enter the developer password:");
  if (password === "Dev_Group10") { 
    if (confirm('Are you sure you want to clear all guestbook entries?')) {
      localStorage.removeItem('guestbookEntries');
      document.getElementById('entries-list').innerHTML = ''; 
      alert('All entries have been cleared.');
    }
  } else {
    alert('You do not have permission to delete entries.');
  }
}