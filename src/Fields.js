import React, {useState} from 'react'
import NestedCheckbox from "./NestedCheckbox"

const CheckboxFields = () => {
  const fields = [
    {
      "name": "date",
      "type": "string"
    },
    {
      "name": "timestamp",
      "type": "long"
    },
    {
      "name": "id",
      "type": "string"
    },
    {
      "default": null,
      "name": "type",
      "type": [
        "null",
        "string"
      ]
    },
    {
      "name": "actor",
      "type": {
        "fields": [
          {
            "default": null,
            "name": "id",
            "type": [
              "null",
              "int"
            ]
          },
          {
            "default": null,
            "name": "login",
            "type": [
              "null",
              "string"
            ]
          },
          {
            "default": null,
            "name": "gravatar_id",
            "type": [
              "null",
              "string"
            ]
          },
          {
            "default": null,
            "name": "url",
            "type": [
              "null",
              "string"
            ]
          },
          {
            "default": null,
            "name": "avatar_url",
            "type": [
              "null",
              "string"
            ]
          },
          {
            "default": null,
            "name": "display_login",
            "type": [
              "null",
              "string"
            ]
          }
        ],
        "name": "actor",
        "type": "record"
      }
    },
    {
      "name": "repo",
      "type": {
        "fields": [
          {
            "default": null,
            "name": "id",
            "type": [
              "null",
              "int"
            ]
          },
          {
            "default": null,
            "name": "name",
            "type": [
              "null",
              "string"
            ]
          },
          {
            "default": null,
            "name": "url",
            "type": [
              "null",
              "string"
            ]
          }
        ],
        "name": "repo",
        "type": "record"
      }
    },
    {
      "default": null,
      "name": "payload",
      "type": [
        "null",
        "string"
      ]
    },
    {
      "default": null,
      "name": "org",
      "type": [
        "null",
        "string"
      ]
    },
    {
      "name": "created_at",
      "type": "long"
    },
    {
      "name": "public",
      "type": "boolean"
    }
  ];

  const [maskedColumns, setMaskedColumns] = useState([]);
  const [encryptedColumns, setEncryptedColumns] = useState([]);

  const handleMaskedColumnsCheckboxChange = (e) => {
    if(e.target.checked === true){
      const found = maskedColumns.some(el => el.name === e.target.name);
      if (!found) maskedColumns.push(e.target.name);
    } else{
      maskedColumns.splice(maskedColumns.findIndex(a => a.name === e.target.name) , 1)
    }
  }

  const handleEncryptedColumnsCheckboxChange = (e) => {
    if(e.target.checked === true){
      const found = encryptedColumns.some(el => el.name === e.target.name);
      if (!found) encryptedColumns.push(e.target.name);
    } else{
      encryptedColumns.splice(encryptedColumns.findIndex(a => a.name === e.target.name) , 1)
    }
  }   

  const showFields = () => {
    const result = {maskedColumns, encryptedColumns}
    console.log("Final Result", result);
  }

  
  return (
    <div className='shadow-lg p-3 mb-5 bg-white rounded mx-auto' style={{width: "100%"}}>
      {fields.map((field, index) => (
        <div key={index}>
          {field.type.fields !== undefined ? 
            <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${field.name}`} aria-expanded="false" aria-controls={field.name}>
                  {field.name}
                </button>
              </h2>
              <div id={field.name} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  {field.type.fields.map((nested, index) => (
                          <div className='' key={index}><label htmlFor={nested.name}>{nested.name}</label>
                          <input type="checkbox" name={`${field.name}.${nested.name}`} onChange={handleMaskedColumnsCheckboxChange} /> 
                          <input type="checkbox" name={`${field.name}.${nested.name}`} onChange={handleEncryptedColumnsCheckboxChange} /> <br />
                          </div>
                        ))}
                </div>
              </div>
            </div>
          </div>
             : 
            <div className='px-4'>
            <label htmlFor={field.name}>{field.name}</label>
            <input type="checkbox" name={field.name} onChange={handleMaskedColumnsCheckboxChange} /> 
            <input type="checkbox" name={field.name} onChange={handleEncryptedColumnsCheckboxChange} /> <br />
            </div>
          }          
        </div>
      ))}
      <button className='btn btn-primary mt-3 px-4' onClick={showFields}>Save & Continue</button>
    </div>
  )
}

export default CheckboxFields;