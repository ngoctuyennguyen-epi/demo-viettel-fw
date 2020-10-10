export class HttpErrorMappingConfig {
    public static readonly STATUS_MAP: ReadonlyMap<number, string> = new Map([
        [500, 'Lỗi máy chủ'],
        [502, 'Máy chủ ngưng hoạt động'],
        [400, 'Lỗi máy khách'],
        [401, 'Người dùng chưa xác thuc'],
        [403, 'Người dùng không có quyền truy cập'],
        [404, 'Không tìm thấy tài nguyên trên máy chủ']
    ]);
}
