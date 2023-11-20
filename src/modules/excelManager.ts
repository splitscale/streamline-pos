import Excel from "exceljs";
export async function excelToJSON(filename?: string, buffer?: Buffer) {
  const workbook = new Excel.Workbook();

  if (filename) await workbook.xlsx.readFile(filename);
  if (buffer) await workbook.xlsx.load(buffer);

  const jsonString = JSON.stringify(workbook.worksheets[0]?.model);
  const rows = JSON.parse(jsonString)["rows"] as any[];

  const res: any[] = [];

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i]["cells"];

    const mapped = {
      name: cells[0]["value"] as string,
      price: cells[1]["value"] as number,
      availableUnits: cells[2]["value"] as number,
    };

    res.push(mapped);
  }

  return res;
}
