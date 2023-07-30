import { HttpStatus } from "@nestjs/common";
import { IError } from "../common/interface";


export enum ErrorCode {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_EXISTED = "USER_EXISTED",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
  ABORTED = "ABORTED",
  FILE_IS_REQUIRED = "FILE_IS_REQUIRED",
  INVALID_IMAGE = "INVALID_IMAGE", // ảnh không hợp lệ
  INVALID_EXCEL = "INVALID_EXCEL", // file excel không hợp lệ
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE", // file không hợp lệ
  FILE_NOT_FOUND = "FILE_NOT_FOUND", // file không tồn tại
}

export const ErrorMessages: Record<ErrorCode, IError> = {
  [ErrorCode.USER_NOT_FOUND]: {
    code: "USER_NOT_FOUND",
    message: "User not found",
    status: HttpStatus.NOT_FOUND
  },
  [ErrorCode.USER_EXISTED]: {
    code: "USER_EXISTED",
    message: "User existed",
    status: HttpStatus.BAD_REQUEST
  },
  [ErrorCode.NOT_AUTHORIZED]: {
    code: "NOT_AUTHORIZED",
    message: "User not authorized",
    status: HttpStatus.UNAUTHORIZED
  },
  [ErrorCode.ABORTED]: {
    code: "ABORTED",
    message: "Aborted",
    status: HttpStatus.BAD_REQUEST
  },
  [ErrorCode.FILE_IS_REQUIRED]: {
    code: "FILE_IS_REQUIRED",
    message: "File is required",
    status: HttpStatus.BAD_REQUEST
  },
  [ErrorCode.INVALID_IMAGE]: {
    code: "INVALID_IMAGE",
    message: "Invalid image",
    status: HttpStatus.BAD_REQUEST
  },
  INVALID_EXCEL: {
    code: "INVALID_EXCEL",
    message: "Invalid excel",
    status: HttpStatus.BAD_REQUEST
  },
  INVALID_FILE_TYPE: {
    code: "INVALID_FILE_TYPE",
    message: "Invalid file type",
    status: HttpStatus.BAD_REQUEST
  },
  FILE_NOT_FOUND: {
    code: "FILE_NOT_FOUND",
    message: "File not found",
    status: HttpStatus.NOT_FOUND
  }
};

export default ErrorMessages;
