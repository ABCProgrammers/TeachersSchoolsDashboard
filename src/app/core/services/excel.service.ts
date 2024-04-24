// excel.service.ts
import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcel(sections: { headers: string[], data: any[], heading: string[] }[], fileName: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Function to add a section with data and a gap after each section
    const addSection = (section: { headers: string[], data: any[], heading: string[] }) => {
      if (section.heading.length) {
        const heading = worksheet.addRow(section.heading);
        heading.font = { bold: true, size: 16, color: { argb: 'ff000000' } };
      }
      const headerRow = worksheet.addRow(section.headers); // Add section header
      headerRow.font = { bold: true, size: 12, color: { argb: 'ff000000' } };
      section.data.forEach(row => {
        worksheet.addRow(row); // Add data rows
      });
      worksheet.addRow([]); // Add gap after each section
    };

    // Add sections with data
    sections.forEach(section => {
      addSection(section);
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName + '.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}

//So sometimes i want to export like this

//Here Main Heading Like User Info // this will be main heading
//Heading Value  Heading Value Heading Value  // so we can say key and value in same row in each cell

//User Details
//Firstname       LastNam      Age
//ABC                   CDEF             24
//One Line Space Here
//User Address
//HouseNo    Area          City
//ABC              CDEF         Lahore
//One Line Space Here
//Degree Details
//Degree   Grade    College
//ABC         CDEF     DFRG
