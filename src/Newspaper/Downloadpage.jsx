import React from "react";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

const DownloadPage = ({rootElementId,dowmloadFileName})=>{
    const DownloadFiledocument =()=>{
        const input = document.getElementById(rootElementId)
        html2canvas(input).then((canvas)=>{
            const imgData = canvas.toDataURL("image/png") 
            
            const pdf = new jsPDF("p","pt","a4")
            const width = canvas.width * (25.4 / 96);
            
            // first page
            pdf.addImage(imgData,"JPEG",10,50,600,700) // increase y from 10 to 50
            // add new page
            pdf.addPage()
            // second page
            pdf.addImage(imgData,"JPEG",10,100,600,700) // increase y to create more space
            
            pdf.save('NewsPaper_layout')
        }
        )
            

    }
    return(
        <div>
            <button onClick={DownloadFiledocument}>Download page</button>
        </div>
    )
    
}
export default DownloadPage;
