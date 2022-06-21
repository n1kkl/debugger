export interface ServerEvent<TData> {
    data: TData;
    id?: string;
    type?: string;
    retry?: number;
}