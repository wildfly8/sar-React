export default class SecurityConstants {
    static SECTOR_CRYPTO               = "CRYPTO"
	static SECTOR_CASH 			   	   = "CASH"
    static SECTOR_ETF                  = "ETF"
    static SECTOR_BANKS   			   = "BK"
    static SECTOR_CONSUMER_GOODS   	   = "CG"
    static SECTOR_HEALTHCARE           = "HC"
    static SECTOR_MEDIA        	   	   = "MD"
    static SECTOR_SOFTWARE        	   = "SW"
    static SECTOR_BUSINESS_SERVICES    = "BS"
    static SECTOR_CONSUMER_SERVICES    = "CS"
    static SECTOR_HARDWARE      	   = "HW"
    static SECTOR_INDUSTRIAL_MATERIALS = "IM"
    static SECTOR_ENERGY               = "EN"
    static TRADED_SECTORS     	       = [SecurityConstants.SECTOR_ETF, SecurityConstants.SECTOR_CONSUMER_GOODS, SecurityConstants.SECTOR_HEALTHCARE, SecurityConstants.SECTOR_MEDIA, SecurityConstants.SECTOR_SOFTWARE, SecurityConstants.SECTOR_BUSINESS_SERVICES, SecurityConstants.SECTOR_BANKS, SecurityConstants.SECTOR_CONSUMER_SERVICES, SecurityConstants.SECTOR_HARDWARE, SecurityConstants.SECTOR_INDUSTRIAL_MATERIALS, SecurityConstants.SECTOR_ENERGY]
}