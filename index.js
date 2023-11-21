let userForm = document.getElementById("user-form");
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
const calculateAge = (Dob) => {
  const today = new Date();
  const birthDate = new Date(Dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries
    .map((entry) => {
      const namecell = `<td>${entry.name}</td>`;
      const emailcell = `<td>${entry.email}</td>`;
      const passwordcell = `<td>${entry.password}</td>`;
      const dobcell = `<td>${entry.dob}</td>`;
      const acceptTermscell = `<td>${entry.acceptTerms}</td>`;
      const row = `<tr>${namecell} ${emailcell} ${passwordcell} ${dobcell} ${acceptTermscell}</tr>`;
      return row;
    })
    .join("\n");
    const table = `<table class="table-auto w-full">
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">DOB</th>
      <th class="px-4 py-2">Accepted Terms?</th>
    </tr>
    ${tableEntries}
  </table>`;


  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};
const saveuserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const tickBox = document.getElementById("acceptTerms");
  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms:tickBox.checked,
  };
  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", saveuserForm);
displayEntries();
