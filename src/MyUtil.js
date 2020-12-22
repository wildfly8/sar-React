import { WATCHLIST_HEADERS }  from './components/WatchListTable'

export const formatDate = (date) => {
    let year = new Date(date).getFullYear()
    let month = new Date(date).getUTCMonth() + 1
    let dt = new Date(date).getUTCDate()
    if (dt < 10) {
        dt = '0' + dt
    }
    if (month < 10) {
        month = '0' + month
    }
    return month + '-' + dt + '-' + year.toString().slice(-2)
}

export const assembleWatchlistTableRow = (apiINVWatchlistTicker, index) => {
    return {
        [WATCHLIST_HEADERS.id]: index,
        [WATCHLIST_HEADERS.ticker]: apiINVWatchlistTicker.ticker,
        [WATCHLIST_HEADERS.exchange]: apiINVWatchlistTicker.exchange,
        [WATCHLIST_HEADERS.algoRating]: apiINVWatchlistTicker.algoRating,
        [WATCHLIST_HEADERS.mktCap]: apiINVWatchlistTicker.mktCap,
        [WATCHLIST_HEADERS.earDate]: apiINVWatchlistTicker.keyStats.earDate,
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