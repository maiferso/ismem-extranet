var url="assets/json/",allCompaniesList="",prevButton=document.getElementById("page-prev"),nextButton=document.getElementById("page-next"),currentPage=1,itemsPerPage=16,getJSON=function(e,n){var t=new XMLHttpRequest;t.open("GET",url+e,!0),t.responseType="json",t.onload=function(){var e=t.status;n(200===e?null:e,t.response)},t.send()};function loadCompaniesListData(e,n){var t=Math.ceil(e.length/itemsPerPage);t<(n=n<1?1:n)&&(n=t),document.querySelector("#companies-list").innerHTML="";for(var a=(n-1)*itemsPerPage;a<n*itemsPerPage&&a<e.length;a++)e[a]&&(document.querySelector("#companies-list").innerHTML+='<div class="col-xxl-3 col-md-6">    <div class="card companiesList-card">        <div class="card-body">            <div class="avatar-sm mx-auto">                <div class="avatar-title bg-light rounded">                    <img src="'+e[a].companyLogo+'" alt="" class="avatar-xxs companyLogo-img">                </div>            </div>            <div class="text-center">                <a href="#!">                    <h5 class="mt-3 company-name">'+e[a].companyName+'</h5>                </a>                <div class="d-none company-desc">'+e[a].companyDesc+'</div>                <p class="text-muted industry-type">'+e[a].industryType+'</p>                <div class="d-none">                    <span class="employee">'+e[a].employee+'</span>                    <span class="location">'+e[a].location+'</span>                    <span class="rating">'+e[a].rating+'</span>                    <span class="website">'+e[a].website+'</span>                    <span class="email">'+e[a].email+'</span>                    <span class="since">'+e[a].since+'</span>                </div>            </div>            <div>                <button type="button" class="btn btn-soft-primary w-100 viewcompany-list"><span class="vacancy">'+e[a].vacancy+"</span> Jobs Available</button>            </div>        </div>    </div></div>");selectedPage(),1==currentPage?prevButton.parentNode.classList.add("disabled"):prevButton.parentNode.classList.remove("disabled"),currentPage==t?nextButton.parentNode.classList.add("disabled"):nextButton.parentNode.classList.remove("disabled"),jobDetailShow()}function selectedPage(){for(var e=document.getElementById("page-num").getElementsByClassName("clickPageNumber"),n=0;n<e.length;n++)n==currentPage-1?e[n].parentNode.classList.add("active"):e[n].parentNode.classList.remove("active")}function paginationEvents(){function e(){return Math.ceil(allCompaniesList.length/itemsPerPage)}prevButton.addEventListener("click",function(){1<currentPage&&loadCompaniesListData(allCompaniesList,--currentPage)}),nextButton.addEventListener("click",function(){currentPage<e()&&loadCompaniesListData(allCompaniesList,++currentPage)});var n=document.getElementById("page-num");n.innerHTML="";for(var t=1;t<e()+1;t++)n.innerHTML+="<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>"+t+"</a></div>";document.addEventListener("click",function(e){"A"==e.target.nodeName&&e.target.classList.contains("clickPageNumber")&&(currentPage=e.target.textContent,loadCompaniesListData(allCompaniesList,currentPage))}),selectedPage()}function jobDetailShow(){Array.from(document.querySelectorAll("#companies-list .companiesList-card")).forEach(function(d){d.querySelector(".viewcompany-list").addEventListener("click",function(){var e=d.querySelector(".companyLogo-img").src,n=d.querySelector(".company-name").innerHTML,t=d.querySelector(".company-desc").innerHTML,a=d.querySelector(".industry-type").innerHTML,o=d.querySelector(".employee").innerHTML,i=d.querySelector(".location").innerHTML,r=d.querySelector(".rating").innerHTML,c=d.querySelector(".website").innerHTML,s=d.querySelector(".email").innerHTML,l=d.querySelector(".since").innerHTML,m=d.querySelector(".vacancy").innerHTML;document.querySelector("#company-overview .company-logo").src=e,document.querySelector("#company-overview .overview-companyname").innerHTML=n,document.querySelectorAll("#company-overview .overview-industryType").forEach(function(e){e.innerHTML=a}),document.querySelector("#company-overview .overview-companydesc").innerHTML=t,document.querySelector("#company-overview .overview-company_location").innerHTML=i,document.querySelector("#company-overview .overview-employee").innerHTML=o,document.querySelector("#company-overview .overview-vacancy").innerHTML=m,document.querySelector("#company-overview .overview-rating").innerHTML=r,document.querySelector("#company-overview .overview-website").innerHTML=c,document.querySelector("#company-overview .overview-email").innerHTML=s,document.querySelector("#company-overview .overview-since").innerHTML=l})})}getJSON("job-companies-list.json",function(e,n){null!==e?console.log("Something went wrong: "+e):(loadCompaniesListData(allCompaniesList=n,currentPage),paginationEvents())});var searchElementList=document.getElementById("searchCompany");function filterData(){for(var a=document.getElementById("datepicker").value,o=document.getElementById("idType").value,e=allCompaniesList.filter(function(e){console.log(new Date(e.postDate)<=new Date(a));var n=!1,t=!1,t="all"==e.type||"all"==o||e.type==o,n=new Date(e.postDate)<=new Date(a);return t&&n||(t&&""==a?t:t&&n&&""==a?t&&n:void 0)}),n=(0==e.length?document.getElementById("pagination-element").style.display="none":document.getElementById("pagination-element").style.display="flex",document.getElementById("page-num")),t=(n.innerHTML="",Math.ceil(e.length/itemsPerPage)),i=1;i<t+1;i++)n.innerHTML+="<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>"+i+"</a></div>";loadCompaniesListData(e,currentPage)}searchElementList.addEventListener("keyup",function(){var e=searchElementList.value.toLowerCase();n=e;for(var n,e=allCompaniesList.filter(function(e){return-1!==e.companyName.toLowerCase().indexOf(n.toLowerCase())||-1!==e.industryType.toLowerCase().indexOf(n.toLowerCase())}),t=(0==e.length?document.getElementById("pagination-element").style.display="none":document.getElementById("pagination-element").style.display="flex",document.getElementById("page-num")),a=(t.innerHTML="",Math.ceil(e.length/itemsPerPage)),o=1;o<a+1;o++)t.innerHTML+="<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>"+o+"</a></div>";loadCompaniesListData(e,currentPage)}),flatpickr("#datepicker",{dateFormat:"d M, Y",defaultDate:new Date,maxDate:new Date});