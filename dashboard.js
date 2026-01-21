document.addEventListener("DOMContentLoaded", function () {
  const openCreateForm = document.getElementById("openCreateForm");
  const closeCreate = document.getElementById("closeCreate");
  const closeDetails = document.getElementById("closeDetails");
  const monitorModal = document.getElementById("monitorModal");
  const monitorTitle = document.getElementById("monitorTitle");
  const closeMonitor = document.getElementById("closeMonitor");
  let monitorChart;

  const createModal = document.getElementById("createModal");
  const detailsModal = document.getElementById("detailsModal");
  const projectForm = document.getElementById("projectForm");
  const projectsContainer = document.getElementById("projectsContainer");
  const modalTitle = document.getElementById("modalTitle");
  const editIndexInput = document.getElementById("editIndex");

  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  function saveProjects() { localStorage.setItem("projects", JSON.stringify(projects)); renderProjects(); }

  function renderProjects() {
    projectsContainer.innerHTML = "";
    projects.forEach((project,index)=>{
      const card=document.createElement("div");
      card.className="project-card";
      card.innerHTML=`<strong>${project.name}</strong><span>${project.location}</span><p style="font-size:12px;color:${project.status==='Approved'?'green':project.status==='Rejected'?'red':'orange'}">${project.status}</p>`;
      card.addEventListener("click",()=>{
        document.getElementById("dName").innerText=project.name;
        document.getElementById("dLocation").innerText=project.location;
        document.getElementById("dCategory").innerText=project.category;
        document.getElementById("dReport").innerText=project.report || "Not uploaded";
        document.getElementById("dStatus").innerText=project.status;
        const buttons=document.getElementById("detailsButtons");
        buttons.innerHTML="";
        if(project.status==="Approved"){
          const reportBtn=document.createElement("button");
          reportBtn.innerText="Report Details"; reportBtn.className="primary-btn";
          reportBtn.onclick=()=>alert("Report Details: "+project.report);
          const monitorBtn=document.createElement("button");
          monitorBtn.innerText="Monitoring"; monitorBtn.className="primary-btn";
          monitorBtn.onclick=()=>showMonitoring(project);
          buttons.appendChild(reportBtn);
          buttons.appendChild(monitorBtn);
        }
        detailsModal.style.display="flex";
      });
      projectsContainer.appendChild(card);
    });
  }

  openCreateForm.addEventListener("click",()=>{ modalTitle.innerText="Create Project"; projectForm.reset(); editIndexInput.value=""; createModal.style.display="flex";});
  closeCreate.addEventListener("click",()=>createModal.style.display="none");
  closeDetails.addEventListener("click",()=>detailsModal.style.display="none");

  projectForm.addEventListener("submit",function(e){
    e.preventDefault();
    const reportFile=document.getElementById("report").files[0];
    if(reportFile && reportFile.type!=="application/pdf"){ alert("Please upload PDF only"); return; }
    if(reportFile){
      const reader=new FileReader();
      reader.onload=function(event){
        const reportData=event.target.result;
        saveProject(reportFile.name,reportFile.type,reportData);
      }
      reader.readAsArrayBuffer(reportFile);
    } else { saveProject("", "", null); }
  });

  function saveProject(fileName,fileType,fileData){
    const projectData={
      name: document.getElementById("name").value,
      location: document.getElementById("location").value,
      category: document.getElementById("category").value,
      report:fileName, reportData:fileData, reportType:fileType,
      status:"Pending Approval"
    };
    const editIndex=editIndexInput.value;
    if(editIndex!==""){ projects[editIndex]={...projects[editIndex],...projectData}; editIndexInput.value=""; }
    else projects.push(projectData);
    saveProjects(); projectForm.reset(); createModal.style.display="none";
  }

  function showMonitoring(project){
    monitorModal.style.display="flex";
    monitorTitle.innerText=`Monitoring: ${project.name}`;
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const data=months.map(()=>Math.floor(Math.random()*50+50));
    if(monitorChart) monitorChart.destroy();
    const ctx=document.getElementById('monitorChart').getContext('2d');
    monitorChart=new Chart(ctx,{type:'line',data:{labels:months,datasets:[{label:'Carbon Reduction (tons)',data:data,borderColor:'#2f8f7e',backgroundColor:'rgba(47,143,126,0.2)',fill:true,tension:0.3}]},options:{responsive:true,scales:{y:{beginAtZero:true}}}});
  }

  closeMonitor.addEventListener("click",()=>monitorModal.style.display="none");
  renderProjects();
});
