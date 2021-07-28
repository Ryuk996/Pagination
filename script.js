
    const tableContainer= document.createElement("div")
    tableContainer.className="tableLoad";
    document.body.append(tableContainer)


 let page1=document.createElement("div")
 page1.className="pagination";
 tableContainer.append(page1)

 function loadTable(users){
    const userList=document.createElement('div');
    userList.className="user-list";
    let table=document.createElement('table');
    let tr=document.createElement('tr');
    let thead1=document.createElement('th');
    let thead2=document.createElement('th');
    let thead3=document.createElement('th');
    thead1.innerHTML="ID"
    thead2.innerHTML="NAME"
    thead3.innerHTML="E-MAIL_ID"
    
    tr.append(thead1,thead2,thead3);
    table.append(tr);
    userList.append(table);
    tableContainer.append(userList);
    document.body.append(tableContainer);
        users.forEach(user => {
         console.log(user);
          let row=document.createElement("tr");
          row.innerHTML=`<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          </tr> ` ;
          table.append(row);
        });
    }
    
    async function getUsers() {
        const data = await fetch(
          "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
          {
            method: "GET"
          }
        );
      
        const users = await data.json();
        const noOfPages = Math.ceil(users.length / 10);
        
        const pagination = document.querySelector(".pagination");
        pagination.className="clickbuttons";
        localStorage.setItem("LastPage",noOfPages);
        localStorage.setItem("key",1);
        {
          let prev=document.createElement("button");
          prev.innerText="<<prev.";
          prev.className="prev";
          prev.onclick=function(){
            let i=localStorage.getItem("key");
            console.log(i);
            if(i>1)
            {
              i=i-1;
            }
            localStorage.setItem("key",i);
            const pageUsers =users.filter((user, index) =>
            filterUsers(index, (i - 1) * 10, i * 10)
            );
          document.querySelector(".user-list").remove();
          loadTable(pageUsers);
        }
          pagination.append(prev);
      }
        
        for (let i = 1; i <= noOfPages; i++) {
          const page = document.createElement("button");
          page.innerText = i;
          page.onclick = function () {
            console.log("clicked...", i,users);
            localStorage.setItem("key",i);
            const pageUsers =users.filter((user, index) =>
            filterUsers(index, (i - 1) * 10, i * 10)
            );
          document.querySelector(".user-list").remove();
          loadTable(pageUsers);
          };
          pagination.append(page);
        }
        {
          const next=document.createElement("button");
          next.innerText="next>>";
          next.className="next";
          next.onclick=function(){
            let i=localStorage.getItem("key");
            console.log(i);
            let LastPage=localStorage.getItem("LastPage");
            if(i!==LastPage)
            {
              i=parseInt(i)+1;
            }
            localStorage.setItem("key",i);
            const pageUsers =users.filter((user, index) =>
            filterUsers(index, (i - 1) * 10, i * 10)
            );
          document.querySelector(".user-list").remove();
          loadTable(pageUsers);
          }
          pagination.append(next);
        }
        const firstTenUsers = users.slice(0, 10);
        console.log(firstTenUsers);
        console.log("No of users are ", users.length);
        loadTable(firstTenUsers);
      }
      function filterUsers(index, startIdx, endIdx) {
        return index >= startIdx && index < endIdx;
      }
getUsers()