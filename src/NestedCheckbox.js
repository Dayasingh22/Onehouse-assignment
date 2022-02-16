import React, {useState} from 'react';

const CheckboxComponent = ({ field }) => {

  const [maskedColumns, setMaskedColumns] = useState([]);
  const [encryptedColumns, setEncryptedColumns] = useState([]);

  const handleMaskedColumnsCheckboxChange = (e) => {
    if(e.target.checked === true){
      const found = maskedColumns.some(el => el.name === e.target.name);
      if (!found) maskedColumns.push(e.target.name);
    } else{
      maskedColumns.splice(maskedColumns.findIndex(a => a.name === e.target.name) , 1)
    }
    console.log("DFVfdvdvf", maskedColumns)
  }

  const handleEncryptedColumnsCheckboxChange = (e) => {
    if(e.target.checked === true){
      const found = encryptedColumns.some(el => el.name === e.target.name);
      if (!found) encryptedColumns.push(e.target.name);
    } else{
      encryptedColumns.splice(encryptedColumns.findIndex(a => a.name === e.target.name) , 1)
    }
    console.log("FDvdvdfv", encryptedColumns)
  }   

  const showFields = () => {
    const result = {maskedColumns, encryptedColumns}
    console.log("Final Result", result);
  }

  const nestedCheckboxes = (field.type.fields || []).map(singleField => {
    return <CheckboxComponent key={singleField.name} field={singleField} parentField={field} type="child" />

  })

  return (
    <>
      {
        nestedCheckboxes.length > 0 ?
         <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
          <label htmlFor={field.name}>{field.name}</label> <br />
          {nestedCheckboxes}
        </div>
      : 
      <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
        <div>
          <>
              <label htmlFor={field.name}>{field.name}</label>
              <input type="checkbox" name={field.name} onChange={handleMaskedColumnsCheckboxChange} /> 
              <input type="checkbox" name={field.name} onChange={handleEncryptedColumnsCheckboxChange} /> <br />
              </>
        </div>
    </div>
    }
    </>
    
  )
}

export default CheckboxComponent;