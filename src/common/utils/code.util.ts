export class CodeUtil {

  // kiểm tra có phải số vn không  nếu không trả về boolean
  static isPhoneNumberVN(phone: string): boolean {
    return /^0[0-9]{9}$/.test(phone);
  }
}