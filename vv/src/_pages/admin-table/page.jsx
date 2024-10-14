'use client'

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { exportToExcel } from "react-json-to-excel";

import { deleteImgTable } from "@/shared/utils/api/requests";

import { uploadImg } from "@/shared/utils/api/requests";

import { getTable, sendTable } from "@/shared/utils/api/requests";
import { H1, H2 } from "@/shared/ui";
import { toast } from "react-toastify";

export default function AdminTablePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedType, setDraggedType] = useState(null);

  const [modalDetails, setModalDetails] = useState(
    {
      isOpen: false, 
      src: '',
      colIndex: 0,
      rowIndex: 0
    }
  )

  React.useEffect(() => {
    const req = async () => {
      setJsonData((await getTable()).data[0].data)
    }

    req()
  }, [])

  const handleFileUpload = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0]);
    setJsonData([]);
    setHistory([]);
    setCurrentStep(0);
    convertToJSON(event.target.files[0]);
  };

  const convertToJSON = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setJsonData(json);
      addToHistory(json);
    };

    fileReader.readAsBinaryString(file);
  };

  const downloadExcel = () => {
    exportToExcel(jsonData, "таблиця-все-всім");
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    console.log(rowIndex, colIndex, value)
    const updatedData = JSON.parse(JSON.stringify(jsonData));
    updatedData[rowIndex][colIndex] = value;
    setJsonData(updatedData);
    addToHistory(updatedData);
  };

  const handleImgUpload = async (event, rowIndex) => {
    const src = (await uploadImg(event.target.files[0])).src
    const updatedData = JSON.parse(JSON.stringify(jsonData));
    console.log(src)
    updatedData[rowIndex][1] = src;
    console.log(updatedData)
    setJsonData(updatedData);
    addToHistory(updatedData);
  };

  const addRow = () => {
    const newRow = Array(jsonData[0].length).fill("");
    const updatedData = [...jsonData, newRow];
    setJsonData(updatedData);
    addToHistory(updatedData);
  };

  const addColumn = () => {
    const updatedData = jsonData.map((row) => [...row, ""]);
    setJsonData(updatedData);
    addToHistory(updatedData);
  };

  const deleteRow = (rowIndex) => {
    const updatedData = [...jsonData];
    updatedData.splice(rowIndex, 1);
    setJsonData(updatedData);
    addToHistory(updatedData);
  };

  const deleteColumn = (colIndex) => {
    const updatedData = jsonData.map((row) => {
      const newRow = [...row];
      newRow.splice(colIndex, 1);
      return newRow;
    });
    setJsonData(updatedData);
    addToHistory(updatedData);
  };

  const detailsModal = (colIndex, rowIndex) => {
    setModalDetails({isOpen: true, src: jsonData[rowIndex][colIndex], colIndex: colIndex, rowIndex: rowIndex})
  }

  const deleteImg = async (colIndex, rowIndex) => {
    const data = JSON.parse(JSON.stringify(jsonData))
    const filename = data[rowIndex][colIndex].split('/images/')[1]
    const response = await deleteImgTable(filename)
    if(response.status == 200){
      data[rowIndex][colIndex] = ''
      setJsonData(data)
      addToHistory(data)
    }
  }

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setJsonData(history[0]);
  };

  const addToHistory = (data) => {
    const updatedHistory = history.slice(0, currentStep + 1);
    updatedHistory.push(data);
    setHistory(updatedHistory);
    setCurrentStep(updatedHistory.length - 1);
  };

  useEffect(() => {
    if (currentStep === 0) {
      setJsonData(history[0]);
    } else {
      setJsonData(history[currentStep]);
    }
  }, [currentStep, history]);

  // if (jsonData.length === 0) {
  //   const rows = [];
  //   for (let i = 0; i < 5; i++) {
  //     const row = [];
  //     for (let j = 0; j < 3; j++) {
  //       row.push(`Random Data ${i + 1}-${j + 1}`);
  //     }
  //     rows.push(row);
  //   }
  //   setJsonData(rows);
  //   addToHistory(rows);
  // }

  const handleDragStart = (event, rowIndex, colIndex, type) => {
    console.log(1)
    setDraggedIndex(type === "row" ? rowIndex : colIndex);
    setDraggedType(type);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event, targetIndex, type) => {
    if (draggedIndex === targetIndex || draggedType !== type) {
      return;
    }

    const updatedData = [...jsonData];

    if (type === "row") {
      const removedRow = updatedData.splice(draggedIndex, 1)[0];
      updatedData.splice(targetIndex, 0, removedRow);
    } else if (type === "col") {
      for (let i = 0; i < updatedData.length; i++) {
        const removedCell = updatedData[i].splice(draggedIndex, 1)[0];
        updatedData[i].splice(targetIndex, 0, removedCell);
      }
    }

    setJsonData(updatedData);
    addToHistory(updatedData);
  };

  return (
    <div className="Table">
      {modalDetails.isOpen &&
        <div className="absolute z-[100] w-full h-svh top-0 bottom-0 bg-gray bg-opacity-50">
          <div className="p-4 border flex flex-col gap-2  text-white bg-black">
            <button className="" onClick={() => {
              setModalDetails({isOpen: false, src: ''})
            }}>X</button>
            <p>Фото:</p>
            <img src={modalDetails.src} className="bg-white" width={100} height={100}></img>
            <div className="flex flex-row gap-4">
              <a target="_blank" href={modalDetails.src} className=" underline">Переглянути фото</a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
            <div className="flex flex-row gap-4" onClick={() => {

              setModalDetails({isOpen: false, src: ''})
            }}>
              <p className=" underline" onClick={() => {
                deleteImg(modalDetails.colIndex, modalDetails.rowIndex)
                const data = JSON.parse(JSON.stringify(jsonData))
                data[modalDetails.rowIndex][modalDetails.colIndex] = ''
                setJsonData(data)
                }}>Видалити фото</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
        </div>
        
      }
      <div className="container">
        <h1 className="h1Table">Редактор таблиці Все Всім</h1>
        <div className="download-selectFile">
            <div className="flex flex-col py-2">
                <H1 text="Важливо!" className=" font-bold"></H1>
                <H2 text="Видаливши фото - повернути його неможливо."></H2>
            </div>
          {/* <label htmlFor="file-upload" className="file-select-button">
            <input
              type="file"
              id="file-upload"
              accept=".xls,.xlsx"
              onChange={handleFileUpload}
            />
            <span className="file-icon">
              <p></p>
            </span>
            <span className="file-text">
              {selectedFile ? selectedFile.name : "Вибрати свій файл"}
            </span>
          </label> */}
          <button
            onClick={downloadExcel}
            disabled={jsonData?.length === 0}
            className="download-button"
          >
            Скачати таблицю
          </button>
        </div>
        {jsonData?.length > 0 && (
          <div className="json-table-container">
            <table className="json-table">
              <thead>
                <tr>
                  <th></th>
                  {jsonData[0].map((_, colIndex) => {
                    if(colIndex === 1){return(
                      <th>
                      Фото
                    </th>
                    )}
                    if(colIndex === 0){return(
                      <th>
                      Назва
                    </th>
                    )}
                    return(
                    <th
                      key={colIndex}
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(event, null, colIndex, "col")
                      }
                      onDragOver={handleDragOver}
                      onDrop={(event) => handleDrop(event, colIndex, "col")}
                    >
                      Колонка {colIndex - 1}
                      <button
                        onClick={() => deleteColumn(colIndex)}
                        className="delete-column-button"
                      >
                        &times;
                      </button>
                    </th>
                    )})}
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {jsonData?.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, rowIndex, null, "row")
                    }
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, rowIndex, "row")}
                  >
                    <th>Ряд {rowIndex + 1}</th>
                    {row.map((value, colIndex) => {
                      if(rowIndex === 0 && colIndex === 1){
                        return <td key={colIndex}>-</td>
                      }
                      if(colIndex === 1){
                        if(!value){
                          return(
                            <td key={colIndex}>
                              <input
                                type="file"
                                id="file-upload"
                                accept=".png,.jpg,.jpeg"
                                onChange={(e) => handleImgUpload(e, rowIndex)}
                              />
                            </td>
                            )
                        } else{
                          return(
                            <td key={colIndex} className="flex flex-row items-center gap-2">
                              <img className="w-10 h-10" src={value}></img>
                              <p className=" underline" onClick={() => {detailsModal(colIndex, rowIndex)}}>переглянути</p>
                            </td>
                            )
                        }
                        }
                      return (
                      <td key={colIndex}>
                        <input
                          type="text"
                          className="Edit-input"
                          value={value}
                          onChange={(e) =>
                            handleCellChange(rowIndex, colIndex, e.target.value)
                          }
                        />
                      </td>
                    )})}
                    <td>
                      <button className="buttonTable" onClick={() => deleteRow(rowIndex)}>
                        Видалити ряд
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-actions flex">
              <button className="buttonTable" onClick={addRow}>Додати пустий ряд</button>
              <button className="buttonTable" onClick={addColumn}>Додати пусту колонку</button>
              {/* <button className="buttonTable" onClick={undo} disabled={currentStep === 0}>
                Повернути назад
              </button>
              <button
              className="buttonTable"
                onClick={redo}
                disabled={currentStep === history.length - 1}
              >
                Повернути вперед
              </button> */}
              <button className="buttonTable" onClick={async () => {
                setJsonData((await getTable()).data[0].data)
              }} disabled={currentStep === 0}>
                Повернути останню збережену версію
              </button>
              <button className="buttonTable" onClick={async () => {
                try{
                  await sendTable(jsonData)
                  toast("Nice!", {type: "success"})
                } catch {

                }
              }} disabled={currentStep === 0}>
                Зберегти
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}