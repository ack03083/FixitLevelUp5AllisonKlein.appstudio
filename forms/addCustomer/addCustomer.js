
addCustomer.onshow=function(){
    lstName.clear()
    let query = "SELECT name FROM customer"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)
    
  if (req1.status == 200) { 
    results = JSON.parse(req1.responseText)
    if (results.length == 0)
        MSB.MsgBox("There are no company names.")
    else {        
        let message = ""
        for (i = 0; i <= results.length - 1; i++){
            message = results[i][0] 
        }
     } 
  } else {
      NSB.MsgBox("Something run")
  }
  hb3.clear()
  hb3.addItem("See Customers")
  hb3.addItem("Edit Customers")
  hb3.addItem("Delete Customers")
  hb3.addItem("Add Customers")
}

hb3.onclick=function(s) {
  if (typeof(s) == "object") {
       return
    }
    switch(s) {
      case "See Customers":
          ChangeForm(seeCustomers)
          break
       case "Edit Customers":
          ChangeForm(deleteUpdateCustomer)
          break
       case "Delete Customers":
          ChangeForm(deleteUpdateCustomer)
          break
      case "Add Customers":
          ChangeForm(addCustomer)
          break
     }
}

btnAdd.onclick=function(){
  let newName1 = inptName.value
  let newCity1 = inptCity.value
  let newStreet1 = inptStreet.value
  let newState1 = inptState.value
  let newZipCode1 = inptZip.value
  let queryInsert = "INSERT INTO customer (name,street,city,state,zipcode) VALUES ('"+newName1+"', '"+newStreet1+"', '"+newCity1+"','"+ newState1+"'," +newZipcode1+")"

    req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + queryInsert)

    if (req2.status == 200) {
        if (req2.responseText == 500) { 
            let message = ""
            let queryNew = "SELECT name FROM customer"
            req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + queryNew)
                if (req3.status==200){
                  results=JSON.parse(req3.responseText)
                  
                  let message = ""
                  for (i=0; i <= results.length-1; i++){
                      message = results[i][0] 
                  }
                    
            let query4 = "SELECT * FROM customer WHERE name=" + '"' + newName1 + '"'
                     
            req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query4)
      
                    if (req4.status == 200) { 
                          results = JSON.parse(req4.responseText)
                               
                          let message2 = ""
                          for (i = 1; i <= 5; i++)
                              message2 = message2 + results[0][i] + ", "
                          modInfo.value = message2
                          modInfo.footer= newNameA
                }      
                      
                modInfo.toggle()
          }
            
      } else {
          NSB.MsgBox("There was a problem adding the name to the database.")
      }
    } else {
        NSB.MsgBox("Error: " + req1.status)
    }  
}

  

