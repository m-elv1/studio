interface FirmRepository {
    fun getAllFirms(): Flow<List<Firm>>
    suspend fun getFirmByGstin(gstin: String): Firm?
    suspend fun insertFirm(firm: Firm)
    suspend fun updateFirm(firm: Firm)
    suspend fun deleteFirm(firm: Firm)
}
