class FirmRepositoryImpl(
    private val dao: FirmDao
) : FirmRepository {

    override fun getAllFirms(): Flow<List<Firm>> {
        return dao.getAllFirms().map { list ->
            list.map { it.toDomain() }
        }
    }

    override suspend fun getFirmByGstin(gstin: String): Firm? {
        return dao.getFirmByGstin(gstin)?.toDomain()
    }

    override suspend fun insertFirm(firm: Firm) {
        dao.insertFirm(firm.toEntity())
    }

    override suspend fun updateFirm(firm: Firm) {
        dao.updateFirm(firm.toEntity())
    }

    override suspend fun deleteFirm(firm: Firm) {
        dao.deleteFirm(firm.toEntity())
    }
}
