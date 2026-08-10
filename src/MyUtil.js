import { WATCHLIST_HEADERS }  from './components/WatchListTable'
import { RATING_ENFORCEMENT_HEADERS }  from './components/RatingEnforcementTable'
import SecurityConstants from './SecurityConstants'
import ExchangeConstants from './ExchangeConstants'


const TRILLION = 1000000000000;
const BILLION = 1000000000;
const MILLION = 1000000;

export const formatDate = (long) => {
    if(!long)
        return null
    const date = new Date(long)
    let year = date.getFullYear()
    let month = date.getUTCMonth() + 1
    let dt = date.getUTCDate()
    if (dt < 10) {
        dt = '0' + dt
    }
    if (month < 10) {
        month = '0' + month
    }
    return month + '/' + dt + '/' + year.toString().slice(-2)
}

export const formatSimpleDate = (long) => {
    if(!long)
        return null
    const date = new Date(long)
    let year = date.getFullYear()
    let month = date.getUTCMonth() + 1
    if (month < 10) {
        month = '0' + month
    }
    return year.toString() + '-' + month
}

export const formatNumber = (number) => {
    if(number == null) {
        return null
    }
    if(number > TRILLION) {
        return `${(number / TRILLION).toFixed(2)} T`
    } else if(number > BILLION) {
        return `${(number / BILLION).toFixed(2)} B`
    } else {
        return `${(number / MILLION).toFixed(2)} M`
    }
}

export const formatNumberInComma = (number) => {
    if(number == null) {
        return ""
    }
    return number.toLocaleString()
}

export const formatNumberInCommaWithDecimal = (number, decimal) => {
    if(number == null) {
        return ""
    }
    return number.toLocaleString('en-US', {minimumFractionDigits: decimal, maximumFractionDigits: decimal})
}

export const formatNumberInPercentWithDecimal = (number, decimal) => {
    if(number == null) {
        return ""
    }
    return number.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: decimal, maximumFractionDigits: decimal})
}

export const assembleWatchlistTableRow = (apiINVWatchlistTicker, index) => {
    return {
        [WATCHLIST_HEADERS.id]: index,
        [WATCHLIST_HEADERS.ticker]: apiINVWatchlistTicker.ticker,
        [WATCHLIST_HEADERS.exchange]: apiINVWatchlistTicker.exchange,
        [WATCHLIST_HEADERS.algoRating]: apiINVWatchlistTicker.algoRating,
        [WATCHLIST_HEADERS.mktCap]: apiINVWatchlistTicker.mktCap,
        [WATCHLIST_HEADERS.earDate]: apiINVWatchlistTicker.keyStats.nextEarningsDate,
        [WATCHLIST_HEADERS.divYld]: apiINVWatchlistTicker.keyStats.divYield,
        [WATCHLIST_HEADERS.exDate]: apiINVWatchlistTicker.keyStats.nextExDate,
        [WATCHLIST_HEADERS.floatPercent]: apiINVWatchlistTicker.keyStats.floatPercent,
        [WATCHLIST_HEADERS.avgVolume]: apiINVWatchlistTicker.keyStats.avgTradingVol,
        [WATCHLIST_HEADERS.shortRatio]: apiINVWatchlistTicker.keyStats.shortRatio,
        [WATCHLIST_HEADERS.numOfEmployees]: apiINVWatchlistTicker.keyStats.numOfEmployees,
        [WATCHLIST_HEADERS.insiderPercent]: apiINVWatchlistTicker.keyStats.insiderOwnershipPercent,
        [WATCHLIST_HEADERS.institutionPercent]: apiINVWatchlistTicker.keyStats.instOwnershipPercent,
        [WATCHLIST_HEADERS.netIncome]: apiINVWatchlistTicker.keyStats.nIAC_TTM,
        [WATCHLIST_HEADERS.freeCashflow]: apiINVWatchlistTicker.keyStats.leveredFreeCashFlow_TTM,
        [WATCHLIST_HEADERS.netMargin]: apiINVWatchlistTicker.keyStats.profitMargin_TTM,
        [WATCHLIST_HEADERS.returnOnAsset]: apiINVWatchlistTicker.keyStats.rOA_TTM,
        [WATCHLIST_HEADERS.returnOnEquity]: apiINVWatchlistTicker.keyStats.rOE_TTM,
        [WATCHLIST_HEADERS.quarterlyRevenueGrowthYoY]: apiINVWatchlistTicker.keyStats.quarterlyRevenueGrowth_YOY,
        [WATCHLIST_HEADERS.quarterlyEarningsGrowthYoY]: apiINVWatchlistTicker.keyStats.quarterlyEarningsGrowth_YOY,
        [WATCHLIST_HEADERS.debtToEquity]: apiINVWatchlistTicker.keyStats.debtToEquity_MRQ,
        [WATCHLIST_HEADERS.pE]: apiINVWatchlistTicker.keyStats.trailingPE_TTM,
        [WATCHLIST_HEADERS.forwardPE]: apiINVWatchlistTicker.keyStats.forwardPE_TTM,
        [WATCHLIST_HEADERS.pS]: apiINVWatchlistTicker.keyStats.pS_TTM,
        [WATCHLIST_HEADERS.pB]: apiINVWatchlistTicker.keyStats.pB_MRQ,
        [WATCHLIST_HEADERS.isDow30]: apiINVWatchlistTicker.keyStats.isDow30,
        [WATCHLIST_HEADERS.isSnP500]: apiINVWatchlistTicker.keyStats.isSnP500,
        [WATCHLIST_HEADERS.isNasdaq100]: apiINVWatchlistTicker.keyStats.isNasdaq100,
    }
}

