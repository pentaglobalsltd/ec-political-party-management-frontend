export interface AllocatedSymbol {
  id: number | string;
  nameEn: string;
  nameBn: string;
}

export interface AllocatedSymbolListType {
  page?: number;
  size?: number;
  total?: number;
  symbols: AllocatedSymbol[];
}

export interface AllocatedSymbolListTypeRes {
  data?: AllocatedSymbolListType;
  status?: number;
  statusText?: string;
}
