export interface Filters{
  filter_name: String;
  options: Array<any>;
}
export interface container {
  // AvailableUnits: number; //avl_unts
  // DepotId: number; //dpt_id
  // ContainerSizeId: number; //cntnr_sz_id
  // ContainerTypeId: number; //cntnr_typ_id
  // SaleCondtionId: number; //sl_cndtn_id
  // ColorCodeId: number; //clr_cd_id
  // CountryId: number; //cntry_id
  // CityId: number; //cty_id
  // DepotCode: string; //dpt_cd
  // ContainerSizeCode: string; //cntnr_sz_cd
  // ContainerTypeCode: string; //cntnr_typ_cd
  // CurrencyId: number; //crrncy_cd
  // VaildFrom: String; //vld_frm
  // ValidTo: string; //vld_to
  // CityName: string; //cty_nam
  // SaleConditionName: string; //sl_cndtn_nam
  // ColorCodeName: string; //clr_cd_nm
  // DepotName: string; //dpt_nam
  // ExpectedUnits: number; //expctd_unts
  // SalePrice: number; //sl_prc_nc

sL_OFFR_UNT_DTL_BIN: number;
        avL_UNTS: number;
        dpT_ID: number;
        cntnR_SZ_ID:number;
        cntnR_TYP_ID: number;
        sL_CNDTN_ID:number;
        clR_CD_ID: number;
        cntrY_ID: number;
        ctY_ID: number;
        dpT_CD: string;
        cntnR_SZ_CD: string;
        cntnR_TYP_CD: string;
        crrncY_ID: number;
        crrncY_CD: string;
        sL_PRC_NC: number;
        vlD_FRM: string;
        vlD_TO: string;
        ctY_NAM: string;
        sL_CNDTN_NAM: string;
        clR_CD_NM: string;
        dpT_NAM: string;
        expctD_UNTS:number;
        Image: string;
    
}
export interface country{
    CountryId: number; //cntry_id
    CountryCode: string; //cntry_cd
    CountryName: string; //cntry_nam
}
export interface filterValue {
  filterTitle: string;
  filterName: string;
  options: Array<any>;
  counts: Array<any>;
}
export interface filterValues {
  fltNm: string,
  avlUnt: any
  }
  