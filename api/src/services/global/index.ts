import fs from "fs/promises";
import path from "path";
import { IUploadFileInputDto } from "../../dto/upload/index.js";
import moment from "moment-timezone";
import { CustomError } from "../../errors/index.js";

export class GeralService {
  static async uploadFile(params: IUploadFileInputDto): Promise<string> {
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

    return `${params.pathFolder}/${filename}`;
  }

  static async deleteFolder(pathFolder: string): Promise<void> {
    const fullPath = path.join(process.cwd(), "uploads", pathFolder);

    try {
      await fs.rm(fullPath, { recursive: true, force: true });
    } catch (error) {
      throw new CustomError("Erro ao deletar arquivos", "BAD_REQUEST");
    }
  }

  static async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(process.cwd(), filePath);

    try {
      await fs.unlink(fullPath);
    } catch (error) {
    }
  }

  static toBRDate(date: Date): string {
    return moment(date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss")
  }
}