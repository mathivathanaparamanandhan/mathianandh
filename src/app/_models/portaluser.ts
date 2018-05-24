export interface PortalUser {
    UserID: number; // PRTL_USR_ID
    Username: string; // PRTL_USR_NAM
    Password: string; // PRTL_USR_PSSWRD
    EmailID: string; // PRTL_USR_EML_ID
    LoginAttemptCount: number; // LGN_ATTMPT_COUNT
    UserContactPerson: string; // PRTL_USR_CNTCT_PRSN_NAM
    UserAddress: string; // PRTL_USR_ADDRSS
    UserCustomerName: string; // PRTL_USR_CSTMR_NAM
    UserPhoneNo: number; // PRTL_USR_PHN_NO
    UserCountryID: number; // PRTL_USR_CNTRY_ID
    UserCityName: string; // PRTL_USR_CTY_NAM
    UserStatusUpdatedBy: string; // PRTL_USR_STTS_UPDTD_BY
    UserStatusID: number; // PRTL_USR_STTS_ID
    UserStatusDate: Date; // PRTL_USR_STTS_DT
    MappingOrganisationID: number; // PRTL_USR_MPPNG_ORGNSTN_ID
    MappingCustomerID: number; // PRTL_USR_MPPNG_CSTMR_ID
    UserActivationCode: string; // PRTL_USR_ACTVTN_CD
    UserComments: string; // PRTL_USR_CMMNTS
    PrefferedCurrency: string; // PRTL_PRFRRD_CRRNCY
    UserRemarks: string; // PRTL_USR_RMRKS
    UserActivatedBit: boolean; // PRTL_USR_ACTVTD_BT
    UserActivateBit: boolean; // PRTL_USR_ACTV_BT
    RoleID: number; // RL_ID
    UserCreatedBy: string; // PRTL_USR_CRTD_BY
    UserCreatedDate: Date; // PRTL_USR_CRTD_DT
    ModifiedBy: string; // PRTL_USR_MDFD_BY
    ModifiedDate: Date; // PRTL_USR_MDFD_DT
    UserLogID: number; // PRTL_USR_LG_ID
    ChangePasswordDate: Date; // CHNG_PSSWRD_DT
    DummyPassword: string; // PRTL_USR_DMMY_PSSWRD
    UserCountryName: string; //
    // NewPassword: string; //NewPassword
}