export const assembleRatingEnforcementTableRow = (apiRatingEnforcement) => {
    return {
        [RATING_ENFORCEMENT_HEADERS.id]: apiRatingEnforcement.id,
        [RATING_ENFORCEMENT_HEADERS.ticker]: apiRatingEnforcement.ticker,
        [RATING_ENFORCEMENT_HEADERS.systemRating]: apiRatingEnforcement.systemRating.propRatingCode,
        [RATING_ENFORCEMENT_HEADERS.enforcedRating]: apiRatingEnforcement.enforcedRating.propRatingCode,
        [RATING_ENFORCEMENT_HEADERS.enforcedReason]: apiRatingEnforcement.enforcedReason
    }
}

export const aggregateFullTickers = (editableMap) => {
    let allUITickers = []
    SecurityConstants.TRADED_SECTORS.forEach(sector => {
        const sectorValidRows = editableMap[sector].filter(row => row.ticker)
        allUITickers = [...allUITickers, ...sectorValidRows.map(row => `${row.exchange? row.exchange : ExchangeConstants.STR_SMART}_${row.ticker.toUpperCase()}_${sector}`)]
    })
    return allUITickers
}

export const aggregateEditableRatingEnforcements = (editableArray) => {
    const validRows = editableArray.filter(row => row.ticker)
    return validRows.map(row => {
        if(row.isNew) {
            row.id = null
        }
        row.ticker = row.ticker.toUpperCase()
        row.systemRating = row.systemRating.toUpperCase()
        row.enforcedRating = row.enforcedRating.toUpperCase()
        return row
    })
}

