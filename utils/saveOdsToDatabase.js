const { PrismaClient } = require("@prisma/client");

const xlsx = require("xlsx");
const path = require("node:path");

const prisma = new PrismaClient();
const batchSize = 1000;

function extractDate(datetime) {
  if (datetime === "") return null;

  try {
    return new Date(datetime).toISOString();
  } catch (error) {
    return null;
  }
}

function readOdsFile(filePath) {
  const workbook = xlsx.readFile(filePath, { bookType: "ods" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  return jsonData;
}

async function saveToDB() {
  const data = readOdsFile(path.join(__dirname, "records.ods"));

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);

    const formatedBatch = batch.map((item) => {
      return {
        createdDT: extractDate(item.created_dt),
        outOfServiceDate: extractDate(item.out_of_service_date),
        modifiedDT: extractDate(item.data_source_modified_dt),
        dot: item.usdot_number,
        entity: item.entity_type,
        legalName: `${item.legal_name}`,
        physicalAddress: item.physical_address,
        powerUnits: item.power_units,
        dbaName: item.dba_name ? `${item.dba_name}` : null,
        mcmxff: item.mc_mx_ff_number,
        phone: item.phone,
        operatingStatus: item.record_status,
      };
    });

    await prisma.truckCompany.createMany({ data: formatedBatch });
  }
}

saveToDB();
