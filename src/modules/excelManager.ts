import Excel from "exceljs";
export async function excelToJSON(options: {
  filename?: string;
  arrayBuffer?: ArrayBuffer;
}) {
  const workbook = new Excel.Workbook();

  if (options.filename) await workbook.xlsx.readFile(options.filename);
  if (options.arrayBuffer) {
    const convertedBuffer = arrayBufferToBuffer(options.arrayBuffer);
    await workbook.xlsx.load(convertedBuffer);
  }

  const jsonString = JSON.stringify(workbook.worksheets[0]?.model);
  const rows = JSON.parse(jsonString)["rows"] as any[];

  const res: { name: string; price: number; availableUnits: number }[] = [];

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

function arrayBufferToBuffer(arrayBuffer: ArrayBuffer): Buffer {
  const buffer: Buffer = Buffer.from(arrayBuffer);
  return buffer;
}