export const aggregatePTEnforcementAudit = (pxTargets, editablePxTargets) => {
    return pxTargets.filter(pt => !SecurityConstants.LIST_TYPES.includes(pt.ticker)).map(pt => {
        let pteAudit = {}
        const editablePT = editablePxTargets.find(e => e.ticker === pt.ticker)
        if(editablePT) {
            const enforcedFcfOld = pt.enforcedFcf
            const enforcedFcfNew = editablePT.enforcedFcf
            const enforcedFcfGrowthOld = pt.enforcedFcfGrowth
            const enforcedFcfGrowthNew = editablePT.enforcedFcfGrowth
            const enforcedSharesGrowthOld = pt.enforcedSharesGrowth
            const enforcedSharesGrowthNew = editablePT.enforcedSharesGrowth
            const enforcedPerpGrowthOld = pt.enforcedPerpGrowth
            const enforcedPerpGrowthNew = editablePT.enforcedPerpGrowth
            const enforcedNtPTOld = pt.enforcedNeartermPT
            const enforcedNtPTNew = editablePT.enforcedNeartermPT
            const enforcedLtPTOld = pt.enforcedLongtermPT
            const enforcedLtPTNew = editablePT.enforcedLongtermPT
            const enforcedPtPTOld = pt.enforcedPotentialPT
            const enforcedPtPTNew = editablePT.enforcedPotentialPT
            let audited = false
            if(enforcedFcfOld != null && enforcedFcfOld !== enforcedFcfNew) {
                audited = true
                pteAudit.enforcedFcfOld = pt.enforcedFcf
                pteAudit.enforcedFcfNew = editablePT.enforcedFcf
            }
            if(enforcedFcfGrowthOld != null && enforcedFcfGrowthOld !== enforcedFcfGrowthNew) {
                audited = true
                pteAudit.enforcedFcfGrowthOld = pt.enforcedFcfGrowth
                pteAudit.enforcedFcfGrowthNew = editablePT.enforcedFcfGrowth
            }
            if(enforcedSharesGrowthOld != null && enforcedSharesGrowthOld !== enforcedSharesGrowthNew) {
                audited = true
                pteAudit.enforcedSharesGrowthOld = pt.enforcedSharesGrowth
                pteAudit.enforcedSharesGrowthNew = editablePT.enforcedSharesGrowth
            }
            if(enforcedPerpGrowthOld != null && enforcedPerpGrowthOld !== enforcedPerpGrowthNew) {
                audited = true
                pteAudit.enforcedPerpGrowthOld = pt.enforcedPerpGrowth
                pteAudit.enforcedPerpGrowthNew = editablePT.enforcedPerpGrowth
            }
            if(enforcedNtPTOld != null && enforcedNtPTOld !== enforcedNtPTNew) {
                audited = true
                pteAudit.enforcedNeartermPTOld = pt.enforcedNeartermPT
                pteAudit.enforcedNeartermPTNew = editablePT.enforcedNeartermPT
            }
            if(enforcedLtPTOld != null && enforcedLtPTOld !== enforcedLtPTNew) {
                audited = true
                pteAudit.enforcedLongtermPTOld = pt.enforcedLongtermPT
                pteAudit.enforcedLongtermPTNew = editablePT.enforcedLongtermPT
            }
            if(enforcedPtPTOld != null && enforcedPtPTOld !== enforcedPtPTNew) {
                audited = true
                pteAudit.enforcedPotentialPTOld = pt.enforcedPotentialPT
                pteAudit.enforcedPotentialPTNew = editablePT.enforcedPotentialPT
            }
            if(audited) {
                pteAudit.ticker = pt.ticker
                pteAudit.auditNote = prompt(`Px Target Audit Note for ${pteAudit.ticker}:`)
            }
        }
        return pteAudit
    }).filter(e => Object.keys(e).length !== 0)
}

export const aggregatePTEnforcement = (editablePxTargets) => {
    return editablePxTargets.filter(pt => !SecurityConstants.LIST_TYPES.includes(pt.ticker)).map(pt => {
        let pte = {}
        if(pt.newPT) {
            pte.id = null
        } else {
            pte.id = pt.id
        }
        pte.ticker = pt.ticker
        pte.sector = pt.sector
        pte.confidenceLevel = pt.confidenceLevel
        pte.enforcedFcf = pt.enforcedFcf
        pte.enforcedFcfGrowth = pt.enforcedFcfGrowth
        pte.enforcedSharesGrowth = pt.enforcedSharesGrowth
        pte.enforcedPerpGrowth = pt.enforcedPerpGrowth
        pte.enforcedNeartermPT = pt.enforcedNeartermPT
        pte.enforcedLongtermPT = pt.enforcedLongtermPT
        pte.enforcedPotentialPT = pt.enforcedPotentialPT
        return pte
    })
}

export const replaceWithEdgeCodes = (text) => {
    if(text && text.length > 0) {
        return text.replaceAll("鈥檚", "'s").replaceAll("鈥", "'").replaceAll("檚", "s").replaceAll("檛", "t").replaceAll("檙", "r").replaceAll("渂", "b").replaceAll("渢", "t").replaceAll("檇", "d").replaceAll("u0027", "'").replaceAll("u0026", "&").replaceAll("â€™", "'").replaceAll("u003c", "<").replaceAll("u003e", ">").replaceAll("檝", "ve")
    } else {
        return null
    }
}