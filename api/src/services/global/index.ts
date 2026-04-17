import fs from "fs/promises";
import path from "path";
import { IUploadFileInputDto } from "../../dto/upload/index.js";
import moment from "moment-timezone";

export class GeralService {
  async uploadFile(params: IUploadFileInputDto): Promise<string> {
    const ext = path.extname(params.file.filename); // .png, .jpg
    const filename = `${params.id}${ext}`;

    const fullPath = path.join(process.cwd(), "uploads", params.pathFolder);
    await fs.mkdir(fullPath, { recursive: true });
    const uploadPath = path.join(fullPath, filename);
    try {
      await fs.unlink(uploadPath); // caso já tenha um arquivo existente
    } catch {
      // ignora — arquivo não existe ainda
    }

    const buffer = await params.file.toBuffer();
    await fs.writeFile(uploadPath, buffer);

    return `uploads/${params.pathFolder}/${filename}`;
  }
  toBRDate(date: Date): string {
    return moment(date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss")
  }
}