document.addEventListener("DOMContentLoaded", function(){

  const projectsContainer = document.getElementById("projectsContainer");
  const editModal = document.getElementById("editModal");
  const closeEdit = document.getElementById("closeEdit");
  const editForm = document.getElementById("editForm");

  const editIndexInput = document.getElementById("editIndex");
  const editName = document.getElementById("editName");
  const editLocation = document.getElementById("editLocation");
  const editCategory = document.getElementById("editCategory");

  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  function saveProjects(){
    localStorage.setItem("projects", JSON.stringify(projects));
    renderProjects();
  }

  function renderProjects(){
    projectsContainer.innerHTML = "";
    projects.forEach((project, index) => {

      const card = document.createElement("div");
      card.className = "project-card";

      // ---- Project info (Name, Location, Status) ----
      const infoDiv = document.createElement("div");
      infoDiv.innerHTML = `
        <strong>${project.name}</strong>
        <span>${project.location}</span>
        <p>Status: <span style="color:${project.status==='Approved'?'green':project.status==='Rejected'?'red':'orange'}">${project.status}</span></p>
      `;
      card.appendChild(infoDiv);

      // ---- Buttons container ----
      const btnContainer = document.createElement("div");
      btnContainer.style.marginTop = "10px";
      btnContainer.style.display = "flex";
      btnContainer.style.gap = "5px";

      // Approve Button
      const approveBtn = document.createElement("button");
      approveBtn.innerText = "Approve";
      approveBtn.className = "primary-btn";
      approveBtn.onclick = () => {
        project.status = "Approved";
        saveProjects();
      };
      btnContainer.appendChild(approveBtn);

      // Reject Button
      const rejectBtn = document.createElement("button");
      rejectBtn.innerText = "Reject";
      rejectBtn.className = "secondary-btn";
      rejectBtn.onclick = () => {
        project.status = "Rejected";
        saveProjects();
      };
      btnContainer.appendChild(rejectBtn);

      // Amend/Edit Button
      const amendBtn = document.createElement("button");
      amendBtn.innerText = "Amend";
      amendBtn.className = "primary-btn";
      amendBtn.onclick = () => openEditModal(index);
      btnContainer.appendChild(amendBtn);

      // Download PDF button (if exists)
      if(project.report){
        const downloadBtn = document.createElement("button");
        downloadBtn.innerText = "Download Report";
        downloadBtn.className = "primary-btn";
        downloadBtn.onclick = () => {
          if(project.reportData){
            const blob = new Blob([project.reportData], { type: project.reportType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = project.report;
            a.click();
            URL.revokeObjectURL(url);
          } else alert("No report uploaded");
        };
        btnContainer.appendChild(downloadBtn);
      }

      // Append buttons **after project info**
      card.appendChild(btnContainer);

      projectsContainer.appendChild(card);
    });
  }

  function openEditModal(index){
    const project = projects[index];
    editIndexInput.value = index;
    editName.value = project.name;
    editLocation.value = project.location;
    editCategory.value = project.category;
    editModal.style.display = "flex";
  }

  closeEdit.addEventListener("click", () => editModal.style.display = "none");

  editForm.addEventListener("submit", function(e){
    e.preventDefault();
    const index = editIndexInput.value;
    projects[index].name = editName.value;
    projects[index].location = editLocation.value;
    projects[index].category = editCategory.value;
    saveProjects();
    editModal.style.display = "none";
  });

  renderProjects();
});
