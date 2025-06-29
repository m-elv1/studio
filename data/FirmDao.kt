@Dao
interface FirmDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFirm(firm: FirmEntity)

    @Update
    suspend fun updateFirm(firm: FirmEntity)

    @Delete
    suspend fun deleteFirm(firm: FirmEntity)

    @Query("SELECT * FROM firms ORDER BY firmName ASC")
    fun getAllFirms(): Flow<List<FirmEntity>>

    @Query("SELECT * FROM firms WHERE gstin = :gstin LIMIT 1")
    suspend fun getFirmByGstin(gstin: String): FirmEntity?
}
