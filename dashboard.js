const createModal = document.getElementById("createModal");
const detailsModal = document.getElementById("detailsModal");

openCreateForm.onclick = () => createModal.style.display = "flex";
closeCreate.onclick = () => createModal.style.display = "none";
closeDetails.onclick = () => detailsModal.style.display = "none";

projectForm.addEventListener("submit", function(e){
  e.preventDefault();

  const project = {
    name: name.value,
    location: location.value,
    category: category.value,
    report: report.files[0].name
  };

  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <strong>${project.name}</strong>
    <span>${project.location}</span>
  `;

  card.onclick = () => {
    dName.innerText = project.name;
    dLocation.innerText = project.location;
    dCategory.innerText = project.category;
    dReport.innerText = project.report;
    detailsModal.style.display = "flex";
  };

  projectsContainer.appendChild(card);
  projectForm.reset();
  createModal.style.display = "none";
});
