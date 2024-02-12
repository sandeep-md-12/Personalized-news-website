import React from "react";
import html2canvas from "html2canvas";
import jsPDF, {jspdf} from 'jspdf';

const DownloadPage = ({rootElementId,dowmloadFileName})=>{
    const DownloadFiledocument =()=>{
        const input = document.getElementById(rootElementId)
        html2canvas(input).then((canvas)=>{
            const imgData = canvas.toDataURL("image/png") 
            const pdf = new jsPDF("p","pt","a4")
            const width = canvas.width * (25.4 / 96);
            pdf.addImage(imgData,"JPEG",10,10,600,4000)
            pdf.save('${downloadFileName}')
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